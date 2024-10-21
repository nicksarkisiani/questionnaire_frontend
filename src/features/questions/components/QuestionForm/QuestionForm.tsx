import {questionSchema} from "../../schema/question.schema.ts";
import Form from "react-bootstrap/Form";
import FormInput from "../../../../components/FormInput/FormInput.tsx";
import * as formik from "formik";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import Button from "react-bootstrap/Button";
import FormSelect from "../../../../components/FormSelect/FormSelect.tsx";
import {ICreateQuestion} from "../../../../types/templates.ts";

interface QuestionFormProps {
    onSubmitFunction: (title: string, description: string, state: boolean, type: string, answers?: string[]) => Promise<void>
    initialValues: ICreateQuestion
    isUpdate?: true

}

interface FormValues {
    title: string
    description: string
    state: boolean
    type: string
    answers?: string[]
}

const QuestionForm: FC<QuestionFormProps> = ({onSubmitFunction, initialValues,isUpdate }) => {
    const {Formik} = formik;
    const {t} = useTranslation()

    const onSubmit = async (values: FormValues) => {
        await onSubmitFunction(values.title, values.description, values.state, values.type, values.answers);
    }

    return (
            <Formik
            validationSchema={questionSchema}
            onSubmit={onSubmit}
            initialValues={initialValues}
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
                    <FormSelect name={"type"} translate={t("type")} value={values.type} handleChange={handleChange} error={errors.type}>
                            <option value="int">Int</option>
                            <option value="text">Text</option>
                            <option value="string">String</option>
                            <option value="checkbox">Checkbox</option>
                    </FormSelect>
                    <FormSelect name={"state"} translate={t("state")} value={values.state.toString()} handleChange={handleChange} error={errors.state}>
                            <option value="false">{t("false")}</option>
                            <option value="true">{t("true")}</option>
                    </FormSelect>
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
                    <Button variant="primary" type="submit" className="mt-5">
                        {isUpdate ? t("updateQuestion") : t("createQuestion")}
                    </Button>
                </Form>
            )}
        </Formik>

    )
        ;
};

export default QuestionForm;