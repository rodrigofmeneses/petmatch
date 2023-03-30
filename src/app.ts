import 'express-async-errors'
import express from 'express'
import { initializeRoutes } from './routes'
import { emptyBody, errorHandler } from './middlewares'

const app = express()
const port = 8080

app.use(express.json())
app.use(emptyBody)

initializeRoutes(app)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`PetMatch is running on http://localhost:${port}`)
})
