/*
  Warnings:

  - You are about to drop the column `timeId` on the `Task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `Time` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskId` to the `Time` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_timeId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "timeId";

-- AlterTable
ALTER TABLE "Time" ADD COLUMN     "taskId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Time_taskId_key" ON "Time"("taskId");

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
