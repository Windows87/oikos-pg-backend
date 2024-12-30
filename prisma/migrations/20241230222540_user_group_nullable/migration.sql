-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_group_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "group_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
