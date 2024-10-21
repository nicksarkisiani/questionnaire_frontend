import Button from "react-bootstrap/Button";
import {BsFillTrashFill} from "react-icons/bs";
import {FC, useState} from "react";
import {Container, Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";

interface DeleteQuestionModalProps {
    deleteQuestion: () => void;
}

const DeleteQuestionModal: FC<DeleteQuestionModalProps> = ({deleteQuestion}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const {t} = useTranslation()

    const onDelete = () => {
        deleteQuestion()
        setIsModalOpen(false)
    }

    return (
        <>
            <Button variant="danger" onClick={() => setIsModalOpen(true)} className="rounded"><BsFillTrashFill /></Button>
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("deleteQuestion")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="lead">{t("isSure")}</p>
                    <Container className="d-flex flex-row justify-content-center gap-3">
                        <Button variant="info" size="lg" onClick={() => setIsModalOpen(false)} className="rounded">{t("no")}</Button>
                        <Button variant="danger" size="lg" onClick={onDelete} className="rounded">{t("yes")}</Button>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeleteQuestionModal;