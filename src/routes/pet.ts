import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { PetRepository, ShelterRepository } from '../repositories'
import {
    CreatePetRequestValidator,
    UpdatePetRequestValidator,
} from '../handlers/pet/request'
import {
    CreatePetHandler,
    DeletePetHandler,
    ListPetsHandler,
    ShowPetHandler,
} from '../handlers/pet'
import { emptyBody } from '../middlewares'
import UpdatePetHandler from '../handlers/pet/update'

const router = Router()

const db = new PrismaClient()

const petRepository = new PetRepository(db)
const shelterRepository = new ShelterRepository(db)

const createShelterValidator = new CreatePetRequestValidator()
const createHandler = new CreatePetHandler(
    createShelterValidator,
    petRepository,
    shelterRepository
)

const updateShelterValidator = new UpdatePetRequestValidator()
const updateHandler = new UpdatePetHandler(
    updateShelterValidator,
    petRepository,
    shelterRepository
)

const deleteHandler = new DeletePetHandler(petRepository)
const showHandler = new ShowPetHandler(petRepository)
const listHandler = new ListPetsHandler(petRepository)

router.get('/pet', (req, res) => showHandler.route(req, res))
router.post('/pet', emptyBody, (req, res) => createHandler.route(req, res))
router.delete('/pet', (req, res) => deleteHandler.route(req, res))
router.put('/pet', emptyBody, (req, res) => updateHandler.route(req, res))
router.get('/pets', (req, res) => listHandler.route(req, res))

export default router
