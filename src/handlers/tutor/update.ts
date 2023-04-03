import { Request, Response } from 'express'
import { UpdateTutorRequestValidator, updateTutorRequest } from './request'
import { NotFoundError, ValidationError } from '../../errors'
import TutorRepository from '../../repositories/tutor'
import { tutorResponseMapper } from './response'
import { Tutor } from '../../schemas'

class UpdateTutorHandler {
    constructor(
        protected updateTutorRequestValidator: UpdateTutorRequestValidator,
        protected tutorRepository: TutorRepository
    ) {}

    async route(req: Request, res: Response) {
        // Receiver Params
        const { id } = req.query
        const { name, email, password, avatar, phone, city, about } = req.body
        const requestTutor = {
            name,
            email,
            password,
            avatar,
            phone,
            city,
            about,
        } as updateTutorRequest

        // Validate Data - ID
        if (!id) {
            throw new ValidationError('Invalid ID')
        }
        // Validate Data - Body
        if (!this.updateTutorRequestValidator.isValid(requestTutor)) {
            throw new ValidationError('Validation Error')
        }
        // UseCase - Update
        const tutor = await this.tutorRepository.findById(id as string)
        if (!tutor) {
            throw new NotFoundError('Tutor not found')
        }
        // Update Tutor
        for (const key in requestTutor) {
            tutor[key] = requestTutor['key']
        }

        const updatedTutor = (await this.tutorRepository.updateById(
            id as string,
            requestTutor
        )) as Tutor

        const responseTutor = {
            data: tutorResponseMapper(updatedTutor),
            message: 'Tutor successful updated',
        }
        res.send(responseTutor)
    }
}

export default UpdateTutorHandler
