import Form from "react-bootstrap/Form";
import {useTranslation} from "react-i18next";
import {ChangeEvent, FC, useCallback} from "react";
import {ITemplate, PartialTemplate} from "../../../../types/templates.ts";
import debounce from "lodash.debounce";
import {InputGroup} from "react-bootstrap";

interface FormGroupProps {
    label: string
    value: string
    saveData: (data: Partial<ITemplate>) => Promise<void>
    changeTemplate: (name: string, value: string) => void
    isTextArea?: boolean
}

const TemplateInput: FC<FormGroupProps> = ({label, value, changeTemplate, saveData, isTextArea}) => {

    const debouncedSave = useCallback(debounce((nextValue) => saveData(nextValue), 2000), [])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        changeTemplate(name, value)
        debouncedSave({
            [name]: value
        });
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        const data: PartialTemplate = {
            [name]: value
        }
        debouncedSave.cancel()
        saveData(data)
    }

    const {t} = useTranslation();

    return (
        <Form.Group className={"mt-5"}>
            <Form.Label>{t(label)}</Form.Label>
            <InputGroup hasValidation>
                <Form.Control value={value} onChange={onChange} name={label} onBlur={onBlur}
                              as={isTextArea ? "textarea" : "input"}/>
            </InputGroup>
        </Form.Group>
    );
};

export default TemplateInput;