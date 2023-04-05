import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '../errors'

const emptyBody = (req: Request, res: Response, next: NextFunction) => {
    if (JSON.stringify(req.body) === '{}') {
        throw new BadRequestError('Empty JSON Body')
    }
    next()
}

export default emptyBody
