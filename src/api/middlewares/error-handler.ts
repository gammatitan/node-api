import { NextFunction, Request, Response } from 'express';
import RESPONSE from '../../constants/response';
import Logger from '../../loaders/logger';
import ApiError from '../../services/api-error';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    Logger.error(err);

    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);

        return;
    }

    res.status(RESPONSE.INTERNAL_SERVER_ERROR).json('Something went wrong');
};

export default errorHandler;
