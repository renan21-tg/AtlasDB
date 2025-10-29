import { prisma } from "../prismaClient.js";

type ContinenteCreateData = {
    nome: string,
    desc: string
}

async function create (data: ContinenteCreateData) {
    const novoContinente = await prisma.continentes.create({
        data: {
            con_nome: data.nome,
            con_descricao: data.desc
        }
    })
    
    return novoContinente
}

export { create }