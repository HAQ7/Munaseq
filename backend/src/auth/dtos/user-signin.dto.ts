// src/auth/dtos/user-signin.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class userSignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
