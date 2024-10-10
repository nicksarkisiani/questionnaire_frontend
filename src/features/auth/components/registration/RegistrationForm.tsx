import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import {useTypedSelector} from "../../../../hooks/useTypedSelector.ts";
import {useTranslation} from "react-i18next";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../service/AuthService.ts";
import {CustomAxiosError} from "../../../../types/axios.ts";
import {registrationSchema} from "../../schema/auth.schema.ts";
import FormInput from "../FormInput/FormInput.tsx";
import {FormikHelpers} from "formik";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useActions} from "../../../../hooks/useActions.ts";

interface FormValues {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}

function RegistrationForm() {
    const {Formik} = formik;

    const {theme} = useTypedSelector(state => state.theme)
    const {verify} = useActions()
    const {t} = useTranslation()

    const {isAuthenticated} = useTypedSelector(state => state.user)
    const navigate = useNavigate()

    if(isAuthenticated){
        navigate("/")
    }

    const checkPassword = (password: string, repeatPassword: string, setSubmitting: (isSubmitting: boolean) => void, setError: (f: string, m: string | undefined) => void) => {
        if (password !== repeatPassword) {
            setSubmitting(false);
            setError("repeatPassword", "Passwords do not match");
            return false
        }
        return true
    }

    const register = async (email: string, username: string, password: string) => {
        try {
            await AuthService.registration(email, username, password);
        } catch (e: unknown) {
            const error = e as CustomAxiosError;
            if (error) toast.error(error?.response?.data?.message)
        } finally {
            verify()
        }
    }

    const onSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
        const isEqual = checkPassword(values.password, values.repeatPassword, actions.setSubmitting, actions.setFieldError)
        if (!isEqual) {
            return;
        }
        await register(values.email, values.username, values.password);
    }

    return (
        <Container className="vh-100 d-flex flex-column justify-content-center">
            <ToastContainer/>
            <h1 className="mb-4 h1 w-auto align-self-center fw-bold">{t("registration")}</h1>
            <Container className={"container-sm col-md-4"}>
                <Formik
                    validationSchema={registrationSchema}
                    onSubmit={onSubmit}
                    initialValues={{
                        username: '',
                        email: "",
                        password: "",
                        repeatPassword: "",
                    }}
                >
                    {({handleSubmit, handleChange, values, errors}) => (
                        <Form onSubmit={handleSubmit}
                              data-bs-theme={theme}
                              className="mb-3 d-flex flex-column "
                        >
                            <Row className="mb-3 d-flex justify-content-center">
                                <FormInput name={"username"} value={values.username} error={errors.username}
                                           handleChange={handleChange} translate={t("username")} validationId={1}/>
                            </Row>
                            <Row className="mb-3 d-flex justify-content-center">
                                <FormInput name={"email"} value={values.email} error={errors.email}
                                           handleChange={handleChange} translate={t("email")} validationId={2}
                                           type="email"/>
                            </Row>
                            <Row className="mb-3 d-flex justify-content-center">
                                <FormInput name={"password"} value={values.password} error={errors.password}
                                           handleChange={handleChange} translate={t("password")} validationId={3}
                                           type="password"/>
                            </Row>
                            <Row className="mb-3 d-flex justify-content-center">
                                <FormInput name={"repeatPassword"} value={values.repeatPassword}
                                           error={errors.repeatPassword}
                                           handleChange={handleChange} translate={t("repeatPassword")} validationId={4}
                                           type={"password"}/>
                            </Row>
                            <Button type="submit" className="mt-2 align-self-center">{t("registration")}</Button>
                            <Button type="button" className="mt-4 btn-info align-self-center">{t("accountExist")}</Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Container>
    );
}

export default RegistrationForm;