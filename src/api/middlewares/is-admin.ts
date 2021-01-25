import { Response, NextFunction, Request } from 'express';
import ApiError from '../../services/api-error';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user.isAdmin) {
        return next(ApiError.unauthorised());
    }

    return next();
};

export default isAdmin;
