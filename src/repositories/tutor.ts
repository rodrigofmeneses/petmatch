import { PrismaClient } from '@prisma/client'
import { Tutor } from '../schemas'
import {
    createTutorRequest,
    updateTutorRequest,
} from '../handlers/tutor/request'
import { BadRequest } from '../errors'

const prisma = new PrismaClient()

class TutorRepository {
    async show(id: string): Promise<Tutor | null> {
        return prisma.tutor.findFirst({ where: { id } })
    }

    async create(tutor: createTutorRequest): Promise<Tutor> {
        return prisma.tutor.create({ data: tutor })
    }

    async findByEmail(email: string): Promise<Tutor | null> {
        return prisma.tutor.findFirst({ where: { email } })
    }

    async findById(id: string): Promise<Tutor | null> {
        return prisma.tutor.findFirst({ where: { id } })
    }

    async deleteById(id: string): Promise<Tutor | null> {
        return prisma.tutor.delete({ where: { id } })
    }

    async updateById(
        id: string,
        tutor: updateTutorRequest
    ): Promise<Tutor | null> {
        return prisma.tutor.update({
            data: tutor,
            where: { id },
        })
    }

    async list(): Promise<Tutor[]> {
        return prisma.tutor.findMany()
    }
}

export default TutorRepository
