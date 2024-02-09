import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException('invalid credential');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!(await bcrypt.compare(user?.Password, hashedPassword))) {
      throw new UnauthorizedException('invalid credential');
    }
    const payload = { sub: user._id, username: user?.Username };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
