import { UserNotFoundError } from '../../errors/user.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    requiredFieldsIsMissingResponse,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'

export class GetTransactionByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId
            //verificar se o userId foi passado como paraemtro
            if (!userId) {
                return requiredFieldsIsMissingResponse('userId')
            }

            //verificar se o userId é um ID válido
            const userIdIsValid = checkIfIdIsValid(userId)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            //chamar o useCase
            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                })

            //retornar resposta http
            return ok(transactions)
        } catch (error) {
            console.error(error)

            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse
            }

            return serverError()
        }
    }
}
