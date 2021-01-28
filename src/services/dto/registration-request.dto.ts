import User from '../../entity/user';

const registrationRequestDTO = (user: User) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        firmName: user.firmName,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        city: user.city,
        postcode: user.postcode,
        createdAt: user.createdAt,
    };
};

export default registrationRequestDTO;
