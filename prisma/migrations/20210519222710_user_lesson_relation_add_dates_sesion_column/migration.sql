/*
  Warnings:

  - You are about to drop the column `seasonStartYear` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `code` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `startYear` to the `UserLesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endYear` to the `UserLesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `season` to the `UserLesson` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'GRADUATED', 'LEFT');

-- CreateEnum
CREATE TYPE "LessonStatus" AS ENUM ('OPEN', 'CLOSE');

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "seasonStartYear",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "grade" INTEGER NOT NULL,
ADD COLUMN     "status" "LessonStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL;

-- AlterTable
ALTER TABLE "UserLesson" ADD COLUMN     "startYear" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endYear" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "season" "Season" NOT NULL;

-- DropEnum
DROP TYPE "Status";
