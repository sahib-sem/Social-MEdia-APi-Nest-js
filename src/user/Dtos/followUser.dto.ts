import { IsBoolean, IsString } from 'class-validator';

export class FollowUserDto {
  @IsString()
  userId: string;
  @IsString()
  followeeId: string;
  @IsBoolean()
  follow: boolean;
}
