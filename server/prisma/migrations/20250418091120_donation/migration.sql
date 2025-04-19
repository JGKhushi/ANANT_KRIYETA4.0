/*
  Warnings:

  - Added the required column `preparationDate` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preparationTime` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "preparationDate" TEXT NOT NULL,
ADD COLUMN     "preparationTime" TEXT NOT NULL;
