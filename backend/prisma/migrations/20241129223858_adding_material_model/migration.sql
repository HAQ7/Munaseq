-- CreateTable
CREATE TABLE "Material" (
    "materialId" TEXT NOT NULL,
    "materialUrl" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("materialId")
);

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
