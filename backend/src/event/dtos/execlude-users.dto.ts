import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class ExecludeUsers {
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  execludedUsers?: string[];
}
