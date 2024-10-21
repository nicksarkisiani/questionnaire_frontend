import Form from "react-bootstrap/Form";
import {Card} from "react-bootstrap";
import {IQuestion} from "../../../../types/templates.ts";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import Button from "react-bootstrap/Button";
import {BsFillTrashFill} from "react-icons/bs";
import UpdateQuestionModal from "../UpdateQuestionModal/UpdateQuestionModal.tsx";

interface QuestionCardProps {
    templateId: number,
    question: IQuestion;
    deleteQuestion: (questionId: number) => Promise<void>;
    onSubmitFunction: () => Promise<void>
}

const QuestionCard: FC<QuestionCardProps> = ({templateId, question, deleteQuestion, onSubmitFunction}) => {

    const {t} = useTranslation()

    return (
        <Card key={question.id}>
            <Form.Group className="mt-5">
                <Form.Label>{t("title")}</Form.Label>
                <Form.Label>{question.title}</Form.Label>

            </Form.Group>
            <Form.Group className="mt-5">
                <Form.Label>{t("description")}</Form.Label>
                <Form.Label>{question.description}</Form.Label>
            </Form.Group>
            <Form.Group className="mt-5">
                <Form.Label>{t("type")}</Form.Label>
                <Form.Label>{question.type}</Form.Label>

            </Form.Group>
            <Form.Group className="mt-5">
                <Form.Label>{t("state")}</Form.Label>
                <Form.Label>{question.state}</Form.Label>
            </Form.Group>
            <Button variant="danger" onClick={() => deleteQuestion(question.id)}><BsFillTrashFill /></Button>
            <UpdateQuestionModal question={question} templateId={templateId} onSubmitFunction={onSubmitFunction}/>
        </Card>
    );
};

export default QuestionCard;