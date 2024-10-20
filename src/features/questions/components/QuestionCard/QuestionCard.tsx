import Form from "react-bootstrap/Form";
import {Card} from "react-bootstrap";
import {IQuestion} from "../../../../types/templates.ts";
import {FC} from "react";
import {useTranslation} from "react-i18next";

interface QuestionCardProps {
    question: IQuestion;
}

const QuestionCard: FC<QuestionCardProps> = ({question}) => {

    const {t} = useTranslation()

    return (
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
    );
};

export default QuestionCard;