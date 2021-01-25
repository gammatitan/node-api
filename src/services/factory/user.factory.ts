import { getManager } from 'typeorm';
import PasswordClient from '../password-client';
import UserVerification from '../../entity/user-verification';
import { USER_HISTORY_TYPE_NEW_ADMIN_USER } from '../../entity/user-history';
import UserHistoryFactory from './user-history.factory';
import User, { UserEmailAddress, UserFirstName, UserLastName, UserPassword, UserPhoneNumber } from '../../entity/user';
import Type, { TypeGka } from '../../entity/type';
import UserRoleFactory from './use-role.factory';
import { RoleGka } from '../../entity/role';

interface AdminUserValues {
    emailAddress: UserEmailAddress;
    password: UserPassword;
    firstName: UserFirstName;
    lastName: UserLastName;
    phoneNumber: UserPhoneNumber;
}

class UserFactory {
    static createAdmin = async (values: AdminUserValues, typeGka: TypeGka, roleGka: RoleGka): Promise<User> => {
        const hashedPassword = await PasswordClient.create(values.password);

        const user = new User();
        user.firstName = values.firstName;
        user.lastName = values.lastName;
        user.emailAddress = values.emailAddress;
        user.password = hashedPassword;
        user.phoneNumber = values.phoneNumber;
        user.registrationApproved = true;

        const type: Type = await getManager()
            .getRepository(Type)
            .findOne({ where: { gka: typeGka } });

        const userRole = await UserRoleFactory.create(user, roleGka);

        user.type = type;
        user.userRoles = [userRole];

        await getManager().save(user);

        const userVerification = new UserVerification();
        userVerification.user = user;

        const userHistory = UserHistoryFactory.create(USER_HISTORY_TYPE_NEW_ADMIN_USER, user);

        await getManager().transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(userVerification);
            await transactionalEntityManager.save(userRole);
            await transactionalEntityManager.save(userHistory);
        });

        return user;
    };
}

export default UserFactory;
