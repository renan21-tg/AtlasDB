import * as ContinenteService from "../services/continente.service.js"
import { Request, Response } from "express"

async function addContinente(req: Request, res:Response) {
    try {
        const { nome, desc } = req.body

        const novoContinente = await ContinenteService.create({ nome, desc })

        return res.status(201).json(novoContinente)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage });
    }
}

async function getAllContinentes(_req: Request, res: Response) {
    try {
        const continentes = await ContinenteService.findAll()

        return res.status(200).json(continentes)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage });
    }
}

async function getContinenteById(req: Request, res: Response) {
    try {
        const { id } = req.params
        const continente = await ContinenteService.findUnique(Number(id))

        if (continente === null) {
            return res.status(404).json({message: "Continente inexistente"})
        } else {
            return res.status(200).json(continente)
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage })
    }
}

async function updateContinente(req:Request, res: Response) {
    try {
        const { id } = req.params
        const { nome, desc } = req.body

        const contineteAtualizado = await ContinenteService.update(Number(id), { nome, desc })

        return res.status(200).json(contineteAtualizado)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ message: "Erro interno do servidor", error: errorMessage})

    }
}

async function deleteContinente(req: Request, res: Response) {
    try {
        const { id } = req.params

        const continenteDeletado = await ContinenteService.deleteCont(Number(id))

        return res.status(200).json(continenteDeletado)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        return res.status(500).json({ messag: "Errro interno do servidor", error: errorMessage})
    }
}
export { addContinente, getAllContinentes, getContinenteById, updateContinente, deleteContinente }