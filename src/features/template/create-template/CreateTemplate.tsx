import {Card} from "react-bootstrap";
import {BsPatchPlus} from "react-icons/bs";
import {useTranslation} from "react-i18next";
import TemplateService from "../service/TemplateService.ts";
import {toast} from "react-toastify";
import {CustomAxiosError} from "../../../types/axios.ts";
const CreateTemplate = () => {

    const {t} = useTranslation();

    const createTemplate = async () => {
        try {
            const template = await TemplateService.createTemplate()
            console.log(template)
        } catch (e: unknown) {
            const error = e as CustomAxiosError;
            if (error) toast.error(error?.response?.data?.message)
        }
    }

    return (
        <Card style={{ width: '10rem' }} className="ml-5 mt-5 " role="button" onClick={createTemplate}>
            <Card.Body className="d-flex justify-content-center d-flex flex-column align-items-center">
                <Card.Title className="text-center">{t("createTemplate")}</Card.Title>
                <BsPatchPlus size={50}/>
            </Card.Body>
        </Card>
    );
};

export default CreateTemplate;