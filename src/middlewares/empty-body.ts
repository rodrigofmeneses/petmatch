import { NextFunction, Request, Response } from 'express'
import { BadRequest } from '../errors'

const emptyBody = (req: Request, res: Response, next: NextFunction) => {
    if (JSON.stringify(req.body) === '{}') {
        throw new BadRequest('Empty JSON Body')
    }
    next()
}

export default emptyBody
