import jwt from 'jsonwebtoken';
import config from '../config';
import User, { UserId } from '../entity/user';

export type EncodedToken = string;

export interface DecodedToken {
    id: UserId;
    iat?: number;
    exp?: number;
}

const JWT_EXPIRY: string = '7 days';

const createJwtPayload = (user: User): DecodedToken => {
    return {
        id: user.id,
    };
};

class TokenClient {
    static decodeJwt = (token): DecodedToken => {
        return jwt.decode(token);
    };

    static generateRefreshToken = async (user: User): Promise<EncodedToken> => {
        const token = jwt.sign(createJwtPayload(user), config.jwtTokenSecret, { expiresIn: JWT_EXPIRY });

        return token;
    };

    static hasValidRefreshToken = async (token: EncodedToken): Promise<boolean> => {
        return jwt.verify(token, config.jwtTokenSecret, async (err) => {
            return !Boolean(err);
        });
    };

    static deleteRefreshToken = async (token: EncodedToken): Promise<void> => {};
}

export default TokenClient;
