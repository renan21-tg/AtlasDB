import { prisma } from "../prismaClient.js";
import * as ContinenteService from "./continente.service.js"

type paisCreateData = {
    nome: string,
    continenteId: number 
}

async function create (data: paisCreateData) {
    const validaContinente = await ContinenteService.findUnique(data.continenteId)

    if (!validaContinente) {
        throw new Error("Continente não encontrado.")
    }

    const nomePais = encodeURIComponent(data.nome) 
    const urlApi = `https://restcountries.com/v3.1/translation/${nomePais}`

    let dadosApi

    try {
        const response = await fetch(urlApi)

        if(!response.ok) {
            throw new Error(`API externa retornou: ${response.status}`)
        }

        const dados = await response.json() as any []
        dadosApi = dados[0]
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Erro ao buscar dados do país: ${error.message}`);
        }
        throw new Error(`Erro desconhecido ao buscar dados do país: ${String(error)}`);
    }

    const descricao = dadosApi.translations.por.official
    const idiomaOficial = Object.values(dadosApi.languages)[0] as string
    const moeda = Object.keys(dadosApi.currencies)[0]
    const populacao = dadosApi.population

    const novoPais = await prisma.paises.create({
        data: {
            pai_nome: data.nome,
            pai_descricao: descricao,
            pai_idioma_oficial: idiomaOficial,
            pai_moeda: moeda,
            pai_populacao: populacao,
            continenteId: data.continenteId
        }
    })

    return novoPais
}

async function findAll() {
    const paises = await prisma.paises.findMany()

    return paises
}

export { create, findAll }