import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TakeQuizDto {
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  answers: string[];

  @IsUUID()
  quizId: string;

  @IsUUID()
  userId: string;
}
