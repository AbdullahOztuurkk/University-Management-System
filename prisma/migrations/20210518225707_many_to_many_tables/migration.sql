/*
  Warnings:

  - You are about to drop the `_DepartmentToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LessonToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DepartmentToUser" DROP CONSTRAINT "_DepartmentToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentToUser" DROP CONSTRAINT "_DepartmentToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_LessonToUser" DROP CONSTRAINT "_LessonToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LessonToUser" DROP CONSTRAINT "_LessonToUser_B_fkey";

-- DropTable
DROP TABLE "_DepartmentToUser";

-- DropTable
DROP TABLE "_LessonToUser";

-- CreateTable
CREATE TABLE "UserDepartment" (
    "userId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,

    PRIMARY KEY ("userId","departmentId")
);

-- CreateTable
CREATE TABLE "UserLesson" (
    "userId" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,

    PRIMARY KEY ("userId","lessonId")
);

-- CreateIndex
CREATE INDEX "UserDepartment.departmentId_index" ON "UserDepartment"("departmentId");

-- CreateIndex
CREATE INDEX "UserLesson.lessonId_index" ON "UserLesson"("lessonId");

-- AddForeignKey
ALTER TABLE "UserDepartment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDepartment" ADD FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLesson" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLesson" ADD FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
