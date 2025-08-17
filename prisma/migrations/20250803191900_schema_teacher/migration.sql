-- CreateTable
CREATE TABLE "TeacherAcademicInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "session" TEXT NOT NULL,
    "classSt" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherAcademicInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT NOT NULL,
    "religion" TEXT,
    "caste" TEXT,
    "bloodGroup" TEXT,
    "disability" TEXT,
    "fatherName" TEXT,
    "motherName" TEXT,
    "emergencyContact" TEXT,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "notes" TEXT,
    "teacherImage" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userId_key" ON "Teacher"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_emergencyContact_key" ON "Teacher"("emergencyContact");

-- AddForeignKey
ALTER TABLE "TeacherAcademicInfo" ADD CONSTRAINT "TeacherAcademicInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
