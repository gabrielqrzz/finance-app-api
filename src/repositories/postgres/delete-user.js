import { PostgresHelpers } from '../../db/postgres/helper.js'

export class PostgresDeleteUserRepository {
    async execute(userId) {
        const deletedUser = await PostgresHelpers.query(
            `
            DELETE FROM users
            WHERE id = $1 
            RETURNING *
            `,
            [userId],
        )
        return deletedUser[0]
    }
}
