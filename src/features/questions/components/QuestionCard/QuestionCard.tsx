import Form from "react-bootstrap/Form";
import {Card, Container} from "react-bootstrap";
import {IQuestion} from "../../../../types/templates.ts";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import UpdateQuestionModal from "../UpdateQuestionModal/UpdateQuestionModal.tsx";
import DeleteQuestionModal from "../DeleteQuestionModal/DeleteQuestionModal.tsx";
import {BsSuitHeart} from "react-icons/bs";

interface QuestionCardProps {
    templateId: number,
    question: IQuestion;
    deleteQuestion: (questionId: number) => Promise<void>;
    onSubmitFunction: () => Promise<void>
    index: number
}

const QuestionCard: FC<QuestionCardProps> = ({templateId, question, deleteQuestion, onSubmitFunction, index}) => {

    const {t} = useTranslation()

    return (
        <Card key={question.id} className="mb-5 bg-light p-3">
            <h3 className="display-6">{`${t("question")} № ${index}`}</h3>
            <Form.Group className="mt-5">
                <Form.Label>{t("title")}</Form.Label>
                <p className="lead">{question.title}</p>

            </Form.Group>
            <Form.Group className="mt-5">
                <Form.Label>{t("description")}</Form.Label>
                <p className="lead">{question.description}</p>
            </Form.Group>
            <Form.Group className="mt-5">
                <Form.Label>{t("type")}</Form.Label>
                <p className="lead">{question.type}</p>

            </Form.Group>
            <Form.Group className="mt-5">
                <Form.Label>{t("state")}</Form.Label>
                <p className="lead">{`${question.state}`}</p>
            </Form.Group>


            {question.answers && question.answers.length > 0 && (
                <>
                    <Form.Label className="mt-5">{t("answers")}</Form.Label>
                    {
                        question.answers.map(
                            (answer, index) => (
                                <Container className="p-0 m-0 mt-2 d-flex align-items-center gap-3" key={index}>
                                    <BsSuitHeart/>
                                    <p  className="lead m-0 text-center">{answer}</p>
                                </Container>
                            )
                        )
                    }
                </>
            )}
            <Container className="mt-2 d-flex justify-content-end p-0 gap-2">
                <DeleteQuestionModal deleteQuestion={() => deleteQuestion(question.id)}/>
                <UpdateQuestionModal question={question} templateId={templateId} onSubmitFunction={onSubmitFunction}/>
            </Container>

        </Card>
    )
        ;
};

export default QuestionCard;