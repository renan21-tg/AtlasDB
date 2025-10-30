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

async function findAll() {
    const continentes = await prisma.continentes.findMany()

    return continentes
}

async function findUnique(id: number) {
    const continente = await prisma.continentes.findUnique({
        where: {
            con_id: id
        }
    })
    return continente 
}

async function update(id: number, data: ContinenteCreateData) {
    const continenteAtualizado = await prisma.update({
        where: {
            con_id: id
        },
        data: {
            con_nome: data.nome,
            con_desc: data.desc
        }
    })
    return continenteAtualizado
}

export { create, findAll, findUnique, update }