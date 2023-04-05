import { PrismaClient } from '@prisma/client'
import { createShelterRequest } from '../handlers/shelter/request'

class ShelterRepository {
    constructor(protected prisma: PrismaClient) {}

    async findByName(name: string) {
        return this.prisma.shelter.findFirst({ where: { name } })
    }

    async create(shelter: createShelterRequest) {
        return this.prisma.shelter.create({ data: shelter })
    }
}

export default ShelterRepository
