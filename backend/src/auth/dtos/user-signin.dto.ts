// src/auth/dtos/user-signin.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class userSignInDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
