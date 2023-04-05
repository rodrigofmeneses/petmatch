import { Router } from 'express'
import { ShelterRepository } from '../repositories'
import { PrismaClient } from '@prisma/client'
import {
    CreateShelterHandler,
    DeleteShelterHandler,
    ListSheltersHandler,
    ShowShelterHandler,
} from '../handlers/shelter'
import {
    CreateShelterRequestValidator,
    UpdateShelterRequestValidator,
} from '../handlers/shelter/request'
import { emptyBody } from '../middlewares'
import UpdateShelterHandler from '../handlers/shelter/update'

const router = Router()

const db = new PrismaClient()

const shelterRepository = new ShelterRepository(db)

const createShelterValidator = new CreateShelterRequestValidator()
const createHandler = new CreateShelterHandler(
    createShelterValidator,
    shelterRepository
)
const updateShelterValidator = new UpdateShelterRequestValidator()
const updateHandler = new UpdateShelterHandler(
    updateShelterValidator,
    shelterRepository
)
const deleteHandler = new DeleteShelterHandler(shelterRepository)
const showHandler = new ShowShelterHandler(shelterRepository)
const listHandler = new ListSheltersHandler(shelterRepository)

router.get('/shelter', (req, res) => showHandler.route(req, res))
router.post('/shelter', emptyBody, (req, res) => createHandler.route(req, res))
router.put('/shelter', emptyBody, (req, res) => updateHandler.route(req, res))
router.delete('/shelter', (req, res) => deleteHandler.route(req, res))
router.get('/shelters', (req, res) => listHandler.route(req, res))

export default router
