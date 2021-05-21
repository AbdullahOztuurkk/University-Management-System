/*
  Warnings:

  - A unique constraint covering the columns `[slugifyName]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slugifyName]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slugifyName` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slugifyName` to the `Faculty` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Faculty.name_unique";

-- DropIndex
DROP INDEX "Department.name_unique";

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "slugifyName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "slugifyName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Department.slugifyName_unique" ON "Department"("slugifyName");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty.slugifyName_unique" ON "Faculty"("slugifyName");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson.code_unique" ON "Lesson"("code");
