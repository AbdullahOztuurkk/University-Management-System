/*
  Warnings:

  - A unique constraint covering the columns `[email,id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User.email_unique";

-- CreateIndex
CREATE UNIQUE INDEX "User.email_id_unique" ON "User"("email", "id");
