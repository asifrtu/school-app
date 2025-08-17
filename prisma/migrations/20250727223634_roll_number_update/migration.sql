/*
  Warnings:

  - You are about to drop the column `rollNo` on the `StudentAcademicInfo` table. All the data in the column will be lost.
  - Added the required column `rollNumber` to the `StudentAcademicInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentAcademicInfo" DROP COLUMN "rollNo",
ADD COLUMN     "rollNumber" TEXT NOT NULL;
