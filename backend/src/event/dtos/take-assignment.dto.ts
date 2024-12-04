import { IsOptional, IsString } from 'class-validator';

export class TakeAssigment {
  @IsOptional()
  @IsString()
  questions?: string;
}
