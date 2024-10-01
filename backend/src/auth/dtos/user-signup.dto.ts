// src/auth/dtos/user-signup.dto.ts
import { Gender } from '@prisma/client';
import { IsArray, IsBase64, IsEmail, IsEnum, IsJSON, IsOptional, IsString, IsUrl } from 'class-validator';

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

  @IsOptional()
  @IsString()
  organizationName?: string;

  @IsOptional()
  @IsBase64()
  profilePicture?: string; // Assume the profile picture is a URL

  @IsOptional()
  @IsString()
  visibleName?: string; // Can be name or organization name

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[]; // Array of interests

  @IsOptional()
  @IsString()
  description?: string; // Biography

  @IsOptional()
  @IsJSON()
  socialAccounts?: object; // JSON object for social media accounts
}
