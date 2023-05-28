/*
  Warnings:

  - You are about to drop the column `type` on the `panden` table. All the data in the column will be lost.
  - Added the required column `typePandenId` to the `Panden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `panden` DROP COLUMN `type`,
    ADD COLUMN `typePandenId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `TypePanden` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(45) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PandRegio` (
    `pandId` INTEGER NOT NULL,
    `regioId` INTEGER NOT NULL,
    `pandregiocol` VARCHAR(45) NOT NULL,
    `gebruikersId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`pandId`, `regioId`, `gebruikersId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Panden` ADD CONSTRAINT `Panden_typePandenId_fkey` FOREIGN KEY (`typePandenId`) REFERENCES `TypePanden`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PandRegio` ADD CONSTRAINT `PandRegio_pandId_fkey` FOREIGN KEY (`pandId`) REFERENCES `Panden`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PandRegio` ADD CONSTRAINT `PandRegio_regioId_fkey` FOREIGN KEY (`regioId`) REFERENCES `Regio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PandRegio` ADD CONSTRAINT `PandRegio_gebruikersId_fkey` FOREIGN KEY (`gebruikersId`) REFERENCES `Gebruikers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
