import { PrismaClient } from '@prisma/client'
import { CreatePetRequest, UpdatePetRequest } from '../handlers/pet/request'

class PetRepository {
    constructor(protected prisma: PrismaClient) {}

    async findById(id: string) {
        return this.prisma.pet.findFirst({
            where: { id },
            include: { shelter: true },
        })
    }

    async updateById(id: string, pet: UpdatePetRequest) {
        return this.prisma.pet.update({
            data: pet,
            where: { id },
            include: { shelter: true },
        })
    }

    async deleteById(id: string) {
        return this.prisma.pet.delete({
            where: { id },
            include: { shelter: true },
        })
    }

    async create(pet: CreatePetRequest) {
        return this.prisma.pet.create({ data: pet, include: { shelter: true } })
    }

    async show(id: string) {
        return this.prisma.pet.findFirst({
            where: { id },
            include: { shelter: true },
        })
    }

    async list() {
        return this.prisma.pet.findMany({ include: { shelter: true } })
    }
}

export default PetRepository
