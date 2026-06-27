/*
  Warnings:

  - You are about to drop the column `bio` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `user` table. All the data in the column will be lost.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `clientId` to the `bid` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'INTERESTED', 'CLOSED');

-- AlterTable
ALTER TABLE "bid" ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "leadStatus" "LeadStatus" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scheduledAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user" DROP COLUMN "bio",
DROP COLUMN "location",
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'client';

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "provider_profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "experience" INTEGER,
    "bio" TEXT,
    "location" TEXT DEFAULT 'Greater Noida',
    "isOnline" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "walletBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hasBasicInfo" BOOLEAN NOT NULL DEFAULT true,
    "hasServicesPricing" BOOLEAN NOT NULL DEFAULT false,
    "hasWorkPhotos" BOOLEAN NOT NULL DEFAULT false,
    "hasIdVerification" BOOLEAN NOT NULL DEFAULT false,
    "hasBankDetails" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "provider_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduled_job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Confirmed',
    "providerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scheduled_job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "earning" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'credit',
    "description" TEXT,
    "providerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "earning_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "provider_profile_userId_key" ON "provider_profile"("userId");

-- CreateIndex
CREATE INDEX "provider_profile_userId_idx" ON "provider_profile"("userId");

-- CreateIndex
CREATE INDEX "provider_profile_specialty_idx" ON "provider_profile"("specialty");

-- CreateIndex
CREATE INDEX "scheduled_job_providerId_idx" ON "scheduled_job"("providerId");

-- CreateIndex
CREATE INDEX "scheduled_job_scheduledAt_idx" ON "scheduled_job"("scheduledAt");

-- CreateIndex
CREATE INDEX "earning_providerId_idx" ON "earning"("providerId");

-- CreateIndex
CREATE INDEX "earning_createdAt_idx" ON "earning"("createdAt");

-- CreateIndex
CREATE INDEX "bid_clientId_idx" ON "bid"("clientId");

-- CreateIndex
CREATE INDEX "bid_leadStatus_idx" ON "bid"("leadStatus");

-- CreateIndex
CREATE INDEX "job_category_idx" ON "job"("category");

-- AddForeignKey
ALTER TABLE "provider_profile" ADD CONSTRAINT "provider_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid" ADD CONSTRAINT "bid_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_job" ADD CONSTRAINT "scheduled_job_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "earning" ADD CONSTRAINT "earning_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
