import { Router, Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import RESPONSE from '../constants/response';
import User from '../entity/user';
import ApiError from '../services/api-error';
import UserFactory from '../services/factory/user.factory';
import RouterFunctions from '../services/router-functions';
import UserManager from '../services/user-manager';
import createRegistrationRequestSchema from '../validation/create-registration-request.validation';
import isAdmin from './middlewares/is-admin';
import validateBody from './middlewares/validate-body';

const route = Router();

const registrationRequests = (app: Router) => {
    app.use('/registration-requests', route);

    /**
     * Create registration requesst
     */
    route.post(
        '/new',
        validateBody(createRegistrationRequestSchema),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await UserFactory.createPartnerFromRegistrationRequest(req.body);

                res.sendStatus(RESPONSE.CREATED);
            } catch (e) {
                next(ApiError.badRequest(e));
            }
        }
    );

    /**
     * Get list of registration requests
     */
    route.get('', isAdmin, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await RouterFunctions.getRegistrationRequests();

            res.json(data);
        } catch (e) {
            next(ApiError.badRequest(e));
        }
    });

    /**
     * Get details for a specific registraion request
     */
    route.get('/:id', isAdmin, async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const data = await RouterFunctions.getRegistrationRequest(Number(id));

            res.json(data);
        } catch (e) {
            next(ApiError.badRequest(e));
        }
    });

    /**
     * Approve registration requesst
     */
    route.post('/:id/approve', isAdmin, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: User = await getRepository(User).findOne(req.params.id);

            if (!user) {
                throw new Error('User not found');
            }

            await UserManager.approveRegistrationRequest(user, req.user);

            res.json({});
        } catch (e) {
            next(ApiError.badRequest(e));
        }
    });
};

export default registrationRequests;
