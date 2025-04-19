/*
  Warnings:

  - You are about to drop the column `description` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Donation` table. All the data in the column will be lost.
  - The `status` column on the `Donation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `contactPhone` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryDate` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodCategory` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodItems` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLocation` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupTimes` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "description",
DROP COLUMN "imageUrl",
ADD COLUMN     "additionalDetails" TEXT,
ADD COLUMN     "contactPhone" TEXT NOT NULL,
ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "foodCategory" TEXT NOT NULL,
ADD COLUMN     "foodItems" TEXT NOT NULL,
ADD COLUMN     "hasAllergens" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "pickupLocation" TEXT NOT NULL,
ADD COLUMN     "pickupTimes" TEXT NOT NULL,
ADD COLUMN     "quantity" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
