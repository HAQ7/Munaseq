/*
  Warnings:

  - You are about to drop the column `startedAt` on the `TakeQuiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TakeQuiz" DROP COLUMN "startedAt",
ALTER COLUMN "answers" DROP NOT NULL,
ALTER COLUMN "score" DROP NOT NULL;
