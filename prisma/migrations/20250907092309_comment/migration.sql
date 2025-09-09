/*
  Warnings:

  - You are about to drop the column `author` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `initials` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Comment" DROP COLUMN "author",
DROP COLUMN "avatar",
DROP COLUMN "initials",
DROP COLUMN "role",
ADD COLUMN     "authorId" TEXT NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "initials" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
