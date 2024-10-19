import {LoaderFunction} from "react-router";
import {ITemplate} from "../../../types/templates.ts";
import {AxiosResponse} from "axios";
import TemplateService from "../service/TemplateService.ts";

export const templateLoader: LoaderFunction = async ({params}): Promise<ITemplate | null> => {
    const templateId = params.id as string;
    const template: AxiosResponse<ITemplate> = await TemplateService.getTemplateById(+templateId)
    return template.data
}