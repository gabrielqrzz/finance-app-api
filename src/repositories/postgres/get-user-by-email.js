import { PostgresHelpers } from '../../db/postgres/helper.js'

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        const user = await PostgresHelpers.query(
            'SELECT * FROM users WHERE email = $1',
            [email],
        )

        return user[0]
    }
}
