import { Request, Response } from 'express'
import { UpdatePetRequestValidator, UpdatePetRequest } from './request'
import { BadRequestError, NotFoundError, ValidationError } from '../../errors'
import { PetRepository, ShelterRepository } from '../../repositories'
import { petResponseMapper } from './response'
import { Pet } from '../../schemas'

class UpdatePetHandler {
    constructor(
        protected updatePetRequestValidator: UpdatePetRequestValidator,
        protected petRepository: PetRepository,
        protected shelterRepository: ShelterRepository
    ) {}

    async route(req: Request, res: Response) {
        const { id } = req.query
        const { name, age, city, about, image, shelterId } = req.body
        const petRequest = {
            name,
            age,
            city,
            about,
            image,
            shelterId,
        } as UpdatePetRequest

        if (!id) {
            throw new ValidationError('Invalid ID')
        }

        if (!this.updatePetRequestValidator.isValid(petRequest)) {
            throw new ValidationError('Validation Error')
        }

        if (!(await this.shelterRepository.findById(shelterId))) {
            throw new BadRequestError('Invalid shelter id')
        }

        const pet = (await this.petRepository.findById(id as string)) as Pet
        if (!pet) {
            throw new NotFoundError('Pet not found')
        }

        for (const key in petRequest) {
            pet[key] = petRequest['key']
        }

        const updatedPet = (await this.petRepository.updateById(
            id as string,
            petRequest
        )) as Pet

        const petResponse = {
            data: petResponseMapper(updatedPet),
            message: 'Pet successful updated',
        }
        res.send(petResponse)
    }
}

export default UpdatePetHandler
