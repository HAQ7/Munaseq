import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateAssignment {
  @IsOptional()
  @IsString()
  questions?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  endDate?: Date;
}
