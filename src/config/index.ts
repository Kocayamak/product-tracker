import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), '.env')
});

export const Config = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        database: process.env.DB_DATABASE || 'tracker',
        user: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || ''
    },

    scheduler: {
        defaultInterval: parseInt(process.env.CHECK_INTERVAL_MINUTES || '60', 10)
    },

    selenium: {
        headless: process.env.SELENIUM_HEADLESS !== 'false',
        chromeBinary: process.env.CHROME_BIN || '/usr/bin/google-chrome'
    }
};