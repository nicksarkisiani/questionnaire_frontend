import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher.tsx";

const Header = () => {
    return (
        <div>
            <ThemeSwitcher />
            <LocaleSwitcher />
        </div>
    );
};

export default Header;