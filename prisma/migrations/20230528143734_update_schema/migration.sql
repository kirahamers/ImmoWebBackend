/*
  Warnings:

  - A unique constraint covering the columns `[naam]` on the table `Regio` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Panden_typePandenId_fkey` ON `panden`;

-- CreateIndex
CREATE UNIQUE INDEX `Regio_naam_key` ON `Regio`(`naam`);
