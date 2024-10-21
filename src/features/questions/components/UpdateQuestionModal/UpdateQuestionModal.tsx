import {useTranslation} from "react-i18next";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FC, useState} from "react";
import {IQuestion} from "../../../../types/templates.ts";
import fetchData from "../../../../helpers/fetchData.ts";
import QuestionService from "../../service/QuestionService.ts";
import QuestionForm from "../QuestionForm/QuestionForm.tsx";

interface UpdateQuestionModalProps {
    templateId: number
    question: IQuestion;
    onSubmitFunction: () => Promise<void>
}


const UpdateQuestionModal: FC<UpdateQuestionModalProps> = ({templateId, question, onSubmitFunction}) => {
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const changeModalState = (bool: boolean) => {
        setIsModalOpen(bool);
    }

    const updateQuestion = async (title: string, description: string, state: boolean, type: string, answers?: string[]) => {
        await fetchData(async () => {
            const patchedQuestion = await QuestionService.patchQuestion(templateId, question.id, title, description, state, type, answers)
            if (patchedQuestion) {
                onSubmitFunction()
                setIsModalOpen(false)
            }
        })
    }


    return (
        <>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                {t("updateQuestion")}
            </Button>
            <Modal show={isModalOpen} onHide={() => changeModalState(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("questionForm")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <QuestionForm onSubmitFunction={updateQuestion} initialValues={{
                        title: question.title,
                        description: question.description,
                        type: question.type,
                        state: question.state,
                    }}
                        isUpdate={true}
                    />
                </Modal.Body>
            </Modal>
        </>

    )
        ;
};

export default UpdateQuestionModal;