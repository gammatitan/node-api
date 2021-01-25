import * as yup from 'yup';
import { MIN_PASSWORD_LENGTH } from '../entity/user';

const createRegistrationRequestSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
    emailAddress: yup.string().email().required(),
    password: yup.string().required().min(MIN_PASSWORD_LENGTH),
    firmName: yup.string().required(),
    addressLine1: yup.string().required(),
    addressLine2: yup.string(),
    city: yup.string().required(),
    postcode: yup.string().required(),
});

export default createRegistrationRequestSchema;
