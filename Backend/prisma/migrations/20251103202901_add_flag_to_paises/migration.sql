-- AlterTable
ALTER TABLE "Paises" ADD COLUMN     "pai_area" INTEGER,
ADD COLUMN     "pai_bandeira_png" TEXT,
ALTER COLUMN "pai_populacao" DROP NOT NULL;
