import { prisma } from "../prismaClient.js";
import * as paisService from "../services/pais.service.js"
import 'dotenv/config'

type cidadeCreateData = {
    nome: string,
    populacao: number,
    paisId: number,
}

type cidadeUpdateData = {
    nome: string,
    populacao: number,
    lat: number,
    lon: number,
    paisId: number
}


async function create(data: cidadeCreateData) {
    const validaPais = await paisService.findUnique(data.paisId)

    if (!validaPais) {
        throw new Error("Pais não encontrado")
    }

    const nomeCidade = encodeURI(data.nome)
    const urlApi = `http://api.openweathermap.org/geo/1.0/direct?q=${nomeCidade}&limit=5&appid=${process.env.API_KEY}`
    let dadosApi

    try{
        const response = await fetch(urlApi)

        if(!response.ok) {
            throw new Error(`API externa retornou: ${response.status}`)
        }

        const dados = await response.json() as any[]
        dadosApi = dados[0]
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Erro ao buscar dados da cidade: ${error.message}`);
        }
        throw new Error(`Erro desconhecido ao buscar dados da cidade: ${String(error)}`);
    }

    const latitude = dadosApi.lat
    const longitude = dadosApi.lon

    const novaCidade = await prisma.cidades.create({
        data: {
            cid_nome: data.nome,
            cid_populacao: data.populacao,
            cid_latitude: latitude,
            cid_longitude: longitude,
            paisId: data.paisId
        }
    })

    return novaCidade;
}

async function findAll() {
    const cidades = await prisma.cidades.findMany()

    return cidades
}

async function findUnique(id: number) {
    const cidade = await prisma.cidades.findUnique({
        where: {
            cid_id: id
        }
    })

    // Puxar informacoes de tempo

    return cidade
}

async function listByPais(id: number) {
    const cidadesPais = await prisma.cidades.findMany({
        where: {
            paisId: id
        }
    })

    return cidadesPais
}

async function update(id: number, data: cidadeUpdateData) {
    const cidadeAtualizada = await prisma.cidades.update({
        where: {
            cid_id: id
        },
        data: {
            cid_nome: data.nome,
            cid_populacao: data.populacao,
            cid_latitude: data.lat,
            cid_longitude: data.lon,
            paisId: data.paisId
            
        }
    })

    return cidadeAtualizada
}

async function deleteCidade(id: number) {
    const cidadeDeletada = await prisma.cidades.delete({
        where: {
            cid_id: id
        }
    })

    return cidadeDeletada   
}

export { create, findAll, findUnique, listByPais, update, deleteCidade }