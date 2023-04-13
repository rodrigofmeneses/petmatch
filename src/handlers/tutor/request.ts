import { Tutor } from '../../schemas'
import { Validator } from '../utils/validate'

export type CreateTutorRequest = Pick<Tutor, 'name' | 'email' | 'password'>
export type updateTutorRequest = Partial<
    Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'>
>

export class CreateTutorRequestValidator
    implements Validator<CreateTutorRequest>
{
    isValid(request: CreateTutorRequest): boolean {
        const { name, email, password } = request
        const emailRegexValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!name || !email || !password || !emailRegexValidation.test(email)) {
            return false
        }
        return true
    }
}

export class UpdateTutorRequestValidator
    implements Validator<updateTutorRequest>
{
    isValid(request: updateTutorRequest): boolean {
        const { name, email, password, about, avatar, city, phone } = request
        const emailRegexValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (email && !emailRegexValidation.test(email)) {
            return false
        }
        return true
    }
}
