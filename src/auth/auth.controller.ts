import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './Dtos/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }
}
