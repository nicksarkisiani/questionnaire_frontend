import {ITemplate, PartialTemplate} from "../../types/templates.ts";
import {AxiosResponse} from "axios";
import TemplateService from "../../features/template/service/TemplateService.ts";
import {useLoaderData} from "react-router";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import CreateQuestionForm from "../../features/questions/components/CreateQuestionModal/CreateQuestionModal.tsx";
import fetchData from "../../helpers/fetchData.ts";
import ImgInput from "../../features/template/components/ImgInput/ImgInput.tsx";
import TemplateInput from "../../features/template/components/TemplateInput/TemplateInput.tsx";
import QuestionCard from "../../features/questions/components/QuestionCard/QuestionCard.tsx";

const TemplatePage = () => {
    const templateData = useLoaderData() as ITemplate
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

            <TemplateInput label={"title"} value={template.title} saveData={saveData} changeTemplate={changeTemplate}/>
            <TemplateInput label={"description"} value={template.description} saveData={saveData}
                       changeTemplate={changeTemplate} isTextArea={true}/>
            <TemplateInput label={"topic"} value={template.topic} saveData={saveData} changeTemplate={changeTemplate}/>

            <ImgInput uploadImage={uploadImage} url={template.imageURL}/>

            <CreateQuestionForm templateId={template.id}
                                onSubmitFunction={updateTemplate}/>


            {template.questions.map(question => (
                <QuestionCard question={question} key={question.id}/>
            ))}
        </Form>
    );
};

export default TemplatePage;