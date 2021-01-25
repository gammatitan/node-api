import { NextFunction, Request, Response, Router } from 'express';
import auth from './auth';
import resetPassword from './reset-password';
import content from './content';
import user from './user';
import requireAuth from './middlewares/require-auth';

export default () => {
    const app = Router();

    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        requireAuth(req, res, next);
    });

    auth(app);
    resetPassword(app);
    user(app);
    content(app);

    return app;
};
