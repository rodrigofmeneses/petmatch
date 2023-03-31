export interface Validator<T> {
    isValid(param: T): boolean
}
