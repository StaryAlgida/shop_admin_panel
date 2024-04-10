import {Button} from "react-bootstrap";
import {FC} from "react";

interface ErrorPageParams {
  errorText?: string;
  status?: string | number;
}

const ErrorPage: FC<ErrorPageParams> = ({errorText = "not found", status = 404}) => {
  const goBack = () => {
    window.history.back()
  }
  return (
      <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
        <h1>Oops!</h1>
        <h3>{status} {errorText}</h3>
        <p>
          <Button onClick={goBack}>Go back</Button>
        </p>
      </div>
  )
}

export default ErrorPage