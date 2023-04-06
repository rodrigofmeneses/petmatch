import { Request, Response } from 'express'
import { UpdateShelterRequestValidator, UpdateShelterRequest } from './request'
import { BadRequestError, NotFoundError, ValidationError } from '../../errors'
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
        const { name, avatar, phone, city } = req.body
        const requestShelter = {
            name,
            avatar,
            phone,
            city,
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
        const shelterByName = (await this.shelterRepository.findByName(
            name
        )) as Shelter
        if (!shelter) {
            throw new NotFoundError('Shelter not found')
        }
        if (shelterByName) {
            if (shelterByName.name === name && shelterByName.id !== id) {
                throw new BadRequestError('Shelter name already exist')
            }
        }

        for (const key in requestShelter) {
            shelter[key] = requestShelter['key']
        }

        const updatedShelter = (await this.shelterRepository.updateById(
            id as string,
            requestShelter
        )) as Shelter

        const responseShelter = {
            data: shelterResponseMapper(updatedShelter),
            message: 'Shelter successful updated',
        }
        res.send(responseShelter)
    }
}

export default UpdateShelterHandler
