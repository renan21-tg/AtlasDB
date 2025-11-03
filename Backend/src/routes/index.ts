import { Router } from "express";
import { router as continenteRouter } from './continentes.routes.js'
import { router as paisRouter } from "./pais.routes.js"
import { router as cidadeRouter } from "./cidade.routes.js"

const routes = Router()

routes.use(continenteRouter)
routes.use(paisRouter)
routes.use(cidadeRouter)

export { routes }