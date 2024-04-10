import {Col, Form} from "react-bootstrap";
import {FC, useContext} from "react";
import {FormValuesContext} from "../../context/FormContext.tsx";

interface SelectData {
  text: string;
  value: string;
}

interface SelectComponentProps {
  sizeAndLabel: {
    label: string
    fieldSize: number;
  }
  basicConfiguration: {
    name: string;
  }
  value: string;
  touched: boolean;
  error: null | string;
  data: SelectData[];
}

const SelectComponent: FC<SelectComponentProps> = (props) => {
  const {sizeAndLabel, basicConfiguration, value, touched, error, data} = props
  const {handleChange} = useContext(FormValuesContext)
  return (
      <Form.Group as={Col} md={`${sizeAndLabel.fieldSize}`} controlId={`validation${basicConfiguration.name}`}>
        <Form.Label>{sizeAndLabel.label}</Form.Label>
        <Form.Select
            name={basicConfiguration.name}
            value={value}
            isInvalid={!!error && touched}
            isValid={!error&& touched}
            onChange={handleChange}
        >
          {
            data.map((item) => (
                <option
                    key={`select${basicConfiguration.name}${item.value}`}
                    value={item.value}
                >
                  {item.text}
                </option>
            ))
          }
        </Form.Select>
        <Form.Control.Feedback
            type={!error ? "valid" : "invalid"}>{error}</Form.Control.Feedback>
      </Form.Group>
  )
}

export default SelectComponent