import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher.tsx";
import {Container} from "react-bootstrap";
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import Logout from "../../features/auth/components/logout/Logout.tsx";

const Header = () => {

    const {isAuthenticated} = useTypedSelector(state => state.user);

    return (
        <Container className="xl-container d-flex flex-row align-items-center justify-content-end gap-5 mt-3">
            <ThemeSwitcher />
            <LocaleSwitcher />
            {isAuthenticated && <Logout />}
        </Container>
    );
};

export default Header;