// src/user/dto/editUser.dto.ts

import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsArray,
  IsUrl,
  IsJSON,
} from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsString()
  organizationName?: string;

  @IsOptional()
  @IsUrl()
  profilePicture?: string; // Assume the profile picture is a URL

  @IsOptional()
  @IsString()
  visibleName?: string; // Can be name or organization name

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[]; // Array of interests

  @IsOptional()
  @IsJSON()
  socialAccounts?: object; // JSON object for social media accounts
}
