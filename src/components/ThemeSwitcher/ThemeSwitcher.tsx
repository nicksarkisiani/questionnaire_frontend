import {useActions} from "../../hooks/useActions.ts";
import Form from "react-bootstrap/Form";
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import React, {useEffect, useState} from "react";

const ThemeSwitcher = () => {
    const {theme} = useTypedSelector(state => state.theme)
    const [isChecked, setIsChecked] = useState<boolean>(theme === "dark");

    useEffect(() => {
        setIsChecked(theme === "dark");
    }, [theme])

    const {changeTheme} = useActions()

    const changeThemeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const boolean = e.target.checked;
        setIsChecked(boolean)
        changeTheme(boolean ? "dark" : "light")
    }

    return (
        <Form>
            <Form.Switch onChange={changeThemeHandler} type="switch"
                         id="theme-switch"
                         label="Check this switch"
                         name="theme"
                         checked={isChecked}
            />

        </Form>
    );
};

export default ThemeSwitcher;