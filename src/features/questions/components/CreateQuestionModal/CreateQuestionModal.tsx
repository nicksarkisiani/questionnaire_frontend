import {useTranslation} from "react-i18next";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FC, useState} from "react";
import QuestionForm from "../QuestionForm/QuestionForm.tsx";

interface CreateQuestionFormProps {
    templateId: number;
    onSubmitFunction: () => Promise<void>
}


const CreateQuestionModal: FC<CreateQuestionFormProps> = ({templateId, onSubmitFunction}) => {
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const changeModalState = (bool: boolean) => {
        setIsModalOpen(bool);
    }


    return (
        <>
            <Button variant="primary" onClick={() => setIsModalOpen(!isModalOpen)}>
                {t("createQuestion")}
            </Button>
            <Modal show={isModalOpen} onHide={() => changeModalState(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("questionForm")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <QuestionForm templateId={templateId} onSubmitFunction={onSubmitFunction}
                                  changeModalState={changeModalState}/>
                </Modal.Body>

            </Modal>
        </>

    )
        ;
};

export default CreateQuestionModal;