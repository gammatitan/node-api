import { getManager } from 'typeorm';
import PasswordClient from '../password-client';
import UserVerification from '../../entity/user-verification';
import { USER_HISTORY_TYPE_NEW_ADMIN_USER } from '../../entity/user-history';
import UserHistoryFactory from './user-history.factory';
import User, {
    UserEmailAddress,
    UserFirstName,
    UserLastName,
    UserPassword,
    UserPhoneNumber,
    UserAddressLine1,
    UserAddressLine2,
    UserCity,
    UserPostcode,
    UserFirmName,
} from '../../entity/user';
import Type, { TypeGka, TYPE_PARTNER } from '../../entity/type';
import UserRoleFactory from './use-role.factory';
import { RoleGka } from '../../entity/role';

interface AdminUserValues {
    emailAddress: UserEmailAddress;
    password: UserPassword;
    firstName: UserFirstName;
    lastName: UserLastName;
    phoneNumber: UserPhoneNumber;
}

interface RegistrationRequestValues extends AdminUserValues {
    addressLine1: UserAddressLine1;
    addressLine2: UserAddressLine2;
    city: UserCity;
    postcode: UserPostcode;
    firmName: UserFirmName;
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

    static createPartnerFromRegistrationRequest = async (values: RegistrationRequestValues): Promise<User> => {
        const hashedPassword = await PasswordClient.create(values.password);

        const user = new User();
        user.firstName = values.firstName;
        user.lastName = values.lastName;
        user.emailAddress = values.emailAddress;
        user.password = hashedPassword;
        user.phoneNumber = values.phoneNumber;
        user.registrationApproved = false;
        user.addressLine1 = values.addressLine1;
        user.addressLine2 = values.addressLine2;
        user.city = values.city;
        user.postcode = values.postcode;
        user.firmName = values.firmName;

        const type: Type = await getManager()
            .getRepository(Type)
            .findOne({ where: { gka: TYPE_PARTNER } });

        user.type = type;

        await getManager().save(user);

        const userVerification = new UserVerification();
        userVerification.user = user;

        const userHistory = UserHistoryFactory.create(USER_HISTORY_TYPE_NEW_ADMIN_USER, user);

        await getManager().transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(userVerification);
            await transactionalEntityManager.save(userHistory);
        });

        return user;
    };
}

export default UserFactory;
