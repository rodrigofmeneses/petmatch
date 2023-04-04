import { Router } from 'express'
import {
    CreateTutorHandler,
    DeleteTutorHandler,
    UpdateTutorHandler,
    ListTutorHandler,
} from '../handlers/tutor'
import {
    CreateTutorRequestValidator,
    UpdateTutorRequestValidator,
} from '../handlers/tutor/request'
import TutorRepository from '../repositories/tutor'
import { emptyBody } from '../middlewares'

const router = Router()

const tutorRepository = new TutorRepository()

const createTutorRequestValidate = new CreateTutorRequestValidator()

const createHandler = new CreateTutorHandler(
    createTutorRequestValidate,
    tutorRepository
)

const updateTutorRequestValidate = new UpdateTutorRequestValidator()

const updateHandler = new UpdateTutorHandler(
    updateTutorRequestValidate,
    tutorRepository
)

const deleteHandler = new DeleteTutorHandler(tutorRepository)

const listHandler = new ListTutorHandler(tutorRepository)

router.get('/tutor')
router.post('/tutor', emptyBody, (req, res) => createHandler.route(req, res))
router.put('/tutor', emptyBody, (req, res) => updateHandler.route(req, res))
router.delete('/tutor', (req, res) => deleteHandler.route(req, res))
router.get('/tutors', (req, res) => listHandler.route(req, res))

export default router
