/*
  Warnings:

  - You are about to drop the `gebruikers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pandregio` DROP FOREIGN KEY `PandRegio_gebruikersId_fkey`;

-- DropTable
DROP TABLE `gebruikers`;
