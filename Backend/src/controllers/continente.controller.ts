import * as ContinenteService from "../services/continente.service.js"
import { Request, Response } from "express"

async function addContinente(req: Request, res:Response) {
    try {
        const { nome, desc } = req.body

        const novoContinente = await ContinenteService.create({ nome, desc })

        return res.status(201).json(novoContinente)
    }
    catch (error) {
        return res.status(500).json({message: "Erro ao criar continente", error})
    }
}

export { addContinente }