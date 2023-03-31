import { Router } from 'express'
import { CreateTutorHandler } from '../handlers/tutor'
import { CreateTutorRequestValidator } from '../handlers/tutor/request'
import TutorRepository from '../repositories/tutor'

const router = Router()

const createTutorRequestValidate = new CreateTutorRequestValidator()
const tutorRepository = new TutorRepository()

const createHandler = new CreateTutorHandler(
    createTutorRequestValidate,
    tutorRepository
)

router.get('/tutor/:id')
router.post('/tutor', (req, res) => createHandler.route(req, res))
router.put('/tutor/:id')
router.delete('/tutor/:id')
router.get('/tutors')

export default router
