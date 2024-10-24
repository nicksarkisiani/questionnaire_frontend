import {ITemplate, ITopic, PartialTemplate} from "../../types/templates.ts";
import {AxiosResponse} from "axios";
import TemplateService from "../../features/template/service/TemplateService.ts";
import {useLoaderData} from "react-router";
import Form from "react-bootstrap/Form";
import {ChangeEvent, useEffect, useState} from "react";
import CreateQuestionForm from "../../features/questions/components/CreateQuestionModal/CreateQuestionModal.tsx";
import fetchData from "../../helpers/fetchData.ts";
import ImgInput from "../../features/template/components/ImgInput/ImgInput.tsx";
import TemplateInput from "../../features/template/components/TemplateInput/TemplateInput.tsx";
import QuestionCard from "../../features/questions/components/QuestionCard/QuestionCard.tsx";
import {Container, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import QuestionService from "../../features/questions/service/QuestionService.ts";

const TemplatePage = () => {
    const templateData = useLoaderData() as ITemplate
    const [template, setTemplate] = useState<ITemplate>(templateData);
    const [topics, setTopics] = useState<ITopic[]>([]);
    const {t} = useTranslation()

    const saveTopics = async () => {
        await fetchData(async () => {
            const axiosData: AxiosResponse<ITopic[]> = await TemplateService.getTopics()
            setTopics(axiosData.data)
        })
    }

    useEffect(() => {
        saveTopics()
    }, []);

    const saveData = async (data: PartialTemplate) => {
        await fetchData(async () => {
            await TemplateService.patchValues(data, template.id as number);
            await updateTemplate()
        })
    }

    const updateTemplate = async () => {
        await fetchData(async () => {
            const axiosData: AxiosResponse<ITemplate> = await TemplateService.getTemplateById(+template.id)
            setTemplate(axiosData.data)
        })
    }

    const uploadImage = async (file: File) => {
        await fetchData(async () => {
            const formData = new FormData();
            formData.append("file", file);
            await TemplateService.patchImage(formData, template.id)
            await updateTemplate()
        })
    }

    const changeTemplate = (name: string, value: string) => {
        setTemplate(prevTemplate => ({
            ...prevTemplate,
            [name]: value
        }));
    }

    const changeTopic = async (e: ChangeEvent<HTMLSelectElement>) => {
        await fetchData(async () => {
            await TemplateService.updateTopic(template.id, +e.target.value)
            await updateTemplate()
        })
    }


    const deleteQuestion = async (questionId: number) => {
        await fetchData(async () => {
            await QuestionService.deleteQuestion(template.id, questionId)
            await updateTemplate()
        })
    }

    return (
        <Container>
            <TemplateInput label={"title"} value={template.title} saveData={saveData} changeTemplate={changeTemplate}/>
            <TemplateInput label={"description"} value={template.description} saveData={saveData}
                           changeTemplate={changeTemplate} isTextArea={true}/>
            <Form.Group className={"mt-5"}>
                <Form.Label>{t("topic")}</Form.Label>
                <InputGroup hasValidation>
                    <Form.Select
                        value={template.topic?.id || "default"}
                        onChange={changeTopic}
                    >
                        <option value="default" disabled={true}>
                            {t("chooseTopic")}
                        </option>
                        {topics.map((topic: ITopic) => (
                            <option value={topic.id} key={topic.id}>
                                {t(topic.name)}
                            </option>
                        ))}
                    </Form.Select>
                </InputGroup>
            </Form.Group>

            <Form.Group className={"mt-5"}>
                <Form.Label>{t("isPublic")}</Form.Label>
                <InputGroup hasValidation>
                    <Form.Select
                        value={`${template.isPublic}`}
                        onChange={(e) => saveData({ isPublic: e.target.value === "true" })}
                    >
                        <option value="true">{t("yes")}</option>
                        <option value="false">{t("no")}</option>
                    </Form.Select>
                </InputGroup>
            </Form.Group>

            <ImgInput uploadImage={uploadImage} url={template.imageURL}/>

            <CreateQuestionForm templateId={template.id}
                                onSubmitFunction={updateTemplate}/>


            {template.questions.map((question, index) => (
                <QuestionCard question={question} key={question.id} deleteQuestion={deleteQuestion}
                              onSubmitFunction={updateTemplate} templateId={template.id} index={index + 1}/>
            ))}
        </Container>
    );
};

export default TemplatePage;