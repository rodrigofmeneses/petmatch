import { BadRequest } from './index'

class MissingParamError extends BadRequest {
    constructor(message: string) {
        super(message)
        this.name = 'MissingParamError'
    }
}

export default MissingParamError
