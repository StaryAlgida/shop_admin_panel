import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";

export default function ErrorPage(){

    return(
        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
            <h1>Oops!</h1>
            <h3>404 not found</h3>
            <p>
                <LinkContainer to='/'>
                    <Button>Go back</Button>
                </LinkContainer>
            </p>
        </div>
    )
}