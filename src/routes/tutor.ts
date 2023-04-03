import { Router } from 'express'
import { CreateTutorHandler, DeleteTutorHandler } from '../handlers/tutor'
import { CreateTutorRequestValidator } from '../handlers/tutor/request'
import TutorRepository from '../repositories/tutor'
import { emptyBody } from '../middlewares'

const router = Router()

const createTutorRequestValidate = new CreateTutorRequestValidator()
const tutorRepository = new TutorRepository()

const createHandler = new CreateTutorHandler(
    createTutorRequestValidate,
    tutorRepository
)

const deleteHandler = new DeleteTutorHandler(tutorRepository)

router.get('/tutor')
router.post('/tutor', emptyBody, (req, res) => createHandler.route(req, res))
router.put('/tutor')
router.delete('/tutor', (req, res) => deleteHandler.route(req, res))
router.get('/tutors')

export default router
