import express from "express"
import { routes } from './routes/index.js'

const app = express()
app.use(express.json())

app.get("/", (_request, response) => {
    return response.json({ message: "API funcionando"})
})

app.use(routes)

export { app }