import { Request, Response } from 'express'
import ValidationError from '../../errors/validation-error'
import { NotFoundError } from '../../errors'
import TutorRepository from '../../repositories/tutor'
import { tutorResponseMapper } from './response'
import { Tutor } from '../../schemas'

class DeleteTutorHandler {
    constructor(protected tutorRepository: TutorRepository) {}

    async route(req: Request, res: Response) {
        const { id } = req.query
        if (!id) {
            throw new ValidationError('Invalid ID')
        }
        const tutor = await this.tutorRepository.findById(id as string)
        if (!tutor) {
            throw new NotFoundError('Tutor not found')
        }
        const deletedTutor = (await this.tutorRepository.deleteById(
            id as string
        )) as Tutor
        const responseTutor = {
            data: tutorResponseMapper(deletedTutor),
            message: 'Tutor successful deleted',
        }

        res.send(responseTutor)
    }
}

export default DeleteTutorHandler
