import { Express, Router } from 'express'
import tutor from './tutor'
import pet from './pet'
import shelter from './shelter'

export const initializeRoutes = (app: Express): void => {
    const routes = Router()

    routes.use(tutor)
    routes.use(shelter)
    routes.use(pet)

    app.use('/api/v1', routes)
}
