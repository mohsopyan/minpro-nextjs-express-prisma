/*
  Warnings:

  - Added the required column `referrerId` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_referralCode_fkey`;

-- AlterTable
ALTER TABLE `referral` ADD COLUMN `referrerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `discountExpiresAt` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `Referral_referrerId_idx` ON `Referral`(`referrerId`);

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referrerId_fkey` FOREIGN KEY (`referrerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
