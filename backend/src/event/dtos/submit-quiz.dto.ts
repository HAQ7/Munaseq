import { IsArray, IsString, IsUUID } from 'class-validator';

export class AnswerDto {
  @IsUUID()
  questionId: string;

  @IsString()
  answer: string;
}

export class SubmitQuizDto {
  @IsArray()
  answers: AnswerDto[];
}