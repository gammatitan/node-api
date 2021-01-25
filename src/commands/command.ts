import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createConnection } from 'typeorm';

require('dotenv').config({
    path: __dirname + '/./../../.env',
});

class Command {
    connectToDb = async () => {
        await createConnection({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + `/../entity/**/*.ts`],
            migrations: [__dirname + `/../migration/**/*.ts`],
            subscribers: [__dirname + `/../subscriber/**/*.ts`],
            cli: {
                entitiesDir: '../entity',
                migrationsDir: '../migration',
                subscribersDir: '../subscriber',
            },
        });
    };

    getArg = (key: string): any => {
        const args = yargs(hideBin(process.argv)).argv;

        return args[key];
    };
}

export default Command;
