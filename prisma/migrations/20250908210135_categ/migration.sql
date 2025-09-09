-- CreateEnum
CREATE TYPE "public"."CategoryType" AS ENUM ('sales', 'product', 'engineering', 'operations', 'finance', 'other');

-- AlterTable
ALTER TABLE "public"."Proposal" ADD COLUMN     "category" "public"."CategoryType";
