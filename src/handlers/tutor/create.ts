import { Request, Response } from 'express'
import { CreateTutorRequest } from './request'
import { ValidationError } from '../../errors'
import { TutorRepository } from '../../repositories'
import { tutorResponseMapper } from './response'
import { BadRequestError } from '../../errors'
import { Validator } from '../utils/validate'

class CreateTutorHandler {
    constructor(
        protected createTutorRequestValidator: Validator<CreateTutorRequest>,
        protected tutorRepository: TutorRepository
    ) {}

    async route(req: Request, res: Response) {
        const { name, email, password }: CreateTutorRequest = req.body
        const requestTutor = { name, email, password }

        if (!this.createTutorRequestValidator.isValid(requestTutor)) {
            throw new ValidationError('Validation Error')
        }

        const dbTutor = await this.tutorRepository.findByEmail(email)
        if (dbTutor) {
            throw new BadRequestError('Invalid Email')
        }
        const tutor = await this.tutorRepository.create(requestTutor)
        const tutorResponse = {
            data: tutorResponseMapper(tutor),
            message: 'Tutor successful created',
        }

        res.status(201).send(tutorResponse)
    }
}

export default CreateTutorHandler
