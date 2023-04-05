import { Shelter } from '../../schemas'
import { paramIsRequired } from '../utils'
import { Validator } from '../utils/validate'

export type createShelterRequest = Pick<Shelter, 'name' | 'phone' | 'city'>
export type UpdateShelterRequest = Partial<
    Omit<Shelter, 'id' | 'createdAt' | 'updatedAt'>
>
export class CreateShelterRequestValidator
    implements Validator<createShelterRequest>
{
    constructor() {}

    isValid(request: createShelterRequest) {
        const { name, phone, city } = request
        if (!name) {
            return paramIsRequired('name')
        }
        if (!phone) {
            return paramIsRequired('phone')
        }
        if (!city) {
            return paramIsRequired('city')
        }
        return true
    }
}

export class UpdateShelterRequestValidator
    implements Validator<UpdateShelterRequest>
{
    constructor() {}

    isValid(request: UpdateShelterRequest) {
        const { name, avatar, phone, city } = request
        return true
    }
}
