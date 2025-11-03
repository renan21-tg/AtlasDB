import { prisma } from "../prismaClient.js";
import * as paisService from "../services/pais.service.js"

type cidadeCreateData = {
    nome: string,
    populacao: number,
    paisId: number,
}


async function create(data: cidadeCreateData) {
    const validaPais = await paisService.findUnique(data.paisId)

    if (!validaPais) {
        throw new Error("Pais não encontrado")
    }

    const nomeCidade = encodeURI(data.nome)
    const urlApi = `http://api.openweathermap.org/geo/1.0/direct?q=${nomeCidade}&limit=5&appid={API_KEY}`
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

export { create }