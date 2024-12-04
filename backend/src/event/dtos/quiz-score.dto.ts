import { IsUUID, IsInt, Min } from 'class-validator';

export class QuizScoreDto {
  @IsUUID()
  quizId: string;

  @IsUUID()
  userId: string;

  @IsInt()
  @Min(0)
  score: number;
}
