/*
  Warnings:

  - The `gender` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'BOTH');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'BOTH',
ADD COLUMN     "image" TEXT,
ADD COLUMN     "online" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "targetAudience" TEXT[],
ALTER COLUMN "seatCapacity" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";

-- CreateTable
CREATE TABLE "_EventPresenters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventModerators" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserEventsJoined" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventPresenters_AB_unique" ON "_EventPresenters"("A", "B");

-- CreateIndex
CREATE INDEX "_EventPresenters_B_index" ON "_EventPresenters"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventModerators_AB_unique" ON "_EventModerators"("A", "B");

-- CreateIndex
CREATE INDEX "_EventModerators_B_index" ON "_EventModerators"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserEventsJoined_AB_unique" ON "_UserEventsJoined"("A", "B");

-- CreateIndex
CREATE INDEX "_UserEventsJoined_B_index" ON "_UserEventsJoined"("B");

-- AddForeignKey
ALTER TABLE "_EventPresenters" ADD CONSTRAINT "_EventPresenters_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventPresenters" ADD CONSTRAINT "_EventPresenters_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventModerators" ADD CONSTRAINT "_EventModerators_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventModerators" ADD CONSTRAINT "_EventModerators_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserEventsJoined" ADD CONSTRAINT "_UserEventsJoined_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserEventsJoined" ADD CONSTRAINT "_UserEventsJoined_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
