/*
  Warnings:

  - The values [sales,product,engineering,operations,finance] on the enum `CategoryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CategoryType_new" AS ENUM ('product_launch', 'market_expansion', 'partnership', 'technology', 'marketing', 'research', 'other');
ALTER TABLE "public"."Proposal" ALTER COLUMN "category" TYPE "public"."CategoryType_new" USING ("category"::text::"public"."CategoryType_new");
ALTER TYPE "public"."CategoryType" RENAME TO "CategoryType_old";
ALTER TYPE "public"."CategoryType_new" RENAME TO "CategoryType";
DROP TYPE "public"."CategoryType_old";
COMMIT;
