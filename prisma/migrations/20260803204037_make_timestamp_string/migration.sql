-- AlterTable
ALTER TABLE "threads" ALTER COLUMN "timestamp" DROP DEFAULT,
ALTER COLUMN "timestamp" SET DATA TYPE TEXT;
