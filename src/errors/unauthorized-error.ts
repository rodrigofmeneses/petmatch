import { ApiError } from './index'

class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(message, 401)
        this.name = 'Unauthorized'
    }
}

export default UnauthorizedError
