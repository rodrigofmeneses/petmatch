import Shelter from './Shelter'

interface Pet {
    id: string
    name: string
    age: string | null
    city: string | null
    about: string | null
    image: string | null
    shelter: Shelter
    shelterId: string
    createdAt: Date | null
    updatedAt: Date | null
    [key: string]: any
}

export default Pet
