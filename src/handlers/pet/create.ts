import { Request, Response } from 'express'
import { CreatePetRequestValidator, CreatePetRequest } from './request'
import { BadRequestError, ValidationError } from '../../errors'
import { PetRepository, ShelterRepository } from '../../repositories'
import { petResponseMapper } from './response'

class CreatePetHandler {
    constructor(
        protected createPetRequestValidator: CreatePetRequestValidator,
        protected petRepository: PetRepository,
        protected shelterRepository: ShelterRepository
    ) {}

    async route(req: Request, res: Response) {
        const { name, age, shelterId }: CreatePetRequest = req.body
        const petRequest = { name, age, shelterId }

        if (!this.createPetRequestValidator.isValid(petRequest)) {
            throw new ValidationError('Validation Error')
        }
        if (!(await this.shelterRepository.findById(shelterId))) {
            throw new BadRequestError('Invalid shelter id')
        }

        const pet = await this.petRepository.create(petRequest)
        const petResponse = {
            data: petResponseMapper(pet),
            message: 'Pet successful created',
        }

        res.status(201).send(petResponse)
    }
}

export default CreatePetHandler
