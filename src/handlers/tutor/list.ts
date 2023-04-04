import { Request, Response } from 'express'
import TutorRepository from '../../repositories/tutor'
import { tutorResponseMapper } from './response'

class ListTutorHandler {
    constructor(protected tutorRepository: TutorRepository) {}

    async route(req: Request, res: Response) {
        // Get Tutors
        const tutors = await this.tutorRepository.list()
        // Response data
        const responseTutors = tutors.map((tutor) => tutorResponseMapper(tutor))
        res.send({ data: responseTutors, message: 'successful get tutors' })
    }
}

export default ListTutorHandler
