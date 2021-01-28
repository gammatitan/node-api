import TokenClient, { DecodedToken, EncodedToken } from '../../services/token-client';
import { Response, NextFunction, Request } from 'express';
import { getRepository } from 'typeorm';
import User from '../../entity/user';
import RESPONSE from '../../constants/response';

// List of routes where auth is not required
const unauthorisedPaths: Array<string> = [
    '/auth/login',
    '/auth/logout',
    '/reset-password/request',
    '/reset-password/submit',
    '/registration-requests/new',
];

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (unauthorisedPaths.includes(req.path)) {
        next();

        return;
    }

    const token: EncodedToken | null = req.get('token');

    const unauthorised = () => {
        return res.status(RESPONSE.UNAUTHORISED).json({});
    };

    if (!token) {
        return unauthorised();
    }

    const hasValidToken: boolean = await TokenClient.hasValidRefreshToken(token);

    if (!hasValidToken) {
        return unauthorised();
    }

    const decodedToken: DecodedToken = TokenClient.decodeJwt(token);

    if (!decodedToken) {
        return unauthorised();
    }

    const user: any = await getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.type', 'type')
        .where('user.id = :id', { id: decodedToken.id })
        .getOne();

    if (!user) {
        return unauthorised();
    }

    req.user = user;

    return next();
};

export default requireAuth;
