import { Router, Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import RESPONSE from '../constants/response';
import { TYPE_ADMIN } from '../entity/type';
import User from '../entity/user';
import ApiError from '../services/api-error';
import UserFactory from '../services/factory/user.factory';
import PasswordClient from '../services/password-client';
import RouterFunctions from '../services/router-functions';
import createAdminSchema from '../validation/create-admin.validation';
import updatePasswordSchema from '../validation/update-password.schema';
import updatePersonalAccountInfoSchema from '../validation/update-personal-account-info.schema';
import isAdmin from './middlewares/is-admin';
import validateBody from './middlewares/validate-body';

const route = Router();

const user = (app: Router) => {
    app.use('/users', route);

    /**
     * Create new admin user
     */
    route.post('', validateBody(createAdminSchema), async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user.isAdmin) {
            next(ApiError.unauthorised());

            return;
        }

        const { roleGka, ...values } = req.body;

        try {
            await UserFactory.createAdmin(values, TYPE_ADMIN, roleGka);

            res.sendStatus(RESPONSE.CREATED);
        } catch (e) {
            console.log(e);
            next(ApiError.badRequest());
        }
    });

    /**
     * Get logged in users account info
     */
    route.get('/account-info', async (req: Request, res: Response) => {
        const { firstName, lastName, emailAddress, fullName, phoneNumber } = req.user;

        return res.json({
            firstName,
            lastName,
            emailAddress,
            phoneNumber,
            fullName,
        });
    });

    /**
     * Update logged in users account info
     */
    route.put(
        '/account-info',
        validateBody(updatePersonalAccountInfoSchema),
        async (req: Request, res: Response, next: NextFunction) => {
            const { firstName, lastName, phoneNumber } = req.body;

            req.user.firstName = firstName;
            req.user.lastName = lastName;
            req.user.phoneNumber = phoneNumber;

            try {
                getManager().getRepository(User).save(req.user);

                res.json({});
            } catch {
                next(ApiError.badRequest());
            }
        }
    );

    /**
     * Update logged in users password
     */
    route.put(
        '/new-password',
        validateBody(updatePasswordSchema),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const hashedPassword = await PasswordClient.create(req.body.password);

                req.user.password = hashedPassword;

                getManager().getRepository(User).save(req.user);

                res.json({});
            } catch {
                next(ApiError.badRequest());
            }
        }
    );

    /**
     * List list of users
     * @todo support limit, offset params
     */
    route.get('', isAdmin, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await RouterFunctions.getUsers();

            res.json(data);
        } catch {
            next(ApiError.badRequest());
        }
    });

    /**
     * Get details for a specific user
     */
    route.get('/:id', isAdmin, async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const data = await RouterFunctions.getUser(Number(id));

            res.json(data);
        } catch {
            next(ApiError.badRequest());
        }
    });
};

export default user;