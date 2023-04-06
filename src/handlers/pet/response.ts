import { Pet, Shelter } from '../../schemas'
import { shelterResponseMapper } from '../shelter/response'

export interface PetResponse {
    data: Pick<
        Pet,
        | 'id'
        | 'name'
        | 'adopted'
        | 'age'
        | 'city'
        | 'about'
        | 'image'
        | 'shelter'
        | 'createdAt'
        | 'updatedAt'
    >
    message: string
}

export const petResponseMapper = ({
    id,
    name,
    adopted,
    age,
    city,
    about,
    image,
    shelter,
    createdAt,
    updatedAt,
}: any) => {
    return {
        id,
        name,
        adopted,
        age,
        city,
        about,
        image,
        shelter: shelterResponseMapper(shelter as Shelter),
        createdAt,
        updatedAt,
    }
}
