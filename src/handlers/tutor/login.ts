import { Request, Response } from 'express'
import { NotFoundError, ValidationError } from '../../errors'
import { LoginRequestValidator } from '../utils/login-request'
import { TutorRepository } from '../../repositories'
import { UnauthorizedError } from '../../errors'
import { Encrypter, TokenGenerator } from '../../utils'

class LoginTutorHandler {
    constructor(
        protected loginValidator: LoginRequestValidator,
        protected tutorRepository: TutorRepository,
        protected encrypter: Encrypter,
        protected tokenGenerator: TokenGenerator
    ) {}

    async route(req: Request, res: Response) {
        const { email, password } = req.body
        const requestLogin = { email, password }

        if (!this.loginValidator.isValid(requestLogin)) {
            throw new ValidationError('Validation Error')
        }

        const tutor = await this.tutorRepository.findByEmail(email)
        if (!tutor) {
            throw new NotFoundError('Tutor not found')
        }

        const isValid = await this.encrypter.compare(password, tutor.password)
        if (!isValid) {
            throw new UnauthorizedError('Invalid Credentials')
        }

        const payload = { role: 'tutor', id: tutor.id }
        const responseLogin = {
            data: {
                accessToken: await this.tokenGenerator.generate(payload),
            },
            message: 'User authorized',
        }
        res.send(responseLogin)
    }
}

export default LoginTutorHandler
