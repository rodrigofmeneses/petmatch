import { Router } from 'express'
import { ShelterRepository } from '../repositories'
import { PrismaClient } from '@prisma/client'
import {
    CreateShelterHandler,
    ListSheltersHandler,
    ShowShelterHandler,
} from '../handlers/shelter'
import { CreateShelterRequestValidator } from '../handlers/shelter/request'
import { emptyBody } from '../middlewares'

const router = Router()

const db = new PrismaClient()

const shelterRepository = new ShelterRepository(db)

const createShelterValidator = new CreateShelterRequestValidator()
const createHandler = new CreateShelterHandler(
    createShelterValidator,
    shelterRepository
)

const showHandler = new ShowShelterHandler(shelterRepository)
const listHandler = new ListSheltersHandler(shelterRepository)

router.get('/shelter', (req, res) => showHandler.route(req, res))
router.post('/shelter', emptyBody, (req, res) => createHandler.route(req, res))
router.put('/shelter')
router.delete('/shelter')
router.get('/shelters', (req, res) => listHandler.route(req, res))

export default router
