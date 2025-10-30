import { Router } from "express";
import * as ContinenteController from '../controllers/continente.controller.js'

const router = Router()

router.post('/continente', ContinenteController.addContinente)
router.get('/continente', ContinenteController.getAllContinentes)
router.get('/continente/:id', ContinenteController.getContinenteById)
router.put('/continente/:id', ContinenteController.updateContinente)

export { router } 