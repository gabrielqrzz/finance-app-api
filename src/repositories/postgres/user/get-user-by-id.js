import { PostgresHelpers } from '../../../db/postgres/helper.js'

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const user = await PostgresHelpers.query(
            'SELECT * FROM users WHERE id = $1',
            [userId],
        )

        return user[0]
    }
}
