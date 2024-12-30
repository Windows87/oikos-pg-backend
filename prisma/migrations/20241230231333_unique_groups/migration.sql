/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `group` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "group_name_key" ON "group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "group_code_key" ON "group"("code");
