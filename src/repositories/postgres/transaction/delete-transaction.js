import { PostgresHelpers } from '../../../db/postgres/helper.js'

export class PostgresDeleteTransaction {
    async execute(transactionId) {
        const transaction = await PostgresHelpers.query(
            'DELETE FROM transactions WHERE id = $1 RETURNING *',
            [transactionId],
        )

        return transaction[0]
    }
}
