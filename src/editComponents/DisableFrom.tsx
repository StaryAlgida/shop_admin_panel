import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";

export default function DisableFrom() {
    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="title"
                        placeholder="Product title"
                        value="Error"
                        disabled
                    />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        step="0.01"
                        name="price"
                        placeholder="0.00"
                        value="0"
                        disabled
                    />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                    <Form.Label>Seller Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="sellerPhone"
                        placeholder="+48 333 222 111"
                        value="Error"
                        disabled
                        required/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6  " controlId="validationCustomUsername">
                    <Form.Label>Image</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            aria-describedby="inputGroupPrepend"
                            value="Error"
                            disabled
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>Can by negotiate</Form.Label>
                    <Form.Select
                        // type="text"
                        name="canNegotiate"
                        value="Error"
                        disabled
                        required
                    >
                        <option value={'Error'}>Error</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        name="categoryId"
                        value="Error"
                        disabled
                        required
                    >
                        <option value={'Error'}>Error</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required name="description"
                                  value="Error"
                                  as="textarea"
                                  disabled
                                  rows={3}/>
                </Form.Group>
            </Row>
            <Button disabled type="submit">Submit form</Button>
        </Form>
    )
}