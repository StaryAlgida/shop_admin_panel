import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";
import {FC} from "react";

interface ErrorPageParams {
    errorText?: string;
    status?: string | number;
}

const ErrorPage: FC<ErrorPageParams> = ({errorText = "not found", status = 404}) => {

    return (
        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
            <h1>Oops!</h1>
            <h3>{status} {errorText}</h3>
            <p>
                <LinkContainer to='/'>
                    <Button>Go back</Button>
                </LinkContainer>
            </p>
        </div>
    )
}

export default ErrorPage