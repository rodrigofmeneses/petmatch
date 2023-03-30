import { ApiError } from './index'

class BadRequest extends ApiError {
    constructor(message: string) {
        super(message, 400)
        this.name = 'BadRequest'
    }
}

export default BadRequest
