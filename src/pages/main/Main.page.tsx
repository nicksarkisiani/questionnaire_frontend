import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import LoginForm from "../../features/auth/components/Login/LoginForm.tsx";
import CreateTemplate from "../../features/template/components/CreateTemplate/CreateTemplate.tsx";
import {Card, Container} from "react-bootstrap";
import {useActions} from "../../hooks/useActions.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router";

const MainPage = () => {

    const {isAuthenticated} = useTypedSelector(state => state.user)
    const {templates} = useTypedSelector(state => state.templates)
    const {getTemplates} = useActions()
    const navigate = useNavigate();

    useEffect(() => {
        getTemplates()
    }, [isAuthenticated]);

    if (isAuthenticated) {
        return (
            <Container className="xl-container d-flex flex-column ml-5 mt-5">
                <CreateTemplate/>
                <Container className="d-flex flex-row gap-5 pt-3">
                    {templates.map(template => (
                        <Card key={template.id} style={{ width: '10rem', height: '10rem' }} role="button" onClick={() => navigate(`/templates/${template.id}`)}>
                            <p className="lead">{template.title}</p>
                        </Card>
                    ))}
                </Container>
            </Container>
        )
    }

    return (
        <>
            <LoginForm/>
        </>
    );
};

export default MainPage;