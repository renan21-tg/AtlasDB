import { Router } from "express";
import { router as continenteRouter } from './continentes.routes.js'
import { router as paisRouter } from "./pais.routes.js"

const routes = Router()

routes.use(continenteRouter)
routes.use(paisRouter)

export { routes }