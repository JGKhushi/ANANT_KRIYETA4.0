/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ngo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ngo_email_key" ON "ngo"("email");
