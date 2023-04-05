import { BadRequestError } from './index'

class ValidationError extends BadRequestError {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

export default ValidationError
