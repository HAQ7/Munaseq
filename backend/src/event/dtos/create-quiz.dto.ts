import { IsDateString, IsInt, IsNotEmpty, IsArray, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from './create-question.dto';

export class CreateQuizDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsInt()
  timeLimit: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
