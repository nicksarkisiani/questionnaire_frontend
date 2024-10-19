import {ITemplate, PartialTemplate} from "../../types/templates.ts";
import {AxiosResponse} from "axios";
import TemplateService from "../../features/template/service/TemplateService.ts";
import {useLoaderData} from "react-router";
import Form from "react-bootstrap/Form";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Card} from "react-bootstrap";
import CreateQuestionForm from "../../features/questions/components/CreateQuestionForm/CreateQuestionForm.tsx";
import fetchData from "../../helpers/fetchData.ts";
import FormGroup from "../../features/template/components/FormGroup/FormGroup.tsx";
import ImgInput from "../../features/template/components/ImgInput/ImgInput.tsx";

const TemplatePage = () => {
    const templateData = useLoaderData() as ITemplate
    const {t} = useTranslation();
    const [template, setTemplate] = useState<ITemplate>(templateData);


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


    return (
        <Form>
            <FormGroup label={"title"} value={template.title} saveData={saveData} changeTemplate={changeTemplate}/>
            <FormGroup label={"description"} value={template.description} saveData={saveData}
                       changeTemplate={changeTemplate}/>
            <FormGroup label={"topic"} value={template.topic} saveData={saveData} changeTemplate={changeTemplate}/>

            <ImgInput uploadImage={uploadImage} url={template.imageURL}/>


            <CreateQuestionForm templateId={template.id}
                                onSubmitFunction={updateTemplate}/>


            {template.questions.map(question => (
                <Card key={question.id}>
                    <Form.Group className="mt-5">
                        <Form.Label>{t("title")}</Form.Label>
                        <Form.Control value={question.title}/>
                    </Form.Group>
                    <Form.Group className="mt-5">
                        <Form.Label>{t("description")}</Form.Label>
                        <Form.Control value={question.description}/>
                    </Form.Group>
                    <Form.Group className="mt-5">
                        <Form.Label>{t("type")}</Form.Label>
                        <Form.Control value={question.type}/>
                    </Form.Group>
                    <Form.Group className="mt-5">
                        <Form.Label>{t("state")}</Form.Label>
                        <Form.Control value={`${question.state}`}/>
                    </Form.Group>
                </Card>
            ))}
        </Form>
    );
};

export default TemplatePage;