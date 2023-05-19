import * as fs from 'fs/promises'
import * as path from 'path'
import { Client } from 'pg'
import { POSTGRESQL_HOST, POSTGRESQL_PORT, POSTGRESQL_USERNAME, POSTGRESQL_PASSWORD } from '../config/config'

type DB = {
    client: Client,
    init: Function
}

let db: DB = {
    client: new Client({
        host: POSTGRESQL_HOST,
        port: POSTGRESQL_PORT,
        user: POSTGRESQL_USERNAME,
        password: POSTGRESQL_PASSWORD,
    }),
    init: async()=>{
        try {
            await db.client.connect()
            await db.client.query(`CREATE DATABASE giphy;`)
            await db.client.end()
        } catch (error) { }
        
        db.client = new Client({
            host: POSTGRESQL_HOST,
            port: POSTGRESQL_PORT,
            user: POSTGRESQL_USERNAME,
            password: POSTGRESQL_PASSWORD,
            database: 'giphy',
        })
        const [_, query] = await Promise.all([
            db.client.connect(),
            fs.readFile(path.join(__dirname, 'init.sql')),
        ])
        await db.client.query(query.toString('utf-8'))
    }
}

export { db }
