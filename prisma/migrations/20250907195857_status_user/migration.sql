-- CreateEnum
CREATE TYPE "public"."RoleType" AS ENUM ('user', 'manager', 'admin');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';
