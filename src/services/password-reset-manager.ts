import crypto from 'crypto';
import User, { UserEmailAddress, UserPassword } from '../entity/user';
import Mailer from './mailer';
import { getManager } from 'typeorm';
import UserVerification, { UserVerificationPasswordResetToken } from '../entity/user-verification';
import PasswordClient from './password-client';
import UserHistoryFactory from './factory/user-history.factory';
import {
    USER_HISTORY_TYPE_RESET_PASSWORD_COMPLETED,
    USER_HISTORY_TYPE_RESET_PASSWORD_REQUEST,
} from '../entity/user-history';

const createPasswordResetToken = (user: User): UserVerificationPasswordResetToken => {
    return crypto.randomBytes(16).toString('hex') + user.id.toString();
};

class PasswordResetManager {
    static request = async (emailAddress: UserEmailAddress) => {
        const userRepo = getManager().getRepository(User);
        const user: User = await userRepo.findOne({ where: { emailAddress }, relations: ['userVerification'] });

        if (!user) {
            return;
        }

        user.userVerification.passwordResetRequestedAt = new Date();
        user.userVerification.passwordResetToken = createPasswordResetToken(user);

        const userHistory = UserHistoryFactory.create(USER_HISTORY_TYPE_RESET_PASSWORD_REQUEST, user);

        getManager().transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(user);
            await transactionalEntityManager.save(userHistory);
        });

        await Mailer.sendPasswordResetEmail(emailAddress);
    };

    static submit = async (passwordResetToken: UserVerificationPasswordResetToken, newPassword: UserPassword) => {
        const userVerificationRepo = getManager().getRepository(UserVerification);
        const userVerification: UserVerification = await userVerificationRepo.findOne({
            where: { passwordResetToken },
            relations: ['user'],
        });

        if (!userVerification) {
            throw new Error('Could not find user verification');
        }

        if (!userVerification.isPasswordResetRequestExpired) {
            throw new Error('Reset password token expired');
        }

        userVerification.passwordResetRequestedAt = null;
        userVerification.passwordResetToken = null;
        userVerification.passwordResetAt = new Date();
        userVerification.user.password = await PasswordClient.create(newPassword);

        const userHistory = UserHistoryFactory.create(
            USER_HISTORY_TYPE_RESET_PASSWORD_COMPLETED,
            userVerification.user
        );

        getManager().transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(userVerification);
            await transactionalEntityManager.save(userHistory);
        });
    };
}

export default PasswordResetManager;
