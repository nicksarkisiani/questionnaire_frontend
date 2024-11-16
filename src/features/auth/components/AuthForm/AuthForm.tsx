import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import { loginSchema, registrationSchema } from "../../schema/auth.schema.ts";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FormInput from "../../../../components/FormInput/FormInput.tsx";
import Button from "react-bootstrap/Button";
import { useTypedSelector } from "../../../../hooks/useTypedSelector.ts";
import * as formik from "formik";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { FormikHelpers } from "formik";
import {useNavigate} from "react-router";

interface FormValues {
    username?: string;
    email: string;
    password: string;
    repeatPassword?: string;
}

interface AuthFormProps {
    initialValues: FormValues;
    validationSchema: typeof registrationSchema | typeof loginSchema;
    onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
    title: string;
    isLogin?: boolean;
    isRegistration? : boolean;
}

const AuthForm: FC<AuthFormProps> = ({ initialValues, validationSchema, onSubmit, title, isLogin, isRegistration }) => {
    const { Formik } = formik;
    const { theme } = useTypedSelector(state => state.theme);
    const { t } = useTranslation();
    const navigate = useNavigate()

    return (
        <Container className="vh-100 d-flex flex-column justify-content-center">
            <ToastContainer />
            <h1 className="mb-4 h1 w-auto align-self-center fw-bold">{t(title)}</h1>
            <Container className={"container-sm col-md-4"}>
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                >
                    {({ handleSubmit, handleChange, values, errors }) => (
                        <Form onSubmit={handleSubmit}
                              data-bs-theme={theme}
                              className="mb-3 d-flex flex-column "
                        >
                            {initialValues.username !== undefined && (
                                <Row className="mb-3 d-flex justify-content-center">
                                    <FormInput
                                        name={"username"}
                                        value={values.username || ""}
                                        error={errors.username}
                                        handleChange={handleChange}
                                        translate={t("username")}
                                        validationId={1}
                                    />
                                </Row>
                            )}
                            <Row className="mb-3 d-flex justify-content-center">
                                <FormInput
                                    name={"email"}
                                    value={values.email}
                                    error={errors.email}
                                    handleChange={handleChange}
                                    translate={t("email")}
                                    validationId={2}
                                    type="email"
                                />
                            </Row>
                            <Row className="mb-3 d-flex justify-content-center">
                                <FormInput
                                    name={"password"}
                                    value={values.password}
                                    error={errors.password}
                                    handleChange={handleChange}
                                    translate={t("password")}
                                    validationId={3}
                                    type="password"
                                />
                            </Row>
                            {initialValues.username !== undefined && (
                                <Row className="mb-3 d-flex justify-content-center">
                                    <FormInput
                                        name={"repeatPassword"}
                                        value={values.repeatPassword || ""}
                                        error={errors.repeatPassword}
                                        handleChange={handleChange}
                                        translate={t("repeatPassword")}
                                        validationId={4}
                                        type={"password"}
                                    />
                                </Row>
                            )}
                            {isLogin && <Button type="button"
                                    className={`align-self-end btn-info btn-sm`} onClick={() => navigate("/registration")}>{t("createAccount")}</Button>}

                            <Button type="submit" className="mt-2 align-self-center btn-lg">{t(title)}</Button>


                            {isRegistration && <Button type="button" className="mt-4 btn-info align-self-center btn-sm" onClick={() => navigate("/")}>{t("accountExist")}</Button>}
                        </Form>
                    )}
                </Formik>
            </Container>
        </Container>
    );
};



export default AuthForm;
