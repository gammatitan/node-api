import * as yup from 'yup';

const updatePersonalAccountInfoSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
});

export default updatePersonalAccountInfoSchema;
