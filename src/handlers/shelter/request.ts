import { InvalidEmailError } from '../../errors'
import { Shelter } from '../../schemas'
import { paramIsRequired } from '../utils'
import { Validator } from '../utils/validate'

export type CreateShelterRequest = Pick<Shelter, 'name' | 'email' | 'password'>
export type UpdateShelterRequest = Partial<
    Omit<Shelter, 'id' | 'createdAt' | 'updatedAt'>
>
export class CreateShelterRequestValidator
    implements Validator<CreateShelterRequest>
{
    constructor() {}

    isValid(request: CreateShelterRequest) {
        const { name, email, password } = request
        if (!name) {
            return paramIsRequired('name')
        }
        if (!email) {
            return paramIsRequired('email')
        }
        if (!password) {
            return paramIsRequired('password')
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw new InvalidEmailError('Invalid email')
        }
        return true
    }
}

export class UpdateShelterRequestValidator
    implements Validator<UpdateShelterRequest>
{
    constructor() {}

    isValid(request: UpdateShelterRequest) {
        const { name, email, password, avatar, phone, city, about } = request
        if (email) {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                throw new InvalidEmailError('Invalid email')
            }
        }
        return true
    }
}
