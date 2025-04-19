/*
  Warnings:

  - You are about to drop the column `additionalDetails` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `expiryDate` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrls` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `pickupLocation` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `expiry` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "additionalDetails",
DROP COLUMN "expiryDate",
DROP COLUMN "imageUrls",
DROP COLUMN "pickupLocation",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "expiry" TEXT NOT NULL,
ADD COLUMN     "foodImage" TEXT[],
ADD COLUMN     "location" TEXT NOT NULL;
