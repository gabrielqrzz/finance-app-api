import { PostgresHelpers } from '../../../db/postgres/helper'

export class PostgresGetTransactionsByUserId {
    async execute(userId) {
        const transactions = await PostgresHelpers.query(
            'SELECT * FROM transactions WHERE user_id = $1',
            [userId],
        )

        return transactions
    }
}
