import bcrypt from 'bcrypt';
import { UserPassword } from '../entity/user';

const PASSWORD_SALT = 'cN$d!4d1';

const getSaltedPassword = (plainPassword: UserPassword): UserPassword => {
    return plainPassword + PASSWORD_SALT;
};

class PasswordClient {
    static create = async (plainPassword: UserPassword): Promise<UserPassword> => {
        const saltedPassword = getSaltedPassword(plainPassword);

        return await bcrypt.hash(saltedPassword, 10);
    };

    static passwordValid = async (plainPassword: UserPassword, userPassword: UserPassword): Promise<boolean> => {
        const saltedPassword = getSaltedPassword(plainPassword);

        return await bcrypt.compare(saltedPassword, userPassword);
    };
}

export default PasswordClient;
