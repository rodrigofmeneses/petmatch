import { Request, Response } from 'express'
import { ValidationError } from '../../errors'
import { NotFoundError } from '../../errors'
import { ShelterRepository } from '../../repositories'
import { shelterResponseMapper } from './response'
import { Shelter } from '../../schemas'

class DeleteShelterHandler {
    constructor(protected shelterRepository: ShelterRepository) {}

    async route(req: Request, res: Response) {
        // Receive data
        const { id } = req.query
        // Validate data
        if (!id) {
            throw new ValidationError('Invalid ID')
        }
        // UseCase - Delete
        const tutor = await this.shelterRepository.findById(id as string)
        if (!tutor) {
            throw new NotFoundError('Shelter not found')
        }
        const deletedTutor = (await this.shelterRepository.deleteById(
            id as string
        )) as Shelter
        // Response
        const responseShelter = {
            data: shelterResponseMapper(deletedTutor),
            message: 'Shelter successful deleted',
        }

        res.send(responseShelter)
    }
}

export default DeleteShelterHandler
