import { Request, Response } from 'express'
import { PetRepository } from '../../repositories'
import { petResponseMapper } from './response'

class ListPetsHandler {
    constructor(protected petRepository: PetRepository) {}

    async route(req: Request, res: Response) {
        const shelters = await this.petRepository.list()

        const petResponse = {
            data: shelters.map((pet) => petResponseMapper(pet)),
            message: 'Successful get pets',
        }
        res.send(petResponse)
    }
}

export default ListPetsHandler
