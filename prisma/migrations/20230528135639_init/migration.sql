/*
  Warnings:

  - You are about to alter the column `voorNaam` on the `gebruikers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `achterNaam` on the `gebruikers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.

*/
-- AlterTable
ALTER TABLE `gebruikers` MODIFY `voorNaam` VARCHAR(45) NOT NULL,
    MODIFY `achterNaam` VARCHAR(45) NOT NULL;
