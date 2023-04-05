import { MissingParamError } from '../../errors'

const paramIsRequired = (name: string) => {
    throw new MissingParamError(`Param ${name} is required`)
}

export default paramIsRequired
