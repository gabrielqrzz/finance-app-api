import { PostgresHelpers } from '../../../db/postgres/helper.js'

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const balance = await PostgresHelpers.query(
            `SELECT * FROM get_user_balance($1)`,
            [userId],
        )
        return {
            userId,
            ...balance[0],
        }
    }
}
