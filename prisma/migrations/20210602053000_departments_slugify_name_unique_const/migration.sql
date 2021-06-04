/*
  Warnings:

  - A unique constraint covering the columns `[slugifyName]` on the table `departments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "departments.slugifyName_unique" ON "departments"("slugifyName");
