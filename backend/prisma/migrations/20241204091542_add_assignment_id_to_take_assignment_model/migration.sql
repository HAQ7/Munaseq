/*
  Warnings:

  - Added the required column `assignmentId` to the `TakeAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TakeAssignment" ADD COLUMN     "assignmentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TakeAssignment" ADD CONSTRAINT "TakeAssignment_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
