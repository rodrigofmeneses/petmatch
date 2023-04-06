import { PrismaClient } from '@prisma/client'
import {
    UpdateShelterRequest,
    CreateShelterRequest,
} from '../handlers/shelter/request'

class ShelterRepository {
    constructor(protected prisma: PrismaClient) {}

    async findByEmail(email: string) {
        return this.prisma.shelter.findFirst({ where: { email } })
    }

    async findById(id: string) {
        return this.prisma.shelter.findFirst({ where: { id } })
    }

    async updateById(id: string, shelter: UpdateShelterRequest) {
        return this.prisma.shelter.update({
            data: shelter,
            where: { id },
        })
    }

    async deleteById(id: string) {
        return this.prisma.shelter.delete({ where: { id } })
    }

    async create(shelter: CreateShelterRequest) {
        return this.prisma.shelter.create({ data: shelter })
    }

    async show(id: string) {
        return this.prisma.shelter.findFirst({ where: { id } })
    }

    async list() {
        return this.prisma.shelter.findMany()
    }
}

export default ShelterRepository
