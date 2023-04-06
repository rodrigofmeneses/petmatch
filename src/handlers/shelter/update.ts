import { Request, Response } from 'express'
import { UpdateShelterRequestValidator, UpdateShelterRequest } from './request'
import { NotFoundError, ValidationError } from '../../errors'
import { ShelterRepository } from '../../repositories'
import { shelterResponseMapper } from './response'
import { Shelter } from '../../schemas'

class UpdateShelterHandler {
    constructor(
        protected updateShelterRequestValidator: UpdateShelterRequestValidator,
        protected shelterRepository: ShelterRepository
    ) {}

    async route(req: Request, res: Response) {
        const { id } = req.query
        const { name, email, password, avatar, phone, city, about } = req.body
        const requestShelter = {
            name,
            email,
            password,
            avatar,
            phone,
            city,
            about,
        } as UpdateShelterRequest

        if (!id) {
            throw new ValidationError('Invalid ID')
        }

        if (!this.updateShelterRequestValidator.isValid(requestShelter)) {
            throw new ValidationError('Validation Error')
        }

        const shelter = (await this.shelterRepository.findById(
            id as string
        )) as Shelter
        if (!shelter) {
            throw new NotFoundError('Shelter not found')
        }

        for (const key in requestShelter) {
            shelter[key] = requestShelter['key']
        }

        const updatedShelter = await this.shelterRepository.updateById(
            id as string,
            requestShelter
        )

        const responseShelter = {
            data: shelterResponseMapper(updatedShelter),
            message: 'Shelter successful updated',
        }
        res.send(responseShelter)
    }
}

export default UpdateShelterHandler
