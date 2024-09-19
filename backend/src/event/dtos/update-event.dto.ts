// src/event/dtos/create-event.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsInt,
  IsArray,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  category: string[];

  @IsString()
  @IsOptional()
  location: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsInt()
  seatCapacity: number;
}
