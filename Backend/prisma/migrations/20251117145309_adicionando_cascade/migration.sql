-- DropForeignKey
ALTER TABLE "public"."Cidades" DROP CONSTRAINT "Cidades_paisId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Paises" DROP CONSTRAINT "Paises_continenteId_fkey";

-- AddForeignKey
ALTER TABLE "Paises" ADD CONSTRAINT "Paises_continenteId_fkey" FOREIGN KEY ("continenteId") REFERENCES "Continentes"("con_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidades" ADD CONSTRAINT "Cidades_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Paises"("pai_id") ON DELETE CASCADE ON UPDATE CASCADE;
