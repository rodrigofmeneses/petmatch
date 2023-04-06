import { Request, Response } from 'express'
import { PetRepository } from '../../repositories'
import { petResponseMapper } from './response'
import { NotFoundError, ValidationError } from '../../errors'
import { Pet } from '../../schemas'

class ShowPetHandler {
    constructor(protected petRepository: PetRepository) {}

    async route(req: Request, res: Response) {
        const { id } = req.query

        if (!id) {
            throw new ValidationError('Invalid ID')
        }
        // Get Tutors
        const pet = (await this.petRepository.show(id as string)) as Pet
        if (!pet) {
            throw new NotFoundError('Pet not found')
        }
        // Response data
        const petResponse = petResponseMapper(pet)
        res.send({ data: petResponse, message: 'Successful get pet' })
    }
}

export default ShowPetHandler
