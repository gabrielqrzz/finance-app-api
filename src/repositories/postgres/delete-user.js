import { PostgresHelpers } from '../../db/postgres/helper.js'

export class PostgresDeleteUser {
    async execute(userId) {
        const deletedUser = await PostgresHelpers.query(
            `
            DELETE FROM user 
            WHERE id = $1 
            RETURNIG *
            `,
            [userId],
        )
        return deletedUser[0]
    }
}
