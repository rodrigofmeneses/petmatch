import { Request, Response } from 'express'
import TutorRepository from '../../repositories/tutor'
import { tutorResponseMapper } from './response'

class ListTutorHandler {
    constructor(protected tutorRepository: TutorRepository) {}

    async route(req: Request, res: Response) {
        const tutors = await this.tutorRepository.list()
        const responseTutors = tutors.map((tutor) => tutorResponseMapper(tutor))
        res.send({ data: responseTutors, message: 'successful get tutors' })
    }
}

export default ListTutorHandler
