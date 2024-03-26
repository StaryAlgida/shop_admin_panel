import {Col, Form} from "react-bootstrap";
import {FC} from "react";

interface SelectData {
    text: string;
    value: string;
}

interface SelectComponentProps {
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
        isError: boolean;
    }
    data: SelectData[];
}

const SelectComponent: FC<SelectComponentProps> = ({formData, handleOnChange, inputConfig, data}) => {
    return (
        <Form.Group as={Col} md={`${inputConfig.sizeOfField}`} controlId={`validation${inputConfig.name}`}>
            <Form.Label>{inputConfig.title}</Form.Label>
            <Form.Select
                name={inputConfig.name}
                value={formData.value}
                isInvalid={!formData.correct}
                isValid={formData.correct}
                disabled={inputConfig.isError}
                onChange={(e) => handleOnChange(e.currentTarget.value, e.currentTarget.name)}
            >
                {inputConfig.isError ? <option>Error</option> :
                    data.map((item) => (
                        <option
                            key={`select${inputConfig.name}${item.value}`}
                            value={item.value}
                        >
                            {item.text}
                        </option>
                    ))
                }
            </Form.Select>
            <Form.Control.Feedback
                type={formData.correct ? "valid" : "invalid"}>{formData.message}</Form.Control.Feedback>
        </Form.Group>
    )
}

export default SelectComponent