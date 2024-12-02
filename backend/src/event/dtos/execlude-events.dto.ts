import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class ExecludeEvents {
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  execludedEvents?: string[];
}
