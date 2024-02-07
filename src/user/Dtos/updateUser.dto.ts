import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  FirstName: string;
  @IsString()
  @IsNotEmpty()
  LastName: string;
  @IsString()
  @MinLength(10, { message: 'bio is too short(less than 10 characters)' })
  Bio: string;
}
