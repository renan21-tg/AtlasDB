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

export { addPais, getAllPaises }