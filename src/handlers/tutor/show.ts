import { Request, Response } from 'express'
import TutorRepository from '../../repositories/tutor'
import { tutorResponseMapper } from './response'
import { NotFoundError, ValidationError } from '../../errors'

class ListTutorHandler {
    constructor(protected tutorRepository: TutorRepository) {}

    async route(req: Request, res: Response) {
        const { id } = req.query

        if (!id) {
            throw new ValidationError('Invalid ID')
        }
        // Get Tutors
        const tutor = await this.tutorRepository.show(id as string)
        if (!tutor) {
            throw new NotFoundError('Tutor not found')
        }
        // Response data
        const responseTutor = tutorResponseMapper(tutor)
        res.send({ data: responseTutor, message: 'successful get tutor' })
    }
}

export default ListTutorHandler
