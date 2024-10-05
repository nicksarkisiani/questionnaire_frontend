import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import {InputGroup} from "react-bootstrap";
import {useTypedSelector} from "../../../hooks/useTypedSelector.ts";
import {useTranslation} from "react-i18next";

function RegistrationForm() {
    const {Formik} = formik;

    const {theme} = useTypedSelector(state => state.theme)
    const {t} = useTranslation()
    const schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        repeatPassword: yup.string().required(),
    });

    return (
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                username: '',
                email: "",
                password: "",
                repeatPassword: "",
            }}
        >
            {({handleSubmit, handleChange, values, errors}) => (
                <Form  onSubmit={handleSubmit}
                      data-bs-theme={theme}
                >
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationFormikUsername1">
                            <Form.Label>{t("username")}</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder={t("username")}
                                    aria-describedby="inputGroupPrepend"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    isInvalid={!!errors.username}

                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.username}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationFormik2"
                            className="position-relative"
                        >
                            <Form.Label>{t("email")}</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={t("email")}
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />

                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationFormik3"
                            className="position-relative"
                        >
                            <Form.Label>{t("password")}</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder={t("password")}
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />

                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationFormik4"
                            className="position-relative"
                        >
                            <Form.Label>{t("repeatPassword")}</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder={t("repeatPassword")}
                                name="repeatPassword"
                                value={values.repeatPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.repeatPassword}
                            />

                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.repeatPassword}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit">{t("submit")}</Button>
                </Form>
            )}
        </Formik>
    );
}

export default RegistrationForm;