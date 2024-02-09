import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(5, { message: 'password is too short - less than 5 characters' })
  password: string;
}
