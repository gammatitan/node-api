import expressLoader from './express';
import Logger from './logger';
import '../types/express/global';

export default async ({ expressApp }) => {
    await expressLoader({ app: expressApp });

    Logger.info('Express loaded');
};
