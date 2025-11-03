import { Router } from "express";
import * as cidadeController from "../controllers/cidade.controller.js"

const router = Router()

router.post('/cidade', cidadeController.addCidade)
router.get('/cidade', cidadeController.getAllCidades)
router.get('/cidade/:id', cidadeController.getCidadeById)
router.put('/cidade/:id', cidadeController.updateCidade)
router.delete('/cidade/:id', cidadeController.deleteCidade)

export { router }