import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        //TODO: verificar se o email ja esta em uso
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            )

        if (userWithProvidedEmail) {
            throw new Error('The provided email is already in use.')
        }

        //gerar ID do usuario
        const userId = uuidv4()

        //criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        //inserir o usuario no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        //chamar repositorio
        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createdUser = await postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
