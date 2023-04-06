import { Request, Response } from 'express'
import { ShelterRepository } from '../../repositories'
import { shelterResponseMapper } from './response'

class ListSheltersHandler {
    constructor(protected shelterRepository: ShelterRepository) {}

    async route(req: Request, res: Response) {
        const shelters = await this.shelterRepository.list()
        const responseShelters = {
            data: shelters.map((shelter) => shelterResponseMapper(shelter)),
            message: 'successful get shelters',
        }
        res.send(responseShelters)
    }
}

export default ListSheltersHandler
