import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors'

const errorHandler = (
    err: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let status = err.status ?? 500
    let message = err.message ?? 'Internal Server Error'

    if (err instanceof SyntaxError) {
        status = 400
        message = 'Malformed JSON Body'
    }

    return res.status(status).send({ message })
}

export default errorHandler
