import validator from 'validator'
import { badRequest } from '../helpers/http.js'

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at least 6 characters',
    })

export const emailIsAlreadyInUseResponse = () =>
    badRequest({
        message: 'Invalid e-mail. Please provide a valid one.',
    })

export const invalidIdResponse = () =>
    badRequest({
        message: 'The provided ID is not valid',
    })

export const checkIfPasswordIsValid = (password) => password.lenght >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

export const checkIfIdIsValid = (id) => validator.isUUID(id)
