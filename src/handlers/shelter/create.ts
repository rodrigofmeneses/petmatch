import { Request, Response } from 'express'
import { CreateShelterRequestValidator, CreateShelterRequest } from './request'
import { BadRequestError, ValidationError } from '../../errors'
import { ShelterRepository } from '../../repositories'
import { shelterResponseMapper } from './response'

class CreateShelterHandler {
    constructor(
        protected createShelterRequestValidator: CreateShelterRequestValidator,
        protected shelterRepository: ShelterRepository
    ) {}

    async route(req: Request, res: Response) {
        const { name, email, password }: CreateShelterRequest = req.body
        const requestShelter = { name, email, password }

        if (!this.createShelterRequestValidator.isValid(requestShelter)) {
            throw new ValidationError('Validation Error')
        }

        const dbShelter = await this.shelterRepository.findByEmail(email)
        if (dbShelter) {
            throw new BadRequestError('Invalid Email')
        }
        const shelter = await this.shelterRepository.create(requestShelter)
        const shelterResponse = {
            data: shelterResponseMapper(shelter),
            message: 'Shelter successful created',
        }

        res.status(201).send(shelterResponse)
    }
}

export default CreateShelterHandler
