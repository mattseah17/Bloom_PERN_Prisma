-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_plantId_fkey";

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
