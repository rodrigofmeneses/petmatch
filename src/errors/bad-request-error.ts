import { ApiError } from './index'

class BadRequestError extends ApiError {
    constructor(message: string) {
        super(message, 400)
        this.name = 'BadRequest'
    }
}

export default BadRequestError
