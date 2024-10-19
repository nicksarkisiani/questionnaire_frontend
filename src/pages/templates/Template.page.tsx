import {ITemplate, PartialTemplate} from "../../types/templates.ts";
import {AxiosResponse} from "axios";
import TemplateService from "../../features/template/service/TemplateService.ts";
import {LoaderFunction, useLoaderData} from "react-router";
import Form from "react-bootstrap/Form";
import {useTranslation} from "react-i18next";
import React, {ChangeEvent, useCallback, useState} from "react";
import {CustomAxiosError} from "../../types/axios.ts";
import {toast} from "react-toastify";
import debounce from 'lodash.debounce';
import {Card, Image} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import CreateQuestionForm from "../../features/questions/components/create-question-form/CreateQuestionForm.tsx";

export const templateLoader: LoaderFunction = async ({params}): Promise<ITemplate | null> => {
    const templateId = params.id as string;
    const template: AxiosResponse<ITemplate> = await TemplateService.getTemplateById(+templateId)
    return template.data
}

const TemplatePage = () => {
    const templateData = useLoaderData() as ITemplate
    const {t} = useTranslation();
    const [template, setTemplate] = useState<ITemplate>(templateData);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const debouncedSave = useCallback(
        debounce((nextValue) => saveData(nextValue), 2000), []
    )

    const saveData = async (data: PartialTemplate) => {
        try {
            await TemplateService.patchValues(data, template.id as number);
            await updateTemplate()
        } catch (e: unknown) {
            const error = e as CustomAxiosError;
            if (error) toast.error(error?.response?.data?.message)
        }
    }

    const updateTemplate = async () => {
        try {
            const axiosData: AxiosResponse<ITemplate> = await TemplateService.getTemplateById(+template.id)
            setTemplate(axiosData.data)
        } catch (e) {
            const error = e as CustomAxiosError;
            if (error) toast.error(error?.response?.data?.message)
        }
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        const data: PartialTemplate = {
            [name]: value
        }
        debouncedSave.cancel()
        saveData(data)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setTemplate(prevTemplate => ({
            ...prevTemplate,
            [name]: value
        }));
        debouncedSave({
            [name]: value
        });
    }

    const onImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            uploadImage(selectedFile)
        }
    }

    const uploadImage = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const axiosData: AxiosResponse<ITemplate> = await TemplateService.patchImage(formData, template.id)
            setTemplate(axiosData.data);
        } catch (e) {
            const error = e as CustomAxiosError;
            if (error) toast.error(error?.response?.data?.message)
        }
    }

    const changeModalState = (bool: boolean) => {
        setIsModalOpen(bool);
    }


    return (
        <Form>
            <Form.Group className="mt-5">
                <Form.Label>{t("title")}</Form.Label>
                <Form.Control value={template.title} onChange={onChange} name="title" onBlur={onBlur}/>
            </Form.Group>
            <Form.Group className="mt-5">
                <Form.Label>{t("description")}</Form.Label>
                <Form.Control value={template.description} onChange={onChange} name="description" onBlur={onBlur}/>
            </Form.Group>
            <Form.Group className="mt-5">
                <Form.Label>{t("topic")}</Form.Label>
                <Form.Control value={template.topic} onChange={onChange} name="topic" onBlur={onBlur}/>
            </Form.Group>
            <Form.Group className="mt-5">
                <Form.Label>{t("image")}</Form.Label>
                <Form.Control type="file" onChange={onImageAdd}/>
                {template.imageURL && <Image src={template.imageURL} className="mt-5 w-25 h-25"/>}
            </Form.Group>
            <Button variant="primary" onClick={() => setIsModalOpen(!isModalOpen)}>
                {t("createQuestion")}
            </Button>


            <CreateQuestionForm templateId={template.id} isModalOpen={isModalOpen} changeIsModalOpen={changeModalState} onSubmitFunction={updateTemplate}/>


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