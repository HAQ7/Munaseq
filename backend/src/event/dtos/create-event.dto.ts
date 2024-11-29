// src/event/dtos/create-event.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsInt,
  IsArray,
  IsEnum,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Gender } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  // @IsArray()
  categories: string[];

  @IsString()
  @IsOptional()
  location?: string;

  @Transform(({ value }) => parseInt(value, 10))
  // @IsInt()
  seatCapacity: number;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isOnline?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isPublic?: boolean;

  @IsDate()
  @Transform(({ value }) => new Date(+value))
  startDateTime: Date;

  @IsDate()
  @Transform(({ value }) => new Date(+value))
  endDateTime: Date;

  @IsOptional()
  @IsInt()
  price?: number;
}
