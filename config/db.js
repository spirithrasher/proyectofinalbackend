import pkg from "pg";
import dotenv from 'dotenv';

const { Pool } = pkg
dotenv.config();

const pool = new Pool({
    host: `${process.env.HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DB}`,
    ssl: {
        rejectUnauthorized: false
    },
    allowExitOnIdle: true
})

export default pool;