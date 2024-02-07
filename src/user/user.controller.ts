import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { FollowUserDto } from './Dtos/followUser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':username')
  async getUserById(
    @Param('username') username: string,
  ): Promise<User | undefined> {
    return await this.userService.getUserByUsername(username);
  }

  @Post('follow')
  handleFollow(@Body() followDto: FollowUserDto): Promise<boolean> {
    if (followDto.follow) {
      return this.userService.followUser(
        followDto.userId,
        followDto.followeeId,
      );
    } else {
      return this.userService.unfollowUser(
        followDto.userId,
        followDto.followeeId,
      );
    }
  }

  @Patch(':userId')
  updateProfile(
    @Param('userId') userId,
    @Body() updateProfileDto: UpdateUserDto,
  ): Promise<User> {
    return this.updateProfile(userId, updateProfileDto);
  }
}
