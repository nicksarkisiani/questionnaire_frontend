import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import {ChangeEventHandler, FC} from "react";

interface FormInputProps {
    validationId?: number
    name: string;
    value: string;
    translate: string;
    error: string | undefined;
    handleChange: ChangeEventHandler<HTMLInputElement>
    type?: "password" | "email" | "text";
    classNames?: string
}

const FormInput: FC<FormInputProps> = ({name, value, translate, error, handleChange,validationId, classNames, type = "text"}) => {
    return (
        <Form.Group controlId={`validationFormik${validationId ? validationId : ""}`}
                    className={classNames ? classNames : ""}>
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