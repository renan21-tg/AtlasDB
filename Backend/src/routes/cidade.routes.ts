import { Router } from "express";
import * as cidadeController from "../controllers/cidade.controller.js"

const router = Router()

router.post('/cidade', cidadeController.addCidade)

export { router }