import { Pet } from '../../schemas'
import { paramIsRequired } from '../utils'
import { Validator } from '../utils/validate'

export type CreatePetRequest = Pick<Pet, 'name' | 'age' | 'shelterId'>
export type UpdatePetRequest = Partial<
    Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>
>
export class CreatePetRequestValidator implements Validator<CreatePetRequest> {
    constructor() {}

    isValid(request: CreatePetRequest) {
        const { name, age, shelterId } = request
        if (!name) {
            return paramIsRequired('name')
        }
        if (!age) {
            return paramIsRequired('age')
        }
        if (!shelterId) {
            return paramIsRequired('shelterId')
        }
        return true
    }
}

export class UpdatePetRequestValidator implements Validator<UpdatePetRequest> {
    constructor() {}

    isValid(request: UpdatePetRequest) {
        const { name, age, shelterId } = request
        return true
    }
}
