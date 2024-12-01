import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateAssignment {
  @IsOptional()
  @IsString()
  questions?: string;

  @IsDate()
  @Transform(({ value }) => new Date(+value))
  startDate: Date;

  @IsDate()
  @Transform(({ value }) => new Date(+value))
  endDate: Date;
}
