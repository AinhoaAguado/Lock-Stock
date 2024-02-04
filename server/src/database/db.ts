import { Sequelize } from 'sequelize';
import 'dotenv/config';

const db = new Sequelize(
    process.env.lock_and_stock || 'default_db_lock_and_stock',
    process.env.DB_USERS || 'default_user',
    process.env.DB_PASSWORD || 'default_password',
    { 
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
    }
);

export default db;

