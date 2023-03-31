import { BadRequest } from './index'

class ValidationError extends BadRequest {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

export default ValidationError
