import { Request, Response } from 'express'
import { ShelterRepository } from '../../repositories'
import { shelterResponseMapper } from './response'
import { NotFoundError, ValidationError } from '../../errors'

class ListShelterHandler {
    constructor(protected shelterRepository: ShelterRepository) {}

    async route(req: Request, res: Response) {
        const { id } = req.query

        if (!id) {
            throw new ValidationError('Invalid ID')
        }
        const tutor = await this.shelterRepository.show(id as string)
        if (!tutor) {
            throw new NotFoundError('Shelter not found')
        }
        const responseTutor = shelterResponseMapper(tutor)
        res.send({ data: responseTutor, message: 'Successful get shelter' })
    }
}

export default ListShelterHandler
