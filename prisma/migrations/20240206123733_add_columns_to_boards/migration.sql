/*
  Warnings:

  - You are about to alter the column `title` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `content` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[title]` on the table `boards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `boards` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "boards" ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "title" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "boards_title_key" ON "boards"("title");
