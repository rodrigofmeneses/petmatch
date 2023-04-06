import { Request, Response } from 'express'
import { CreateShelterRequestValidator, createShelterRequest } from './request'
import { BadRequestError, ValidationError } from '../../errors'
import { ShelterRepository } from '../../repositories'
import { shelterResponseMapper } from './response'

class CreateShelterHandler {
    constructor(
        protected createShelterRequestValidator: CreateShelterRequestValidator,
        protected shelterRepository: ShelterRepository
    ) {}

    async route(req: Request, res: Response) {
        const { name, phone, city }: createShelterRequest = req.body
        const requestShelter = { name, phone, city }

        if (!this.createShelterRequestValidator.isValid(requestShelter)) {
            throw new ValidationError('Validation Error')
        }

        const dbShelter = await this.shelterRepository.findByName(name)
        if (dbShelter) {
            throw new BadRequestError('Shelter name already exist')
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
