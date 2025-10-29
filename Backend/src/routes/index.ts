import { Router } from "express";
import { router as continenteRouter } from './continentes.routes.js'

const routes = Router()

routes.use(continenteRouter)

export { routes }