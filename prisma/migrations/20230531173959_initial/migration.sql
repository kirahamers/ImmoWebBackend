/*
  Warnings:

  - You are about to drop the column `typePandenId` on the `panden` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `panden` DROP FOREIGN KEY `Panden_regioId_fkey`;

-- DropForeignKey
ALTER TABLE `panden` DROP FOREIGN KEY `Panden_typeId_fkey`;

-- DropIndex
DROP INDEX `Regio_naam_idx` ON `regio`;

-- AlterTable
ALTER TABLE `panden` DROP COLUMN `typePandenId`;
