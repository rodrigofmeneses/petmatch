import { ApiError } from './index'

class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404)
        this.name = 'NotFoundError'
    }
}

export default NotFoundError
