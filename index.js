import 'dotenv/config.js'
import express from 'express'

import { PostgresHelpers } from './src/db/postgres/helper.js'

const app = express()

app.get('/', async (req, res) => {
    const results = await PostgresHelpers.query('SELECT * FROM users;')

    res.send(JSON.stringify(results))
})

app.listen(3000, () => console.log('listening on port 3000'))
