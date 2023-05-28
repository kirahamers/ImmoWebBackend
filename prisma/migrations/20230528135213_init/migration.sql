/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropTable
DROP TABLE `profile`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Panden` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `straat` VARCHAR(45) NOT NULL,
    `huisnummer` VARCHAR(45) NOT NULL,
    `bus` VARCHAR(45) NULL,
    `postcode` INTEGER NOT NULL,
    `gemeente` VARCHAR(45) NOT NULL,
    `prijs` INTEGER NOT NULL,
    `aantalKamers` INTEGER NOT NULL,
    `oppervlakte` INTEGER NOT NULL,
    `beschrijving` VARCHAR(191) NOT NULL,
    `typeId` INTEGER NOT NULL,
    `regioId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `IsVerkochtVerhuurd` BOOLEAN NOT NULL DEFAULT false,
    `type` ENUM('APPARTEMENT', 'HUIS', 'VILLA', 'STUDIO') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gebruikers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `voorNaam` VARCHAR(191) NOT NULL,
    `achterNaam` VARCHAR(191) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `wachtwoord` VARCHAR(150) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Gebruikers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Regio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Afbeelding` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `pandId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Panden` ADD CONSTRAINT `Panden_regioId_fkey` FOREIGN KEY (`regioId`) REFERENCES `Regio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Afbeelding` ADD CONSTRAINT `Afbeelding_pandId_fkey` FOREIGN KEY (`pandId`) REFERENCES `Panden`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
