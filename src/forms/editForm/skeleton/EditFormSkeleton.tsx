import {Button, Col, Form, Placeholder, Row, Spinner} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";

export default function EditFormSkeleton() {

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Title</Form.Label>
                    <Placeholder as={InputGroupText} animation="glow">
                        <Placeholder xs={8} size="lg" className="mt-1 mb-1"/>
                    </Placeholder>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>Price</Form.Label>
                    <Placeholder as={InputGroupText} animation="glow">
                        <Placeholder xs={5} size="lg" className="mt-1 mb-1"/>
                    </Placeholder>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                    <Form.Label>Seller Phone</Form.Label>
                    <Placeholder as={InputGroupText} animation="glow">
                        <Placeholder xs={9} size="lg" className="mt-1 mb-1"/>
                    </Placeholder>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6  " controlId="validationCustomUsername">
                    <Form.Label>Image</Form.Label>
                    <Placeholder as={InputGroupText} animation="glow">
                        <Placeholder xs={12} size="lg" className="mt-1 mb-1"/>
                    </Placeholder>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>Can by negotiate</Form.Label>
                    <Placeholder as={InputGroupText} animation="glow">
                        <Placeholder xs={4} size="lg" className="mt-1 mb-1"/>
                    </Placeholder>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Category</Form.Label>
                    <Placeholder as={InputGroupText} animation="glow">
                        <Placeholder xs={7} size="lg" className="mt-1 mb-1"/>
                    </Placeholder>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Placeholder as={InputGroupText} animation="glow">
                        <Placeholder xs={12} size="lg" as="textarea" rows={3} className="mt-1 mb-1"/>
                    </Placeholder>
                </Form.Group>
            </Row>
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-1"
                />
                Loading...
            </Button>
        </Form>
    )
}