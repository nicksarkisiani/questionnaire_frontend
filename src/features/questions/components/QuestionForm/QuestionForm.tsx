import {questionSchema} from "../../schema/question.schema.ts";
import Form from "react-bootstrap/Form";
import FormInput from "../../../../components/FormInput/FormInput.tsx";
import * as formik from "formik";
import {ChangeEvent, FC, useState} from "react";
import {useTranslation} from "react-i18next";
import Button from "react-bootstrap/Button";
import FormSelect from "../../../../components/FormSelect/FormSelect.tsx";
import {ICreateQuestion} from "../../../../types/templates.ts";
import {BsFilePlus} from "react-icons/bs";
import {Container} from "react-bootstrap";

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

const QuestionForm: FC<QuestionFormProps> = ({onSubmitFunction, initialValues, isUpdate}) => {
    const {Formik} = formik;
    const {t} = useTranslation()

    const [answers, setAnswers] = useState<string[]>([]);

    const onSubmit = async (values: FormValues) => {
        await onSubmitFunction(values.title, values.description, values.state, values.type, answers);
    }

    const addAnswer = () => {
        setAnswers([...answers, t("possibleAnswer")])
    }

    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newAnswers = [...answers];
        newAnswers[index] = event.target.value; // Обновляем значение по индексу
        setAnswers(newAnswers);
    };


    return (
        <Formik
            validationSchema={questionSchema}
            onSubmit={onSubmit}
            initialValues={{
                ...initialValues,
                answers: answers
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
                    <FormSelect name={"type"} translate={t("type")} value={values.type} handleChange={handleChange}
                                error={errors.type}>
                        <option value="int">{t("int")}</option>
                        <option value="text">{t("text")}</option>
                        <option value="string">{t("string")}</option>
                        <option value="checkbox">{t("checkbox")}</option>
                    </FormSelect>
                    <FormSelect name={"state"} translate={t("state")} value={values.state.toString()}
                                handleChange={handleChange} error={errors.state}>
                        <option value="false">{t("no")}</option>
                        <option value="true">{t("yes")}</option>
                    </FormSelect>
                    {values.type === "checkbox" && (
                        <>
                            <Form.Group className="mt-5">
                                <Container className="xl-container m-0 p-0 d-flex justify-content-between align-items-center">
                                    <Form.Label>{t("answers")}</Form.Label>
                                    <Button onClick={addAnswer} className="mb-2 rounded text-center p-2 d-flex flex-column align-items-center" size="lg"><BsFilePlus /></Button>
                                </Container>
                                    {answers?.map(((answer, index) => (
                                        <Form.Control key={index} value={answer} className="mb-3"
                                               onChange={(event) => handleInputChange(index, event)}/>
                                    )))}
                            </Form.Group>
                        </>
                    )}
                    <Button variant="primary" type="submit" className={`mt-${values.type === "checkbox" ? 2 : 5}`}>
                        {isUpdate ? t("updateQuestion") : t("createQuestion")}
                    </Button>
                </Form>
            )}
        </Formik>

    )
        ;
};

export default QuestionForm;