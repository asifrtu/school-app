-- DropIndex
DROP INDEX "Teacher_emergencyContact_key";

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "address1" DROP NOT NULL;
