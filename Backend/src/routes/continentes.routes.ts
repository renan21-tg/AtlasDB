import { Router } from "express";
import * as continenteController from '../controllers/continente.controller.js'
import * as paisControler from "../controllers/pais.controllers.js"

const router = Router()

router.post('/continente', continenteController.addContinente)
router.get('/continente', continenteController.getAllContinentes)
router.get('/continente/:id', continenteController.getContinenteById)
router.get('/continente/:id/paises', paisControler.getPaisesByContinente)
router.put('/continente/:id', continenteController.updateContinente)
router.delete('/continente/:id', continenteController.deleteContinente)

export { router } 