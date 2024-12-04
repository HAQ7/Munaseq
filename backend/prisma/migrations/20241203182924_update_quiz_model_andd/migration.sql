/*
  Warnings:

  - Added the required column `quizId` to the `TakeQuiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `TakeQuiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TakeQuiz" ADD COLUMN     "quizId" TEXT NOT NULL,
ADD COLUMN     "score" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "TakeQuiz" ADD CONSTRAINT "TakeQuiz_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
