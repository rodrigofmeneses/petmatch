import { Request, Response } from 'express'

const createTutorHandler = (req: Request, res: Response) => {
    res.send('tutor')
}

export default createTutorHandler
