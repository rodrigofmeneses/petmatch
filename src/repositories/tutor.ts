import { PrismaClient } from '@prisma/client'
import { Tutor } from '../schemas'
import { createTutorRequest } from '../handlers/tutor/request'

const prisma = new PrismaClient()

class TutorRepository {
    async create(tutor: createTutorRequest): Promise<Tutor> {
        return prisma.tutor.create({ data: tutor })
    }

    async findByEmail(email: string): Promise<Tutor | null> {
        return prisma.tutor.findFirst({ where: { email } })
    }
}

export default TutorRepository