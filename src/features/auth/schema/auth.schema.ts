import * as yup from "yup";

export const registrationSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    repeatPassword: yup.string().required(),
});

export const loginSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
})
