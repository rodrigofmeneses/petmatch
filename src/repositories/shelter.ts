import { PrismaClient } from '@prisma/client'
import {
    UpdateShelterRequest,
    createShelterRequest,
} from '../handlers/shelter/request'

class ShelterRepository {
    constructor(protected prisma: PrismaClient) {}

    async findByName(name: string) {
        return this.prisma.shelter.findFirst({ where: { name } })
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

    async create(shelter: createShelterRequest) {
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
