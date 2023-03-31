import { Tutor } from '../../schemas'

export type createTutorResponse = Pick<
    Tutor,
    'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'
>

export const createTutorResponseMapper = ({
    id,
    name,
    email,
    createdAt,
}: Tutor) => ({
    id,
    name,
    email,
    createdAt,
})
