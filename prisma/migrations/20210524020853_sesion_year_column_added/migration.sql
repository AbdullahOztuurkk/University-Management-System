/*
  Warnings:

  - The values [CLOSE] on the enum `LessonStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `startYear` on the `UserLesson` table. All the data in the column will be lost.
  - You are about to drop the column `endYear` on the `UserLesson` table. All the data in the column will be lost.
  - Added the required column `seasonYear` to the `UserLesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LessonStatus_new" AS ENUM ('OPEN', 'TIMEOUT');
ALTER TABLE "Lesson" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Lesson" ALTER COLUMN "status" TYPE "LessonStatus_new" USING ("status"::text::"LessonStatus_new");
ALTER TYPE "LessonStatus" RENAME TO "LessonStatus_old";
ALTER TYPE "LessonStatus_new" RENAME TO "LessonStatus";
DROP TYPE "LessonStatus_old";
ALTER TABLE "Lesson" ALTER COLUMN "status" SET DEFAULT 'TIMEOUT';
COMMIT;

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "status" SET DEFAULT E'TIMEOUT';

-- AlterTable
ALTER TABLE "UserLesson" DROP COLUMN "startYear",
DROP COLUMN "endYear",
ADD COLUMN     "seasonYear" TEXT NOT NULL;
