import { InvalidEmailError, MissingParamError } from '../../errors'
import { Tutor } from '../../schemas'
import { Validator } from '../utils/validate'

export type createTutorRequest = Pick<Tutor, 'name' | 'email' | 'password'>

const paramIsRequired = (name: string) => {
    throw new MissingParamError(`Param ${name} is required`)
}

export class CreateTutorRequestValidator
    implements Validator<createTutorRequest>
{
    constructor() {}

    isValid(request: createTutorRequest) {
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
