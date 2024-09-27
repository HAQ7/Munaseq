-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eventCreatorId_fkey";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventCreatorId_fkey" FOREIGN KEY ("eventCreatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
