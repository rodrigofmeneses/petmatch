import jwt from 'jsonwebtoken'

class TokenGenerator {
    constructor(private secret: string) {}

    async generate(payload: any) {
        return jwt.sign(payload, this.secret)
    }
}

export default TokenGenerator
