import Form from "react-bootstrap/Form";
import {useTranslation} from "react-i18next";
import * as formik from "formik";
import {questionSchema} from "../../schema/question.schema.ts";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FC, useState} from "react";
import QuestionService from "../../service/QuestionService.ts";
import {CustomAxiosError} from "../../../../types/axios.ts";
import {toast} from "react-toastify";

interface CreateQuestionFormProps {
    templateId: number;
    onSubmitFunction: () => Promise<void>
}

interface FormValues {
    title: string
    description: string
    state: boolean
    type: string
    answers?: string[]
}

const CreateQuestionForm: FC<CreateQuestionFormProps> = ({templateId, onSubmitFunction}) => {
    const {Formik} = formik;
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const changeModalState = (bool: boolean) => {
        setIsModalOpen(bool);
    }

    const createQuestion = async (title: string, description: string, state: boolean, type: string, answers?: string[]) => {
        try {
            const question = await QuestionService.createQuestion(templateId, title, description, state, type, answers)
            if (question) {
                changeModalState(false)
                onSubmitFunction()
            }
        } catch (e: unknown) {
            const error = e as CustomAxiosError;
            if (error) toast.error(error?.response?.data?.message)
        }
    }

    const onSubmit = async (values: FormValues) => {
        await createQuestion(values.title, values.description, values.state, values.type, values.answers);
    }

    return (
        <>
            <Button variant="primary" onClick={() => setIsModalOpen(!isModalOpen)}>
                {t("createQuestion")}
            </Button>
            <Modal show={isModalOpen} onHide={() => changeModalState(false)}>
                <Formik
                    validationSchema={questionSchema}
                    onSubmit={onSubmit}
                    initialValues={{
                        title: "",
                        description: "",
                        type: "",
                        state: false
                    }}
                >
                    {({handleSubmit, handleChange, values, errors}) => (
                        <Form
                            onSubmit={handleSubmit}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{t("questionForm")}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <Form.Group className="mt-5">
                                    <Form.Label>{t("title")}</Form.Label>
                                    <Form.Control
                                        name={"title"}
                                        value={values.title}
                                        onChange={handleChange}
                                        isInvalid={!!errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.title}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mt-5">
                                    <Form.Label>{t("description")}</Form.Label>
                                    <Form.Control
                                        name={"description"}
                                        value={values.description}
                                        onChange={handleChange}
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mt-5">
                                    <Form.Label>{t("type")}</Form.Label>
                                    <Form.Select
                                        name={"type"}
                                        value={values.type}
                                        onChange={handleChange}
                                        isInvalid={!!errors.type}
                                        defaultValue={"text"}
                                    >
                                        <option value="int">Int</option>
                                        <option value="text">Text</option>
                                        <option value="string">String</option>
                                        <option value="checkbox">Checkbox</option>

                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.type}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mt-5">
                                    <Form.Label>{t("state")}</Form.Label>
                                    <Form.Control
                                        name={"state"}
                                        value={`${values.state}`}
                                        onChange={handleChange}
                                        isInvalid={!!errors.state}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.state}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {values.type === "checkbox" && (
                                    <Form.Group className="mt-5">
                                        <Form.Label>{t("state")}</Form.Label>
                                        <Form.Control
                                            name={"state"}
                                            value={`${values.state}`}
                                            onChange={handleChange}
                                            isInvalid={!!errors.state}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.state}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" type="submit">
                                    {t("createQuestion")}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>

    )
        ;
};

export default CreateQuestionForm;