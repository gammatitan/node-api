import { Router, Request, Response, NextFunction } from 'express';
import AuthManager from '../services/auth-manager';
import ApiError from '../services/api-error';
import RESPONSE from '../constants/response';
import validateBody from './middlewares/validate-body';
import createRegistrationRequestSchema from '../validation/create-registration-request.validation';

const route = Router();
const authMangager = new AuthManager();

const auth = (app: Router) => {
    app.use('/auth', route);

    /**
     * Create registration requesst
     */
    route.post(
        '/registration-request',
        validateBody(createRegistrationRequestSchema),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                res.json({});
            } catch {
                next(ApiError.badRequest());
            }
        }
    );
    /**
     * Login
     */
    route.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        const { emailAddress, password } = req.body;

        try {
            const refreshToken = await authMangager.login(emailAddress, password);

            res.json({ refreshToken, redirect: '/dashboard' });
        } catch (e) {
            next(ApiError.unauthorised());
        }
    });

    /**
     * Logout
     */
    route.delete('/logout', async (req, res) => {
        // await authMangager.logout(req.body.refreshToken);

        res.sendStatus(RESPONSE.NO_CONTENT);
    });
};

export default auth;
