import { Router } from "express";
import * as paisControler from "../controllers/pais.controllers.js"

const router = Router()

router.post('/pais', paisControler.addPais)
router.get('/pais', paisControler.getAllPaises)
router.get('/pais/:id', paisControler.getPaisById)
router.put('/pais/:id', paisControler.updatePais)
router.delete('/pais/:id', paisControler.deletePais)

export { router }