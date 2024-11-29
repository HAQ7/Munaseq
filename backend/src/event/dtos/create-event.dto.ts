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
import { Transform, Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional() //MAKE SURE THAT MUANSEQ TEAM IS INFORMED THAT CATEGORIES OF THE EVENT IS OPTIONAL
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  categories: string[];

  @IsString()
  @IsOptional()
  location?: string;

  @Type(() => Number) 
  @IsOptional()
  @IsInt()
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
  @Type(() => Number) 
  @IsInt()
  price?: number;
}
