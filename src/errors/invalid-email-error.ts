import { BadRequest } from './index'

class InvalidEmailError extends BadRequest {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidEmailError'
    }
}

export default InvalidEmailError
