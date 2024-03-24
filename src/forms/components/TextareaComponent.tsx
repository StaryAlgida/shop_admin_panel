import {Form} from "react-bootstrap";
import {FC} from "react";

interface InputComponentProps {
    formData: {
        value: string;
        correct: boolean;
        message: string;
    }
    handleOnChange: (value: string, name: string) => void;
    inputConfig: {
        title: string;
        name: string;
        placeholder: string;
        rows: number;
    }
}

const TextareaComponent: FC<InputComponentProps> = ({formData, handleOnChange, inputConfig}) => {
    return (
        <Form.Group className="mb-3" controlId={`textarea${inputConfig.name}`}>
            <Form.Label>{inputConfig.title}</Form.Label>
            <Form.Control
                name={inputConfig.name}
                value={formData.value}
                isInvalid={!formData.correct}
                placeholder={inputConfig.placeholder}
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