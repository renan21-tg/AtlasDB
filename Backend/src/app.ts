import express from "express"
import { routes } from './routes/index.js'
import cors from "cors"

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())


app.get("/", (_request, response) => {
    return response.json({ message: "API funcionando"})
})

app.use(routes)

export { app }