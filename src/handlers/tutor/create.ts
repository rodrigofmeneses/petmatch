import { Request, Response } from 'express'
import { CreateTutorRequestValidator, createTutorRequest } from './request'
import ValidationError from '../../errors/validation-error'
import TutorRepository from '../../repositories/tutor'
import { tutorResponseMapper } from './response'
import { BadRequestError } from '../../errors'

class CreateTutorHandler {
    constructor(
        protected createTutorRequestValidator: CreateTutorRequestValidator,
        protected tutorRepository: TutorRepository
    ) {}

    async route(req: Request, res: Response) {
        // Receive data
        const { name, email, password }: createTutorRequest = req.body
        const requestTutor = { name, email, password }

        // Validade data
        if (!this.createTutorRequestValidator.isValid(requestTutor)) {
            throw new ValidationError('Validation Error')
        }

        // UseCase - Register tutor on database
        const dbTutor = await this.tutorRepository.findByEmail(email)
        if (dbTutor) {
            throw new BadRequestError('Invalid Email')
        }
        const tutor = await this.tutorRepository.create(requestTutor)
        // Handle Response
        const tutorResponse = {
            data: tutorResponseMapper(tutor),
            message: 'Tutor successful created',
        }

        res.status(201).send(tutorResponse)
    }
}

export default CreateTutorHandler
