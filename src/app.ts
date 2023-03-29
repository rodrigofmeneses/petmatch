import express from 'express'
import { initializeRoutes } from './routes'

const app = express()
const port = 8080

initializeRoutes(app)

app.listen(port, () => {
    console.log(`PetMatch is running on http://localhost:${port}`)
})
