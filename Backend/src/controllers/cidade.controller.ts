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

export { addCidade }