import * as yup from 'yup';
import { ROLE_GKAS } from '../entity/role';
import { TYPE_GKAS } from '../entity/type';
import { MIN_PASSWORD_LENGTH } from '../entity/user';

const createAdminSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
    emailAddress: yup.string().email().required(),
    password: yup.string().required().min(MIN_PASSWORD_LENGTH),
    roleGka: yup.string().oneOf(ROLE_GKAS),
    typeGka: yup.string().oneOf(TYPE_GKAS),
});

export default createAdminSchema;
