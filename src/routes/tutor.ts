import { Router } from 'express'
import {
    CreateTutorHandler,
    DeleteTutorHandler,
    UpdateTutorHandler,
    ListTutorHandler,
    ShowTutorHandler,
    LoginTutorHandler,
} from '../handlers/tutor'
import {
    CreateTutorRequestValidator,
    UpdateTutorRequestValidator,
} from '../handlers/tutor/request'
import TutorRepository from '../repositories/tutor'
import { emptyBody } from '../middlewares'
import { LoginRequestValidator } from '../handlers/utils/login-request'
import { Encrypter, TokenGenerator } from '../utils'

const router = Router()

const tutorRepository = new TutorRepository()

const showHandler = new ShowTutorHandler(tutorRepository)

const encrypter = new Encrypter()
const createTutorRequestValidate = new CreateTutorRequestValidator()
const createHandler = new CreateTutorHandler(
    createTutorRequestValidate,
    tutorRepository,
    encrypter
)

const updateTutorRequestValidate = new UpdateTutorRequestValidator()
const updateHandler = new UpdateTutorHandler(
    updateTutorRequestValidate,
    tutorRepository
)

const deleteHandler = new DeleteTutorHandler(tutorRepository)

const listHandler = new ListTutorHandler(tutorRepository)

const loginRequestValidator = new LoginRequestValidator()
const tokenGenerator = new TokenGenerator('super-secret')
const loginHandler = new LoginTutorHandler(
    loginRequestValidator,
    tutorRepository,
    encrypter,
    tokenGenerator
)

router.get('/tutor', (req, res) => showHandler.route(req, res))
router.post('/tutor', emptyBody, (req, res) => createHandler.route(req, res))
router.put('/tutor', emptyBody, (req, res) => updateHandler.route(req, res))
router.delete('/tutor', (req, res) => deleteHandler.route(req, res))
router.get('/tutors', (req, res) => listHandler.route(req, res))
router.post('/tutor/login', emptyBody, (req, res) =>
    loginHandler.route(req, res)
)

export default router
