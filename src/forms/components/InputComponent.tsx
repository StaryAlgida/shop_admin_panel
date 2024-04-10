import {Col, Form} from "react-bootstrap";
import {FC, useContext} from "react";
import {FormValuesContext} from "../../context/FormContext.tsx";

interface InputComponentProps {
  sizeAndLabel:{
    label: string
    fieldSize: number;
  }
  basicConfiguration: {
    type: string;
    name: string;
    placeholder?: string;
    step?: string;
  }
  value: string;
  touched: boolean;
  error: null | string
}

const InputComponent: FC<InputComponentProps> = (props) => {

  const {sizeAndLabel, basicConfiguration, value, touched, error} = props
  const {handleChange} = useContext(FormValuesContext)

  return (
      <Form.Group as={Col} md={`${sizeAndLabel.fieldSize}`} controlId={`validation${basicConfiguration.name}`}>
        <Form.Label>{sizeAndLabel.label}</Form.Label>
        <Form.Control
            {...basicConfiguration}
            value={value}
            isInvalid={touched && !!error}
            isValid={touched && !error}
            // disabled={false}
            onChange={handleChange}
        />
        <Form.Control.Feedback
            type={!error ? "valid" : "invalid"}>{error}
        </Form.Control.Feedback>
      </Form.Group>
  )
}

export default InputComponent