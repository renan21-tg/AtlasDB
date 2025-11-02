import { Request, Response } from "express";
import * as paisService from "../services/pais.service.js"

async function addPais(req: Request, res: Response) {
    try {
        const { nome, continenteId } = req.body

        const novoPais = await paisService.create({ nome, continenteId})

        return res.status(201).json(novoPais)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage})
    }
}

async function getAllPaises(_req: Request, res: Response) {
    try {
        const paises = await paisService.findAll()

        return res.status(200).json(paises)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage })
    }
}

async function getPaisById(req: Request, res:Response) {
    try {
        const { id } = req.params
        const pais = await paisService.findUnique(Number(id))

        if (pais === null) {
            return res.status(404).json({message: "Pais não encontrado"})
        } else {
            return res.status(200).json({pais})
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage })
    }
}

async function getPaisesByContinente(req: Request, res: Response) {
    try {
        const { id } = req.params
        const paisesContinente = await paisService.listByContinente(Number(id))

        return res.status(200).json(paisesContinente)
        
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage })
    }
}

async function updatePais(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { nome, descricao, idioma_oficial, moeda, populacao, continenteID } = req.body

        const paisAtualizado = await paisService.update(Number(id), { nome, descricao, idioma_oficial, moeda, populacao, continenteID })

        return res.status(200).json(paisAtualizado)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage })
    }
}

async function deletePais(req: Request, res:Response) {
    try {
        const { id } = req.params

        const paisDeleteado = await paisService.deletePais(Number(id))

        return res.status(200).json(paisDeleteado)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage })
    }
}

export { addPais, getAllPaises, getPaisById, getPaisesByContinente, updatePais, deletePais }