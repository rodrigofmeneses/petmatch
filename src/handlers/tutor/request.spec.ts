import { InvalidEmailError, MissingParamError } from '../../errors'
import { CreateTutorRequestValidator } from './request'
import { describe, expect, test } from 'vitest'

const makeSut = () => {
    const sut = new CreateTutorRequestValidator()
    return { sut }
}

describe('Create Tutor Request Validator is Valid', () => {
    test('should return true with valid body', () => {
        const { sut } = makeSut()
        const body = {
            name: 'valid_name',
            password: 'valid_password',
            email: 'valid@email.com',
        }

        const result = sut.isValid(body)

        expect(result).toBe(true)
    })
    test('should throw MissingParamError with empty name', () => {
        const { sut } = makeSut()
        const body = {
            name: '',
            password: 'valid_password',
            email: 'valid@email.com',
        }

        try {
            sut.isValid(body)
        } catch (error) {
            expect(error).toBeInstanceOf(MissingParamError)
        }
    })
    test('should throw MissingParamError with empty password', () => {
        const { sut } = makeSut()
        const body = {
            name: 'valid_password',
            password: '',
            email: 'valid@email.com',
        }

        try {
            sut.isValid(body)
        } catch (error) {
            expect(error).toBeInstanceOf(MissingParamError)
        }
    })
    test('should throw MissingParamError with empty email', () => {
        const { sut } = makeSut()
        const body = {
            name: 'valid_password',
            password: 'valid_password',
            email: '',
        }

        try {
            sut.isValid(body)
        } catch (error) {
            expect(error).toBeInstanceOf(MissingParamError)
        }
    })
    test('should throw InvalidEmailError with invalid email', () => {
        const { sut } = makeSut()
        const body = {
            name: 'valid_password',
            password: 'valid_password',
            email: 'invalid_email',
        }

        try {
            sut.isValid(body)
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidEmailError)
        }
    })
})
