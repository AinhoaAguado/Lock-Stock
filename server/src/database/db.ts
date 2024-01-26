import { Dialect, Sequelize } from 'sequelize';
import 'dotenv/config';

const db = new Sequelize(
    process.env.DB_LOCK_AND_STOCK || 'default_db_lock_and_stock',
    process.env.DB_USERS || 'default_user',
    process.env.DB_PASSWORD || 'default_password',
    { 
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT as Dialect | undefined,
    }
);

export default db;

