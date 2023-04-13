import bcypt from 'bcrypt'

class Encrypter {
    async encode(value: string): Promise<string> {
        return bcypt.hash(value, 10)
    }

    async compare(password: string, hash: string): Promise<boolean> {
        const isValid = await bcypt.compare(password, hash)
        return isValid
    }
}

export default Encrypter
