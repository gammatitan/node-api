import { ConnectionOptions } from 'typeorm';

const fileExt: string = process.env.NODE_ENV === 'production' ? 'js' : 'ts';

const ormconfig: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    entities: [`src/entity/**/*.${fileExt}`],
    migrations: [`src/migration/**/*.${fileExt}`],
    subscribers: [`src/subscriber/**/*.${fileExt}`],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },

    // Remove in on prod - could lose data
    synchronize: true,
};

export default ormconfig;
