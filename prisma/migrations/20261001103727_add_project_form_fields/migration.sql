-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "amount" DECIMAL(12,2);

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "beneficiaries" INTEGER,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "problem" TEXT,
ADD COLUMN     "solution" TEXT,
ADD COLUMN     "supportingDocs" TEXT[],
ADD COLUMN     "timeline" TEXT;
