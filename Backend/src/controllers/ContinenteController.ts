import { prisma } from "../prismaClient.js"
import { Request, Response } from "express"

async function addContinente(req: Request, res: Response) {
    try {
        const {nome, desc} = req.body

        const novoContinente = await prisma.continentes.create({
            data: {
                con_nome: nome,
                con_descricao: desc
            }
        })
            
        return res.status(201).json(novoContinente)
    }
    catch (error) {
        return res.status(500).json({message: "Erro ao cadastrar cliente", error})
    }
}

export { addContinente }