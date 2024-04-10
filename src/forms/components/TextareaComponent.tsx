import {Col, Form} from "react-bootstrap";
import {FC, useContext} from "react";
import {FormValuesContext} from "../../context/FormContext.tsx";

interface TextComponentProps {
  sizeAndLabel: {
    label: string
    fieldSize: number;
  }
  basicConfiguration: {
    name: string;
    placeholder?: string;
    rows?: number;
  }
  value: string;
  touched: boolean;
  error: null | string

}

const TextareaComponent: FC<TextComponentProps> = (props) => {
  const {sizeAndLabel, basicConfiguration, value, touched, error} = props
  const {handleChange} = useContext(FormValuesContext)
  return (
      <Form.Group
          as={Col}
          className="mb-3" md={`${sizeAndLabel.fieldSize}`}
          controlId={`textarea${basicConfiguration.name}`}
      >
        <Form.Label>{sizeAndLabel.label}</Form.Label>
        <Form.Control
            {...basicConfiguration}
            value={value}
            isInvalid={!!error && touched}
            isValid={!error && touched}
            onChange={handleChange}
            as="textarea"
        />
        <Form.Control.Feedback type={!error ? "valid" : "invalid"}>
          {error}
        </Form.Control.Feedback>
      </Form.Group>
  )
}

export default TextareaComponent