import {ITemplate} from "../../types/templates.ts";
import {AxiosResponse} from "axios";
import TemplateService from "../../features/template/service/TemplateService.ts";
import {LoaderFunction, useLoaderData} from "react-router";

export const templateLoader: LoaderFunction = async ({params}): Promise<ITemplate | null> => {
    const templateId = params.id as string;
    const template: AxiosResponse<ITemplate> = await TemplateService.getTemplateById(+templateId)
    return template.data

}
const TemplatePage = () => {
    const template = useLoaderData() as ITemplate
    console.log(template)
    return (
        <div>
        </div>
    );
};

export default TemplatePage;