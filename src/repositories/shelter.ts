import { PrismaClient } from '@prisma/client'
import { createShelterRequest } from '../handlers/shelter/request'

class ShelterRepository {
    constructor(protected prisma: PrismaClient) {}

    async findByName(name: string) {
        return this.prisma.shelter.findFirst({ where: { name } })
    }

    async findById(id: string) {
        return this.prisma.shelter.findFirst({ where: { id } })
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
