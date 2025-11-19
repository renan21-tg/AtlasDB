import { Request, Response } from "express";
import * as cidadeService from "../services/cidade.service.js"

async function addCidade(req: Request, res: Response) {
    try{
        const { nome, populacao, paisId } = req.body

        const novaCidade = await cidadeService.create({ nome, populacao, paisId})

        return res.status(201).json(novaCidade)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage})
    }
}

async function getAllCidades(_req: Request, res: Response) {
    try {
        const cidades = await cidadeService.findAll()

        return res.status(200).json(cidades)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage })
    }
}

async function getCidadeById(req: Request, res: Response) {
    try {
        const { id } = req.params
        const cidade = await cidadeService.findUnique(Number(id))

        if (cidade === null) {
            return res.status(404).json({message: "Cidade não encontrada"})
        } else {
            return res.status(200).json(cidade)
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage })
    }
}

async function getCidadesByContinente(req: Request, res: Response) {
    try {
        const { id } = req.params
        const cidadesContinente = await cidadeService.listByPais(Number(id))

        return res.status(200).json(cidadesContinente)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage })
    }
    
}

async function updateCidade(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { nome, populacao, lat, lon, paisId } = req.body

        const cidadeAtualizada = await cidadeService.update(Number(id), { nome, populacao, lat, lon, paisId})

        return res.status(200).json(cidadeAtualizada)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage })
    }
}

async function deleteCidade(req: Request, res: Response) {
    try {
        const { id } = req.params

        const cidadeDeletada = await cidadeService.deleteCidade(Number(id))

        return res.status(200).json(cidadeDeletada)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage })
    }
}

async function getCidadeWeather(req: Request, res: Response) {
    try {
        const { id } = req.params
        const clima = await cidadeService.getWeather(Number(id))
        return res.status(200).json(clima)
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro ao buscar clima", error: errorMessage })
    }
}

export { addCidade, getAllCidades, getCidadeById, getCidadesByContinente, updateCidade, deleteCidade, getCidadeWeather }