import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateUpdateRating {
  @Type(() => Number)
  @IsNumber()
  rating: number;
}
