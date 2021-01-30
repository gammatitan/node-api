import TokenClient, { EncodedToken } from './token-client';
import User, { UserPassword, UserEmailAddress } from '../entity/user';
import { getManager } from 'typeorm';
import PasswordClient from './password-client';

class Auth {
    login = async (emailAddress: UserEmailAddress, password: UserPassword): Promise<EncodedToken> => {
        const userRepo = getManager().getRepository(User);

        try {
            const user: User = await userRepo.findOne({
                select: ['id', 'password', 'activated', 'failedLoginAttempts', 'registrationStatus'],
                where: { emailAddress },
            });

            if (!Boolean(user)) {
                this.loginError('User not found');
            }

            if (!user.activated) {
                this.loginError('User not activated');
            }

            if (user.isRegistrationPending) {
                this.loginError('User registration is pending');
            }

            if (user.isLocked) {
                this.loginError('User account locked');
            }

            const hasValidPassword: boolean = await PasswordClient.passwordValid(password, user.password);

            if (!hasValidPassword) {
                await this.newFailedLoginAttempt(user);

                this.loginError('Invalid password');
            }

            user.lastLogin = new Date();

            await userRepo.save(user);

            const refreshToken: string = await TokenClient.generateRefreshToken(user);

            return refreshToken;
        } catch (e) {
            throw new Error(e);
        }
    };

    logout = async (refreshToken: EncodedToken): Promise<void> => {};

    private newFailedLoginAttempt = async (user: User) => {
        user.failedLoginAttempts = user.failedLoginAttempts + 1;

        await getManager().save(user);
    };

    private loginError = (err: string) => {
        throw new Error(err);
    };
}

export default Auth;
