interface Tutor {
    id: string
    name: string
    email: string
    password: string
    avatar: string | null
    phone: string | null
    city: string | null
    about: string | null
    createdAt: Date | null
    updatedAt: Date | null
    [key: string]: any
}

export default Tutor
