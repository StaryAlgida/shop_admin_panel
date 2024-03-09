import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";

export default function EditFormSkeleton() {

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Title</Form.Label>
                    <InputGroupText>
                        <Spinner animation="border" variant="info"/>
                    </InputGroupText>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>Price</Form.Label>
                    <InputGroupText>
                        <Spinner animation="border" variant="info"/>
                    </InputGroupText>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                    <Form.Label>Seller Phone</Form.Label>
                    <InputGroupText>
                        <Spinner animation="border" variant="info"/>
                    </InputGroupText>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6  " controlId="validationCustomUsername">
                    <Form.Label>Image</Form.Label>
                    <InputGroupText>
                        <Spinner animation="border" variant="info"/>
                    </InputGroupText>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>Can by negotiate</Form.Label>
                    <InputGroupText>
                        <Spinner animation="border" variant="info"/>
                    </InputGroupText>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Category</Form.Label>
                    <InputGroupText>
                        <Spinner animation="border" variant="info"/>
                    </InputGroupText>

                </Form.Group>
            </Row>
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
            </Button>
        </Form>
    )
}