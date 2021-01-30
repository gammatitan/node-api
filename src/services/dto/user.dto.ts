import User from '../../entity/user';

const userDTO = (user: User) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        firmName: user.firmName,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        city: user.city,
        postcode: user.postcode,
        lastLogin: user.lastLogin,
        activated: user.activated,
        registrationStatus: user.registrationStatus,
        type: user.type,
        roles: user.rolesVirtualProperty,
        updatedAt: user.updatedAt,
    };
};

export default userDTO;
