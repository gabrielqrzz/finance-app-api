import validator from 'validator'
import { badRequest } from './http'

export const checkIfAmountIsValid = (amount) =>
    validator.isCurrency(amount.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    })

export const checkIfTypeIsValid = (type) =>
    ['EARNING', 'EXPENSE', 'INVESTIMENT'].includes(type)

export const invalidAmountResponse = () =>
    badRequest({
        message: 'The amount must be a valid currency.',
    })

export const invalidTypeResponse = () =>
    badRequest({
        message: 'The type must be EARNING, EXPENSE or INVESTIMENT.',
    })
