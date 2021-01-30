import { getManager } from 'typeorm';
import User, { REGISTRATION_STATUS_APPROVED } from '../entity/user';
import {
    USER_HISTORY_TYPE_ACTIVATE,
    USER_HISTORY_TYPE_DEACTIVATE,
    USER_HISTORY_TYPE_REGISTRAION_APPROVED,
} from '../entity/user-history';
import UserHistoryFactory from './factory/user-history.factory';

class UserManager {
    static activate = async (user: User, adminUser: User) => {
        if (!user) {
            return;
        }

        if (user.activated) {
            return;
        }

        user.activated = true;

        const userHistory = UserHistoryFactory.create(USER_HISTORY_TYPE_ACTIVATE, user, adminUser);

        await getManager().transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(user);
            await transactionalEntityManager.save(userHistory);
        });
    };

    static deactivate = async (user: User, adminUser: User) => {
        if (!user) {
            return;
        }

        if (!user.activated) {
            return;
        }

        user.activated = false;

        const userHistory = UserHistoryFactory.create(USER_HISTORY_TYPE_DEACTIVATE, user, adminUser);

        await getManager().transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(user);
            await transactionalEntityManager.save(userHistory);
        });
    };

    static approveRegistrationRequest = async (user: User, adminUser: User) => {
        if (!user) {
            return;
        }

        if (user.isRegistrationApproved) {
            return;
        }

        user.registrationStatus = REGISTRATION_STATUS_APPROVED;

        const userHistory = UserHistoryFactory.create(USER_HISTORY_TYPE_REGISTRAION_APPROVED, user, adminUser);

        await getManager().transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(user);
            await transactionalEntityManager.save(userHistory);
        });
    };
}

export default UserManager;
