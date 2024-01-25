-- CreateTable
CREATE TABLE "Detail" (
    "id" SERIAL NOT NULL,
    "why" TEXT,
    "when" TEXT,
    "how" TEXT,
    "goalId" INTEGER NOT NULL,

    CONSTRAINT "Detail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Detail_goalId_key" ON "Detail"("goalId");

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
