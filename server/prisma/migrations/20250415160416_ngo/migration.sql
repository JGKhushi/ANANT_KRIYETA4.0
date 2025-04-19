/*
  Warnings:

  - You are about to drop the column `name` on the `NGO` table. All the data in the column will be lost.
  - Added the required column `addressProof` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agreeTerms` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areasServed` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canPickup` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daysAvailable` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ngoName` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ngoType` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operatingHours` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationCertificate` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationNumber` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `NGO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearEstablished` to the `NGO` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NGO_email_key";

-- AlterTable
ALTER TABLE "NGO" DROP COLUMN "name",
ADD COLUMN     "addressProof" TEXT NOT NULL,
ADD COLUMN     "agreeTerms" BOOLEAN NOT NULL,
ADD COLUMN     "alternatePhone" TEXT,
ADD COLUMN     "areasServed" TEXT NOT NULL,
ADD COLUMN     "canPickup" BOOLEAN NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "daysAvailable" TEXT NOT NULL,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "ngoName" TEXT NOT NULL,
ADD COLUMN     "ngoType" TEXT NOT NULL,
ADD COLUMN     "operatingHours" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "pincode" TEXT NOT NULL,
ADD COLUMN     "registrationCertificate" TEXT NOT NULL,
ADD COLUMN     "registrationNumber" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "yearEstablished" TEXT NOT NULL;
