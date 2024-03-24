import {Col, Form} from "react-bootstrap";
import {FC} from "react";

interface InputComponentProps {
    formData: {
        value: string;
        correct: boolean;
        message: string;
    }
    handleOnChange: (value: string, name: string) => void;
    inputConfig: {
        sizeOfField: number;
        title: string;
        name: string;
        type: string;
        placeholder: string;
        step?: string;
    }
}

const InputComponent: FC<InputComponentProps> = ({formData, handleOnChange, inputConfig}) => {
    return (
        <Form.Group as={Col} md={`${inputConfig.sizeOfField}`} controlId={`validation${inputConfig.name}`}>
            <Form.Label>{inputConfig.title}</Form.Label>
            <Form.Control
                type={inputConfig.type}
                step={inputConfig.step}
                name={inputConfig.name}
                placeholder={inputConfig.placeholder}
                value={formData.value}
                isInvalid={!formData.correct}
                // readOnly={!formData.correct}
                onChange={(e) => handleOnChange(e.currentTarget.value, e.currentTarget.name)}
            />
            <Form.Control.Feedback
                type={formData.correct ? "valid" : "invalid"}>{formData.message}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default InputComponent