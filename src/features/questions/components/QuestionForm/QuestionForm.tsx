import {questionSchema} from "../../schema/question.schema.ts";
import Form from "react-bootstrap/Form";
import FormInput from "../../../../components/FormInput/FormInput.tsx";
import * as formik from "formik";
import QuestionService from "../../service/QuestionService.ts";
import {CustomAxiosError} from "../../../../types/axios.ts";
import {toast} from "react-toastify";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import Button from "react-bootstrap/Button";

interface QuestionFormProps {
    templateId: number;
    onSubmitFunction: () => Promise<void>
    changeModalState: (bool: boolean) => void
}

interface FormValues {
    title: string
    description: string
    state: boolean
    type: string
    answers?: string[]
}

const QuestionForm: FC<QuestionFormProps> = ({templateId, changeModalState, onSubmitFunction}) => {
    const {Formik} = formik;
    const {t} = useTranslation()

    const onSubmit = async (values: FormValues) => {
        console.log('1')
        await createQuestion(values.title, values.description, values.state, values.type, values.answers);
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

    return (
            <Formik
            validationSchema={questionSchema}
            onSubmit={onSubmit}
            initialValues={{
                title: "",
                description: "",
                type: "int",
                state: false
            }}
        >
            {({handleSubmit, handleChange, values, errors}) => (
                <Form
                    onSubmit={handleSubmit}
                >
                    <FormInput validationId={1} name={"title"} value={values.title} translate={t("title")}
                               error={errors.title} handleChange={handleChange}/>

                    <FormInput validationId={2} name={"description"} value={values.description}
                               translate={t("description")} error={errors.description}
                               handleChange={handleChange} classNames="mt-5"/>
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
                        <Form.Select
                            name={"state"}
                            value={`${values.state}`}
                            onChange={handleChange}
                            isInvalid={!!errors.state}
                            defaultValue={"false"}
                        >
                            <option value="false">{t("false")}</option>
                            <option value="true">{t("true")}</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.state}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {values.type === "checkbox" && (
                        <Form.Group className="mt-5">
                            <Form.Label>{t("answers")}</Form.Label>
                            <Form.Control
                                name={"answers"}
                                value={`${values.state}`}
                                onChange={handleChange}
                                isInvalid={!!errors.state}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.state}
                            </Form.Control.Feedback>
                        </Form.Group>

                    )}
                    <Button variant="primary" type="submit">
                        {t("createQuestion")}
                    </Button>
                </Form>
            )}
        </Formik>

    )
        ;
};

export default QuestionForm;