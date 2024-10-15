import {useTranslation} from "react-i18next";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router";
import {Card, Container} from "react-bootstrap";

const ErrorElement = () => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    return (
        <Container className="xs-container d-flex flex-column justify-content-center align-items-center">
            <Card
                className="d-flex flex-column justify-content-center align-items-center mt-5 pt-5 pb-5 w-50">
                <p className="lead">{t("unexpectedError")}</p>
                <Button onClick={() => navigate("/")} className="btn-lg">{t("back")}</Button>
            </Card>
        </Container>
    );
};

export default ErrorElement;