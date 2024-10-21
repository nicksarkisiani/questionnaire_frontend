import Form from "react-bootstrap/Form";
import React, {ChangeEventHandler, FC} from "react";

interface FormSelectProps {
    name: string
    translate: string
    value: string
    handleChange: ChangeEventHandler<HTMLSelectElement>
    error: string | undefined
    children: React.ReactNode;
}

const FormSelect:FC<FormSelectProps> = ({name,translate, value, handleChange, error, children}) => {
    return (
        <Form.Group className="mt-5">
            <Form.Label>{translate}</Form.Label>
            <Form.Select
                name={name}
                value={value}
                onChange={handleChange}
                isInvalid={!!error}
            >
                {children}
            </Form.Select>
            <Form.Control.Feedback type="invalid" tooltip>
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default FormSelect;