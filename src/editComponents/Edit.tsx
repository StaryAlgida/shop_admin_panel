import {useParams} from "react-router-dom";
import useSingleAdvert from "../hooks/useSingleAdvert.tsx";
import useCategory from "../hooks/useCategory.tsx";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import FormState, {defaultData} from "../interfaces/formInterface.ts";

export default function Edit() {
    // TODO: Make loading for advert data and category
    const {advertId} = useParams()
    const [data, isLoadingAdverts, isAdvertError] = useSingleAdvert(advertId)
    const [categories, isLoadingCategory, isCategoryError] = useCategory()
    const [formData, setFormData] = useState<FormState>({...defaultData})


    useEffect(() => {
        const setUpForm = () => {
            const copy = {...defaultData}
            for (const key in copy) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {

                    copy[key].value = `${data[key]}`
                    copy[key].correct = true
                }
            }
            setFormData({...copy})
        }
        setUpForm()
    }, [data]);

    return (
        <>
            <Form noValidate
                // validated={validated} onSubmit={handleSubmit}
            >
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Product title"
                            defaultValue={formData.title.value}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom02">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="0.00"
                            defaultValue={formData.price.value}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom03">
                        <Form.Label>Seller Phone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="+48 333 222 111"
                            defaultValue={formData.sellerPhone.value}
                            required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6  " controlId="validationCustomUsername">
                        <Form.Label>Image</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="Image URL"
                                aria-describedby="inputGroupPrepend"
                                defaultValue={formData.image.value}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Can by negotiate</Form.Label>
                        <Form.Select
                            // type="text"
                            name="canNegotiate"
                            value={formData.canNegotiate.value}
                            required
                        >
                            <option>Yes/No</option>
                            <option value={'true'}>Yes</option>
                            <option value={'false'}>No</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            // type="text"
                            name="categoryId"
                            value={formData.categoryId.value}
                            required
                        >
                            <option>Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.title}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Button type="submit">Submit form</Button>
            </Form>
        </>
    )
}