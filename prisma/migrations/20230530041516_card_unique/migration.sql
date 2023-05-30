/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Card_slug_email_key` ON `Card`;

-- CreateIndex
CREATE UNIQUE INDEX `Card_email_key` ON `Card`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Card_slug_key` ON `Card`(`slug`);
