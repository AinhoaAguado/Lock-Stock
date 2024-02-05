import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

const db = new Sequelize(
    process.env.DB_LOCK_AND_STOCK || 'lock_and_stock',
    process.env.DB_USERS || 'root',
    process.env.DB_PASSWORD || '1234567',
    { 
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
    }
);

export default db;

