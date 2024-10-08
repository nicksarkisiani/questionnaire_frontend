import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import {ChangeEventHandler, FC} from "react";

interface FormInputProps {
    validationId: number;
    name: string;
    value: string;
    translate: string;
    error: string | undefined;
    handleChange: ChangeEventHandler<HTMLInputElement>
    type?: "password" | "email" | "text";
}

const FormInput: FC<FormInputProps> = ({validationId, name, value, translate, error, handleChange, type="text"}) => {
    return (
        <Form.Group as={Col} md="4" controlId={`validationFormik${validationId}`}>
            <Form.Label>{translate}</Form.Label>
            <InputGroup hasValidation>
                <Form.Control
                    type={type}
                    placeholder={translate}
                    aria-describedby="inputGroupPrepend"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    isInvalid={!!error}

                />
                <Form.Control.Feedback type="invalid" tooltip>
                    {error}
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    );
};

export default FormInput;