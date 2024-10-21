import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher.tsx";
import {Container} from "react-bootstrap";
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import Logout from "../../features/auth/components/Logout/Logout.tsx";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

const Header = () => {

    const {isAuthenticated} = useTypedSelector(state => state.user);

    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <Container className="xl-container d-flex flex-row align-items-center justify-content-between pt-3">
            <Container>
                <Button variant="primary" onClick={() => navigate('/')} className="rounded">
                    {t("main")}
                </Button>
            </Container>

            <Container className="d-flex flex-row align-items-center gap-5 justify-content-end">
                <ThemeSwitcher />
                <LocaleSwitcher />
                {isAuthenticated && <Logout />}
            </Container>

        </Container>
    );
};

export default Header;