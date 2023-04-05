import { Shelter } from '../../schemas'
import { paramIsRequired } from '../utils'
import { Validator } from '../utils/validate'

export type createShelterRequest = Pick<Shelter, 'name' | 'phone' | 'city'>

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
