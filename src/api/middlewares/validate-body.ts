import { NextFunction, Request, Response } from 'express';
import ApiError from '../../services/api-error';
import { Schema } from 'yup';

const validateBody = (schema: Schema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);

        next();
    } catch {
        next(ApiError.badRequest('Invalid request body'));
    }
};

export default validateBody;
