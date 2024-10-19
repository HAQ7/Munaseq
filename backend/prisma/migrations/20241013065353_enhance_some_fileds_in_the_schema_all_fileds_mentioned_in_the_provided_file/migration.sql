/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `targetAudience` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `organizationName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - Made the column `gender` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eventCreatorId_fkey";

-- DropForeignKey
ALTER TABLE "_EventModerators" DROP CONSTRAINT "_EventModerators_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventModerators" DROP CONSTRAINT "_EventModerators_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventPresenters" DROP CONSTRAINT "_EventPresenters_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventPresenters" DROP CONSTRAINT "_EventPresenters_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserEventsJoined" DROP CONSTRAINT "_UserEventsJoined_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserEventsJoined" DROP CONSTRAINT "_UserEventsJoined_B_fkey";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "category",
DROP COLUMN "targetAudience",
ADD COLUMN     "categories" TEXT[],
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "eventCreatorId" SET DATA TYPE TEXT,
ALTER COLUMN "price" DROP NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Event_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "organizationName",
DROP COLUMN "profilePicture",
ADD COLUMN     "cvUrl" TEXT,
ADD COLUMN     "profilePictureUrl" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "gender" SET NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "_EventModerators" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_EventPresenters" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_UserEventsJoined" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventCreatorId_fkey" FOREIGN KEY ("eventCreatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
