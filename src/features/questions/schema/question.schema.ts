import * as yup from "yup";

export const questionSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    type: yup.string().oneOf(["string", "int", "checkbox", "text"]).required(),
    state: yup.boolean().required(),
    answers: yup.array().of(yup.string())
})