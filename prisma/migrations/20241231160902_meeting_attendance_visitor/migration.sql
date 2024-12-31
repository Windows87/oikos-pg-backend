-- DropForeignKey
ALTER TABLE "meeting_attendance" DROP CONSTRAINT "meeting_attendance_user_id_fkey";

-- AlterTable
ALTER TABLE "meeting_attendance" ADD COLUMN     "visitor_name" TEXT,
ADD COLUMN     "visitor_whatsapp" TEXT,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "meeting_attendance" ADD CONSTRAINT "meeting_attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
