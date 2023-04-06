import { Request, Response } from 'express'
import { ValidationError } from '../../errors'
import { NotFoundError } from '../../errors'
import { PetRepository } from '../../repositories'
import { petResponseMapper } from './response'
import { Pet } from '../../schemas'

class DeletePetHandler {
    constructor(protected petRepository: PetRepository) {}

    async route(req: Request, res: Response) {
        const { id } = req.query

        if (!id) {
            throw new ValidationError('Invalid ID')
        }

        const pet = await this.petRepository.findById(id as string)
        if (!pet) {
            throw new NotFoundError('Pet not found')
        }
        const deletedPet = (await this.petRepository.deleteById(
            id as string
        )) as Pet

        const petResponse = {
            data: petResponseMapper(deletedPet),
            message: 'Pet successful deleted',
        }

        res.send(petResponse)
    }
}

export default DeletePetHandler
