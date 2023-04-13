import { Validator } from './validate'

export type LoginRequest = {
    email: string
    password: string
}

export class LoginRequestValidator implements Validator<LoginRequest> {
    isValid(request: LoginRequest): boolean {
        const { email, password } = request
        const emailRegexValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!email || !password || !emailRegexValidation.test(email)) {
            return false
        }
        return true
    }
}
