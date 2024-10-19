import Form from "react-bootstrap/Form";
import {Image} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {ChangeEvent, FC} from "react";

interface ImgInputProps {
    url?: string
    uploadImage: (file: File) => Promise<void>
}

const ImgInput: FC<ImgInputProps> = ({url, uploadImage}) => {
    const {t} = useTranslation();

    const onImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            uploadImage(selectedFile)
        }
    }

    return (
        <Form.Group className="mt-5">
            <Form.Label>{t("image")}</Form.Label>
            <Form.Control type="file" onChange={onImageAdd}/>
            {url && <Image src={url} className="mt-5 w-25 h-25"/>}
        </Form.Group>
    );
};

export default ImgInput;