import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher.tsx";
import {Container} from "react-bootstrap";

const Header = () => {
    return (
        <Container className="xl-container d-flex flex-row align-items-center justify-content-end gap-5 mt-3">
            <ThemeSwitcher />
            <LocaleSwitcher />
        </Container>
    );
};

export default Header;