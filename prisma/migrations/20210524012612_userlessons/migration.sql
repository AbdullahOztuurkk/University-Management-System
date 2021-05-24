/*
  Warnings:

  - The primary key for the `UserLesson` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('MID', 'PROJECT', 'FINAL', 'MAKEUP');

-- CreateEnum
CREATE TYPE "LessonResult" AS ENUM ('PASSED', 'FAILED', 'NOTRESULT');

-- AlterTable
ALTER TABLE "UserLesson" DROP CONSTRAINT "UserLesson_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "result" "LessonResult" NOT NULL DEFAULT E'NOTRESULT',
ADD COLUMN     "average" INTEGER NOT NULL DEFAULT 0,
ADD PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Exam" (
    "id" SERIAL NOT NULL,
    "userLessonId" INTEGER NOT NULL,
    "type" "ExamType" NOT NULL,
    "score" INTEGER NOT NULL,
    "announcementDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Exam.id_index" ON "Exam"("id");

-- CreateIndex
CREATE INDEX "Exam.userLessonId_index" ON "Exam"("userLessonId");

-- AddForeignKey
ALTER TABLE "Exam" ADD FOREIGN KEY ("userLessonId") REFERENCES "UserLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
