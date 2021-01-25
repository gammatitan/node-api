import { Router, Request, Response, NextFunction } from 'express';
import ApiError from '../services/api-error';
import PasswordResetManager from '../services/password-reset-manager';

const route = Router();

const resetPassword = (app: Router) => {
    app.use('/reset-password', route);

    /**
     * Reset password request
     */
    route.post('/request', async (req: Request, res: Response, next: NextFunction) => {
        try {
            await PasswordResetManager.request(req.body.emailAddress);

            res.json({});
        } catch (e) {
            next(ApiError.badRequest());
        }
    });

    /**
     * Complete a reset password request
     */
    route.post('/submit', async (req: Request, res: Response, next: NextFunction) => {
        const { token, password } = req.body;

        try {
            await PasswordResetManager.submit(token, password);

            res.json({});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    });
};

export default resetPassword;
