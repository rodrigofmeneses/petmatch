interface Pet {
    id: string
    name: string
    age: string | null
    city: string | null
    about: string | null
    image: string | null
    [key: string]: any
}

export default Pet
