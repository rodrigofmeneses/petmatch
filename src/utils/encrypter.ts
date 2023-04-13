import bcypt from 'bcrypt'

class Encrypter {
    async compare(password: string, hash: string): Promise<boolean> {
        const isValid = await bcypt.compare(password, hash)
        return isValid
    }
}

export default Encrypter
