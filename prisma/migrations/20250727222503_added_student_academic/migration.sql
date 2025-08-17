-- CreateTable
CREATE TABLE "StudentAcademicInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "session" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,

    CONSTRAINT "StudentAcademicInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentAcademicInfo" ADD CONSTRAINT "StudentAcademicInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
