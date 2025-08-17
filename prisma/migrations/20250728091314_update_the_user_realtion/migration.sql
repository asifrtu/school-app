/*
  Warnings:

  - You are about to drop the column `class` on the `StudentAcademicInfo` table. All the data in the column will be lost.
  - Added the required column `classSt` to the `StudentAcademicInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StudentAcademicInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentAcademicInfo" DROP COLUMN "class",
ADD COLUMN     "classSt" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "StudentAcademicInfo_userId_idx" ON "StudentAcademicInfo"("userId");
