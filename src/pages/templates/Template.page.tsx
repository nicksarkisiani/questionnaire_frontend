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

export const templateLoader: LoaderFunction = async ({params}): Promise<ITemplate | null> => {
    const templateId = params.id as string;
    const template: AxiosResponse<ITemplate> = await TemplateService.getTemplateById(+templateId)
    return template.data
}

const TemplatePage = () => {
    const templateData = useLoaderData() as ITemplate
    const {t} = useTranslation();
    const [template, setTemplate] = useState<ITemplate>(templateData);

    const debouncedSave = useCallback(
        debounce((nextValue) => saveData(nextValue), 2000), []
    )

    const saveData = async (data: PartialTemplate) => {
        try {
            const axiosData: AxiosResponse<ITemplate> = await TemplateService.patchValues(data, template.id as number);
            setTemplate(axiosData.data)
        } catch (e: unknown) {
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
            [name] : value
        });
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
        </Form>
    );
};

export default TemplatePage;