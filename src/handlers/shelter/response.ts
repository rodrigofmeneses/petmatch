import { Shelter } from '../../schemas'

export interface ShelterResponse {
    data: Pick<
        Shelter,
        | 'id'
        | 'name'
        | 'avatar'
        | 'phone'
        | 'city'
        | 'pets'
        | 'createdAt'
        | 'updatedAt'
    >
    message: string
}

export const shelterResponseMapper = ({
    id,
    name,
    avatar,
    phone,
    city,
    createdAt,
    updatedAt,
}: Partial<Shelter>) => ({
    id,
    name,
    avatar,
    phone,
    city,
    createdAt,
    updatedAt,
})
