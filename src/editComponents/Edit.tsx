import {useParams} from "react-router-dom";
import useSingleAdvert from "../hooks/useSingleAdvert.tsx";
import useCategory from "../hooks/useCategory.tsx";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import FormState, {defaultData} from "../interfaces/formInterface.ts";

export default function Edit() {
    // TODO: Make loading for advert data and category
    // TODO: Sending data to server
    const {advertId} = useParams()
    const [data, isLoadingAdverts, isAdvertError] = useSingleAdvert(advertId)
    const [categories, isLoadingCategory, isCategoryError] = useCategory()
    const [formData, setFormData] = useState<FormState>({...defaultData})
    const [validated, setValidated] = useState<boolean>(false)
    useEffect(() => {
        const setUpForm = () => {
            const copy = {...defaultData}
            for (const key in copy) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {

                    copy[key].value = `${data[key]}`
                    copy[key].correct = true
                    copy[key].message = "Looks good"
                }
            }
            setFormData({...copy})
        }
        setUpForm()
        // console.log(data)
    }, [data]);

    const validateData = (value: string, field: string): [boolean, string] => {
        const phoneRegex = /^\+\d{2}(?: \d{3}){3}$/
        const negotiatedArray = ["true", "false"]


        if (!value.length) {
            return [false, "This field is required"]
        }

        console.log(typeof value)
        switch (field) {
            case "title":
                if (value.length < 5) {
                    return [false, "Title is too short"]
                }
                if (value.length > 100) {
                    return [false, "Title is too long"]
                }
                break;
            case "sellerPhone":
                if (!phoneRegex.test(value)) {
                    return [false, "Wrong phone number format. Should by +48111222333 or +48 111 222 333"]
                }
                break
            case "price":
                if (isNaN(parseFloat(value))) {
                    return [false, "Wrong price"]
                }
                if (parseFloat(value) <= 0) {
                    return [false, "Price is too low"]
                }
                break
            case "image":
                console.log('title')
                break
            case "canNegotiate":
                if (!negotiatedArray.includes(value)) {
                    return [false, "Wrong choice. Choose between true or false."]
                }
                break
            case "categoryId":
                if (!parseInt(value) || parseInt(value) > 9 || parseInt(value) < 0 || value === '') {
                    return [false, "Wrong choice."]
                }
                break
            default:
                return [false, 'Error. You done something odd.']
        }

        return [true, "Looks good!"]
    }

    const handleOnChange = (value: string, field: string) => {
        const copy: FormState = {...formData}
        const [status, message] = validateData(value, field)

        if (status !== null) {
            copy[field].value = value
            copy[field].correct = status
            copy[field].message = message

            setFormData({...copy})
        } else {
            console.log(`Error ${message}: ${field}`)
        }
        if (!validated) {
            setValidated(true)
        }
    }

    return (
        <>
            <Form noValidate
                  validated={validated}
                // onSubmit={handleSubmit}
            >
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="title"
                            placeholder="Product title"
                            defaultValue={formData.title.value}
                            isInvalid={!formData.title.correct}
                            onChange={(e) => handleOnChange(e.currentTarget.value, e.currentTarget.name)}
                        />
                        <Form.Control.Feedback
                            type={formData.title.correct ? "valid" : "invalid"}>{formData.title.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom02">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            step="0.01"
                            name="price"
                            placeholder="0.00"
                            defaultValue={formData.price.value}
                            isInvalid={!formData.price.correct}
                            onChange={(e) => handleOnChange(e.currentTarget.value, e.currentTarget.name)}
                        />
                        <Form.Control.Feedback
                            type={formData.price.correct ? "valid" : "invalid"}>{formData.price.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom03">
                        <Form.Label>Seller Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="sellerPhone"
                            placeholder="+48 333 222 111"
                            defaultValue={formData.sellerPhone.value}
                            onChange={(e) => handleOnChange(e.currentTarget.value, e.currentTarget.name)}
                            isInvalid={!formData.sellerPhone.correct}
                            required/>
                        <Form.Control.Feedback
                            type={formData.sellerPhone.correct ? "valid" : "invalid"}>{formData.sellerPhone.message}</Form.Control.Feedback>
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
                                defaultValue={formData.image.value}
                                isInvalid={!formData.image.correct}
                                onChange={(e) => handleOnChange(e.currentTarget.value, e.currentTarget.name)}
                                required
                            />
                            <Form.Control.Feedback
                                type={formData.image.correct ? "valid" : "invalid"}>{formData.image.message}</Form.Control.Feedback>

                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Can by negotiate</Form.Label>
                        <Form.Select
                            // type="text"
                            name="canNegotiate"
                            value={formData.canNegotiate.value}
                            isInvalid={!formData.canNegotiate.correct}
                            onChange={(e) => handleOnChange(e.currentTarget.value, e.currentTarget.name)}
                            required
                        >
                            <option>Yes/No</option>
                            <option value={'true'}>Yes</option>
                            <option value={'false'}>No</option>
                        </Form.Select>
                        <Form.Control.Feedback
                            type={formData.canNegotiate.correct ? "valid" : "invalid"}>{formData.canNegotiate.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="categoryId"
                            value={formData.categoryId.value}
                            isInvalid={!formData.categoryId.correct}
                            onChange={(e) => handleOnChange(e.currentTarget.value, e.currentTarget.name)}
                            required
                        >
                            <option>Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.title}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback
                            type={formData.categoryId.correct ? "valid" : "invalid"}>{formData.categoryId.message}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                {isAdvertError || isCategoryError ?
                    <Button disabled type="submit">Submit form</Button> :
                    <Button type="submit">Submit form</Button>
                }
            </Form>
        </>
    )
}