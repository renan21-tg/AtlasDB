import { Router } from "express";
import * as paisControler from "../controllers/pais.controllers.js"

const router = Router()

router.post('/pais', paisControler.addPais)
router.get('/pais', paisControler.getAllPaises)

export { router }