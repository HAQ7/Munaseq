/*
  Warnings:

  - You are about to drop the column `feedbackId` on the `GiveFeedback` table. All the data in the column will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rating` to the `GiveFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GiveFeedback" DROP CONSTRAINT "GiveFeedback_feedbackId_fkey";

-- AlterTable
ALTER TABLE "GiveFeedback" DROP COLUMN "feedbackId",
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Feedback";
