import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 5000
const GIPHY_API_KEY = process.env.GIPHY_API_KEY || ''
const POSTGRESQL_HOST = process.env.POSTGRESQL_HOST || ''
const POSTGRESQL_PORT = process.env.POSTGRESQL_PORT ? parseInt(process.env.POSTGRESQL_PORT) : 5432
const POSTGRESQL_USERNAME = process.env.POSTGRESQL_USERNAME || ''
const POSTGRESQL_PASSWORD = process.env.POSTGRESQL_PASSWORD || ''

export {
    SERVER_PORT,
    GIPHY_API_KEY,
    POSTGRESQL_HOST,
    POSTGRESQL_PORT,
    POSTGRESQL_USERNAME,
    POSTGRESQL_PASSWORD
}