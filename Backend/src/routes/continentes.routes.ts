import { Router } from "express";
import * as ContinenteController from '../controllers/continenteController.js'

const router = Router()

router.post('/continente', ContinenteController.addContinente)

export { router }