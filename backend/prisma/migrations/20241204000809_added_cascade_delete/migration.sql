-- DropForeignKey
ALTER TABLE "TakeQuiz" DROP CONSTRAINT "TakeQuiz_quizId_fkey";

-- AddForeignKey
ALTER TABLE "TakeQuiz" ADD CONSTRAINT "TakeQuiz_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
