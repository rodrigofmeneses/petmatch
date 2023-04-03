import { Tutor } from '../../schemas'

export interface TutorResponse {
    data: Pick<Tutor, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'>
    message: string
}

export const tutorResponseMapper = ({ id, name, email, createdAt }: Tutor) => ({
    id,
    name,
    email,
    createdAt,
})
