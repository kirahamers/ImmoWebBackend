/*
  Warnings:

  - A unique constraint covering the columns `[naam]` on the table `TypePanden` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `panden` DROP FOREIGN KEY `Panden_typePandenId_fkey`;

-- CreateIndex
CREATE INDEX `idx_panden_typeId` ON `Panden`(`typeId`);

-- CreateIndex
CREATE UNIQUE INDEX `TypePanden_naam_key` ON `TypePanden`(`naam`);

-- AddForeignKey
ALTER TABLE `Panden` ADD CONSTRAINT `Panden_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `TypePanden`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
