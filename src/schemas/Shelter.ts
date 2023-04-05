import Pet from './Pet'

interface Shelter {
    id: string
    name: string
    avatar: string | null
    phone: string | null
    city: string | null
    pets: Pet[]
    createdAt: Date | null
    updatedAt: Date | null
    [key: string]: any
}

export default Shelter
