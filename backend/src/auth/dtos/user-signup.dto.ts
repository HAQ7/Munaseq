// src/auth/dtos/user-signup.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class userSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  username: string;
}
