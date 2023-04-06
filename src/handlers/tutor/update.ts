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

        if (!id) {
            throw new ValidationError('Invalid ID')
        }
        if (!this.updateTutorRequestValidator.isValid(requestTutor)) {
            throw new ValidationError('Validation Error')
        }
        const tutor = await this.tutorRepository.findById(id as string)
        if (!tutor) {
            throw new NotFoundError('Tutor not found')
        }
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
