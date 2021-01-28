import { NextFunction, Request, Response, Router } from 'express';
import auth from './auth';
import resetPassword from './reset-password';
import content from './content';
import registrationRequests from './registration-requests';
import users from './users';
import requireAuth from './middlewares/require-auth';

export default () => {
    const app = Router();

    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        requireAuth(req, res, next);
    });

    auth(app);
    resetPassword(app);
    users(app);
    content(app);
    registrationRequests(app);

    return app;
};
