-- DropForeignKey
ALTER TABLE "Time" DROP CONSTRAINT "Time_taskId_fkey";

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
