import * as yup from 'yup';
import { MIN_PASSWORD_LENGTH } from '../entity/user';

const updatePasswordSchema = yup.object({
    password: yup.string().required().min(MIN_PASSWORD_LENGTH),
});

export default updatePasswordSchema;
