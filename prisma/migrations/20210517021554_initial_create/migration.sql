-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'GRADUATED', 'LEFT');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('AUTUMN', 'SPRING', 'SUMMER');

-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "credit" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "seasonStartYear" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firtName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "status" "Status" NOT NULL,
    "pwdHash" TEXT NOT NULL,
    "pwdSalt" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DepartmentToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LessonToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Faculty.name_unique" ON "Faculty"("name");

-- CreateIndex
CREATE INDEX "Faculty.id_index" ON "Faculty"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Department.name_unique" ON "Department"("name");

-- CreateIndex
CREATE INDEX "Department.id_facultyId_index" ON "Department"("id", "facultyId");

-- CreateIndex
CREATE INDEX "Lesson.id_departmentId_index" ON "Lesson"("id", "departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE INDEX "User.id_email_index" ON "User"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToUser_AB_unique" ON "_DepartmentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentToUser_B_index" ON "_DepartmentToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LessonToUser_AB_unique" ON "_LessonToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LessonToUser_B_index" ON "_LessonToUser"("B");

-- AddForeignKey
ALTER TABLE "Department" ADD FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentToUser" ADD FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonToUser" ADD FOREIGN KEY ("A") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
