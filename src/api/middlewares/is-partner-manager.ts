import { Response, NextFunction, Request } from 'express';
import ApiError from '../../services/api-error';

const isPartnerManager = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user.isSuperAdmin && !user.isPartnerManager) {
        return next(ApiError.unauthorised());
    }

    return next();
};

export default isPartnerManager;
