import Form from "react-bootstrap/Form";
import {useTranslation} from "react-i18next";
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import React, {useEffect} from "react";
import {useActions} from "../../hooks/useActions.ts";

const LocaleSwitcher = () => {

    const {i18n} = useTranslation();
    const {locale} = useTypedSelector(state => state.locale);
    const {changeLocale} = useActions()

    useEffect(() => {
        i18n.changeLanguage(locale)
    }, [locale]);

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        changeLocale(e.target.value);
    }

    return (
        <Form.Select onChange={changeLanguage} value={locale}>
            <option value="en" >English</option>
            <option value="ru">Русский</option>
        </Form.Select>
    );
};

export default LocaleSwitcher;