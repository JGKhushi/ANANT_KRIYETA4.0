/*
  Warnings:

  - You are about to drop the `NGO` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_ngoId_fkey";

-- DropTable
DROP TABLE "NGO";

-- CreateTable
CREATE TABLE "ngo" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'NGO',
    "ngoName" TEXT NOT NULL,
    "ngoType" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "yearEstablished" TEXT NOT NULL,
    "website" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "alternatePhone" TEXT,
    "designation" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "areasServed" TEXT NOT NULL,
    "operatingHours" TEXT NOT NULL,
    "daysAvailable" TEXT NOT NULL,
    "canPickup" BOOLEAN NOT NULL,
    "registrationCertificate" TEXT NOT NULL,
    "addressProof" TEXT NOT NULL,
    "agreeTerms" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ngo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "ngo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
