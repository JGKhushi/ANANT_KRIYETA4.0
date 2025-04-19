/*
  Warnings:

  - The values [REJECTED] on the enum `DonationStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [HOUSEHOLD,RESTAURANT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `fssaiCert` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DonationStatus_new" AS ENUM ('PENDING', 'ACCEPTED');
ALTER TYPE "DonationStatus" RENAME TO "DonationStatus_old";
ALTER TYPE "DonationStatus_new" RENAME TO "DonationStatus";
DROP TYPE "DonationStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'BUSINESS', 'NGO', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fssaiCert",
DROP COLUMN "name",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "addressProof" TEXT,
ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "businessType" TEXT,
ADD COLUMN     "contactDesignation" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactPersonName" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "fssaiCertificate" TEXT,
ADD COLUMN     "fssaiNumber" TEXT,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "gstNumber" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "safetyAudit" TEXT,
ADD COLUMN     "yearEstablished" TEXT;
