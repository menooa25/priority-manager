-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_goalId_fkey";

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
