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
import {loginSchema} from "../../schema/auth.schema.ts";
import FormInput from "../FormInput/FormInput.tsx";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useActions} from "../../../../hooks/useActions.ts";

interface FormValues {
    email: string;
    password: string;
}

function LoginForm() {
    const {Formik} = formik;

    const {theme} = useTypedSelector(state => state.theme)
    const {verify} = useActions()
    const {t} = useTranslation()

    const navigate = useNavigate()

    const login = async (email: string, password: string) => {
        try {
            await AuthService.login(email, password);
        } catch (e: unknown) {
            const error = e as CustomAxiosError;
            if (error) toast.error(error?.response?.data?.message)
        } finally {
            verify()
        }
    }

    const onSubmit = async (values: FormValues) => {
        await login(values.email, values.password);
    }

    return (
        <Container className="vh-100 d-flex flex-column justify-content-center">
            <ToastContainer/>
            <h1 className="mb-4 h1 w-auto align-self-center fw-bold">{t("login")}</h1>
            <Container className={"container-sm col-md-4"}>
                <Formik
                    validationSchema={loginSchema}
                    onSubmit={onSubmit}
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                >
                    {({handleSubmit, handleChange, values, errors}) => (
                        <Form onSubmit={handleSubmit}
                              data-bs-theme={theme}
                              className="mb-3 d-flex flex-column"
                        >
                            <Row className="mb-3 d-flex justify-content-center">
                                <FormInput name={"email"} value={values.email} error={errors.email}
                                           handleChange={handleChange} translate={t("email")} validationId={0}
                                           type="email"/>
                            </Row>
                            <Row className="mb-3 d-flex justify-content-center">
                                <FormInput name={"password"} value={values.password} error={errors.password}
                                           handleChange={handleChange} translate={t("password")} validationId={1}
                                           type="password"/>
                            </Row>
                            <Button type="button"
                                    className={`align-self-end btn-info btn-sm `} onClick={() => navigate("/registration")}>{t("createAccount")}</Button>

                            <Button type="submit" className="mt-4 align-self-center">{t("login")}</Button>

                        </Form>
                    )}
                </Formik>
            </Container>
        </Container>
    );
}

export default LoginForm;