import { BadRequestError } from './index'

class InvalidEmailError extends BadRequestError {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidEmailError'
    }
}

export default InvalidEmailError
