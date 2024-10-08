import * as yup from "yup";

export const registrationSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    repeatPassword: yup.string().required(),
});