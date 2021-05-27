/*
  Warnings:

  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Faculty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserDepartment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserLesson` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');

-- CreateEnum
CREATE TYPE "TEACHER_QUALIFICATION" AS ENUM ('ASSISTANT', 'LECTURER', 'DOCENT', 'PROF');

-- CreateEnum
CREATE TYPE "STUDENT_STATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'GRADUATED', 'LEFT');

-- CreateEnum
CREATE TYPE "STUDENT_DEPARTMENT_TYPE" AS ENUM ('MAJOR', 'MINOR', 'DOUBLE_MAJOR');

-- CreateEnum
CREATE TYPE "CLASS_SESSION" AS ENUM ('AUTUMN', 'SPRING', 'SUMMER');

-- CreateEnum
CREATE TYPE "CLASS_STATUS" AS ENUM ('OPENED', 'CLOSED');

-- CreateEnum
CREATE TYPE "EXAM_TYPE" AS ENUM ('MIDTERM', 'FINAL', 'MAKEUP');

-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_userLessonId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "UserDepartment" DROP CONSTRAINT "UserDepartment_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "UserDepartment" DROP CONSTRAINT "UserDepartment_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserLesson" DROP CONSTRAINT "UserLesson_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "UserLesson" DROP CONSTRAINT "UserLesson_userId_fkey";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Exam";

-- DropTable
DROP TABLE "Faculty";

-- DropTable
DROP TABLE "Lesson";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserDepartment";

-- DropTable
DROP TABLE "UserLesson";

-- DropEnum
DROP TYPE "ExamType";

-- DropEnum
DROP TYPE "LessonResult";

-- DropEnum
DROP TYPE "LessonStatus";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Season";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "faculties" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "slugifyName" VARCHAR(50) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "slugifyName" VARCHAR(50) NOT NULL,
    "facultyId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "slugifyName" VARCHAR(50) NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "grade" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firsName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "role" "USER_ROLE" NOT NULL,
    "pwdHash" TEXT NOT NULL,
    "pwdSalt" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacherFields" (
    "qualification" "TEACHER_QUALIFICATION" NOT NULL,
    "website" VARCHAR(50) NOT NULL,
    "teacherId" INTEGER NOT NULL,

    PRIMARY KEY ("teacherId")
);

-- CreateTable
CREATE TABLE "studentFields" (
    "status" "STUDENT_STATUS" NOT NULL,
    "grade" INTEGER NOT NULL,
    "gno" DECIMAL(65,30) NOT NULL,
    "studentId" INTEGER NOT NULL,

    PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "studentDepartments" (
    "type" "STUDENT_DEPARTMENT_TYPE" NOT NULL,
    "studentId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,

    PRIMARY KEY ("studentId","departmentId")
);

-- CreateTable
CREATE TABLE "teacherDepartments" (
    "teacherId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,

    PRIMARY KEY ("teacherId","departmentId")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "session" "CLASS_SESSION" NOT NULL,
    "year" VARCHAR(9) NOT NULL,
    "status" "CLASS_STATUS" NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentClasses" (
    "id" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    PRIMARY KEY ("id","classId","studentId")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" SERIAL NOT NULL,
    "studentClassId" INTEGER NOT NULL,
    "type" "EXAM_TYPE" NOT NULL,
    "score" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lessons.slugifyName_unique" ON "lessons"("slugifyName");

-- CreateIndex
CREATE UNIQUE INDEX "lessons.departmentId_slugifyName_unique" ON "lessons"("departmentId", "slugifyName");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teacherFields.website_unique" ON "teacherFields"("website");

-- CreateIndex
CREATE UNIQUE INDEX "studentDepartments.studentId_type_unique" ON "studentDepartments"("studentId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "studentClasses.id_unique" ON "studentClasses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "exams.studentClassId_type_unique" ON "exams"("studentClassId", "type");

-- AddForeignKey
ALTER TABLE "departments" ADD FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacherFields" ADD FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentFields" ADD FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentDepartments" ADD FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentDepartments" ADD FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacherDepartments" ADD FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacherDepartments" ADD FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentClasses" ADD FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentClasses" ADD FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD FOREIGN KEY ("studentClassId") REFERENCES "studentClasses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
