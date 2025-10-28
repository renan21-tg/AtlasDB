import express from "express"

const app = express()

app.use(express.json())

app.get("/", (_request, response) => {
    return response.json({ message: "API funcionando"})
})

export { app }