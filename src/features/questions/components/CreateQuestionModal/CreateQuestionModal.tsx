import {useTranslation} from "react-i18next";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FC, useState} from "react";
import QuestionForm from "../QuestionForm/QuestionForm.tsx";
import QuestionService from "../../service/QuestionService.ts";
import fetchData from "../../../../helpers/fetchData.ts";

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

    const createQuestion = async (title: string, description: string, state: boolean, type: string, answers?: string[]) => {
        await fetchData(async () => {
            const question = await QuestionService.createQuestion(templateId, title, description, state, type, answers)
            if (question) {
                changeModalState(false)
                onSubmitFunction()
            }
        })
    }

    return (
        <>
            <Button variant="primary" onClick={() => setIsModalOpen(!isModalOpen)} className="mt-5 mb-5">
                {t("createQuestion")}
            </Button>
            <Modal show={isModalOpen} onHide={() => changeModalState(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("questionForm")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <QuestionForm onSubmitFunction={createQuestion} initialValues={{
                        title: "",
                        description: "",
                        type: "int",
                        state: false
                    }}/>
                </Modal.Body>

            </Modal>
        </>

    )
        ;
};

export default CreateQuestionModal;