-- CreateTable
CREATE TABLE "Continentes" (
    "con_id" SERIAL NOT NULL,
    "con_nome" VARCHAR(16) NOT NULL,
    "con_descricao" TEXT NOT NULL,

    CONSTRAINT "Continentes_pkey" PRIMARY KEY ("con_id")
);

-- CreateTable
CREATE TABLE "Paises" (
    "pai_id" SERIAL NOT NULL,
    "pai_nome" VARCHAR(56) NOT NULL,
    "pai_descricao" TEXT NOT NULL,
    "pai_idioma_oficial" VARCHAR(24) NOT NULL,
    "pai_moeda" VARCHAR(16) NOT NULL,
    "pai_populacao" INTEGER NOT NULL,
    "continenteId" INTEGER NOT NULL,

    CONSTRAINT "Paises_pkey" PRIMARY KEY ("pai_id")
);

-- CreateTable
CREATE TABLE "Cidades" (
    "cid_id" SERIAL NOT NULL,
    "cid_nome" VARCHAR(52) NOT NULL,
    "cid_populacao" INTEGER NOT NULL,
    "cid_latitude" DECIMAL(9,6) NOT NULL,
    "cid_longitude" DECIMAL(9,6) NOT NULL,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "Cidades_pkey" PRIMARY KEY ("cid_id")
);

-- AddForeignKey
ALTER TABLE "Paises" ADD CONSTRAINT "Paises_continenteId_fkey" FOREIGN KEY ("continenteId") REFERENCES "Continentes"("con_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidades" ADD CONSTRAINT "Cidades_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Paises"("pai_id") ON DELETE RESTRICT ON UPDATE CASCADE;
