import { Router } from "express";
import * as paisControler from "../controllers/pais.controllers.js"
import * as cidadeController from "../controllers/cidade.controller.js"

const router = Router()

router.post('/pais', paisControler.addPais)
router.get('/pais', paisControler.getAllPaises)
router.get('/pais/:id', paisControler.getPaisById)
router.get('/pais/:id/cidades', cidadeController.getCidadesByContinente)
router.put('/pais/:id', paisControler.updatePais)
router.delete('/pais/:id', paisControler.deletePais)

export { router }