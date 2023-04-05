import { BadRequestError } from './index'

class MissingParamError extends BadRequestError {
    constructor(message: string) {
        super(message)
        this.name = 'MissingParamError'
    }
}

export default MissingParamError
