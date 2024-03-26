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
        sizeOfField?: number;
        title: string;
        name: string;
        placeholder: string;
        rows: number;
        isError: boolean;
    }
}

const TextareaComponent: FC<InputComponentProps> = ({formData, handleOnChange, inputConfig}) => {
    return (
        <Form.Group as={Col} className="mb-3" md={`${inputConfig.sizeOfField}`}
                    controlId={`textarea${inputConfig.name}`}>
            <Form.Label>{inputConfig.title}</Form.Label>
            <Form.Control
                name={inputConfig.name}
                value={inputConfig.isError ? "Error" : formData.value}
                isInvalid={!formData.correct}
                isValid={formData.correct}
                placeholder={inputConfig.placeholder}
                disabled={inputConfig.isError}
                onChange={(e) => handleOnChange(e.currentTarget.value, e.currentTarget.name)}
                as="textarea"
                rows={inputConfig.rows}
            />
            <Form.Control.Feedback type={formData.correct ? "valid" : "invalid"}>
                {formData.message}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default TextareaComponent