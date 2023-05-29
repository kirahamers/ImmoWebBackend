/*
  Warnings:

  - You are about to drop the `pandregio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pandregio` DROP FOREIGN KEY `PandRegio_pandId_fkey`;

-- DropForeignKey
ALTER TABLE `pandregio` DROP FOREIGN KEY `PandRegio_regioId_fkey`;

-- DropTable
DROP TABLE `pandregio`;
