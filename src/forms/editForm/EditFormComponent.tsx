import {useParams} from "react-router-dom";
import useSingleAdvert from "../../hooks/useSingleAdvert.tsx";
import useCategory from "../../hooks/useCategory.tsx";
import {Button, Col, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import FormState, {defaultData} from "../../interfaces/formInterface.ts";
import EditFormSkeleton from "./skeleton/EditFormSkeleton.tsx";
import ModalComponent from "../../components/ModalComponent.tsx";
import {Product} from "../../interfaces/prductInterface.ts";
import {useToaster} from "../../hooks/useToaster.tsx";
import axios from "axios";
import DisableFrom from "./DisableFrom.tsx";
import InputComponent from "./components/InputComponent.tsx";

export default function EditFormComponent() {
    const {advertId} = useParams()
    const [data, isLoadingAdverts, isAdvertError] = useSingleAdvert(advertId)
    const [categories, isLoadingCategory, isCategoryError] = useCategory()
    const [formData, setFormData] = useState<FormState>({...defaultData})
    const [validated, setValidated] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [dataToSend, setDataToSend] = useState<Product>()
    const handleCloseModal = () => setShowModal(false)
    const {show} = useToaster()
    const checkData = (): boolean => {
        for (const key in formData) {
            if (!formData[key].correct) {
                return false
            }
        }

        return true
    }
    const handleOpenModal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (checkData()) {
            const price = parseFloat(formData.price.value).toString()
            const copy: Product = {
                id: data.id,
                title: formData.title.value,
                price: price,
                description: formData.description.value,
                seller: data.seller,
                image: formData.image.value,
                sellerPhone: formData.sellerPhone.value,
                canNegotiate: Boolean(formData.canNegotiate.value),
                createdOn: new Date().toISOString(),
                categoryId: formData.categoryId.value
            }
            setDataToSend({...copy})
            setShowModal(true)
        } else {
            show({title: "Wrong data", description: "You try to send wrong data!!!", bg: "danger"})
        }
    }

    const handleEdit = async (id: string) => {
        try {
            const response = await axios.patch(`/adverts/${id}`, dataToSend)
            if (response.status === 200) {
                show({
                    title: "Success",
                    description: `Product ${formData.title.value} edited successfully`,
                    bg: "success"
                })
            }
        } catch
            (error) {
            if (axios.isAxiosError(error)) {
                show({title: `${error.status}`, description: error.message, bg: "danger"})
            }
        }
        setShowModal(false)
    }

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
        const priceRegex = /\.\d{1,2}$/
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
                if (!priceRegex.test(value)) {
                    return [false, "Bad price format. Correct is 0.00"]
                }
                break
            case "image":
                console.log('title')
                break
            case "canNegotiate":
                if (!negotiatedArray.includes(value)) {
                    return [false, "Wrong choice. Choose between true or false"]
                }
                break
            case "categoryId":
                if (isNaN(parseInt(value)) || parseInt(value) > 9 || parseInt(value) < 0 || value === '') {
                    return [false, "Wrong choice"]
                }
                break
            case "description":
                if (value.length < 10) {
                    return [false, "Description is too short"]
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
            {isLoadingAdverts || isLoadingCategory ? <EditFormSkeleton/> :
                isAdvertError || isCategoryError ? <DisableFrom/> :
                    <Form noValidate
                          validated={validated}
                          onSubmit={handleOpenModal}
                    >
                        <Row className="mb-3">
                            <InputComponent
                                formData={{
                                    value: formData.title.value,
                                    correct: formData.title.correct,
                                    message: formData.title.message
                                }}
                                handleOnChange={handleOnChange}
                                inputConfig={
                                    {
                                        sizeOfField: 6,
                                        title: "Title",
                                        name: "title",
                                        type: "text",
                                        placeholder: "Product title"
                                    }
                                }
                            />
                            <InputComponent
                                formData={{
                                    value: formData.price.value,
                                    correct: formData.price.correct,
                                    message: formData.price.message
                                }}
                                handleOnChange={handleOnChange}
                                inputConfig={
                                    {
                                        sizeOfField: 3,
                                        title: "Price",
                                        name: "price",
                                        type: "number",
                                        placeholder: "0.00",
                                        step:"0.01"
                                    }
                                }
                            />
                            <InputComponent
                                formData={{
                                    value: formData.sellerPhone.value,
                                    correct: formData.sellerPhone.correct,
                                    message: formData.sellerPhone.message
                                }}
                                handleOnChange={handleOnChange}
                                inputConfig={
                                    {
                                        sizeOfField: 3,
                                        title: "Seller Phone",
                                        name: "sellerPhone",
                                        type: "text",
                                        placeholder: "+48 333 222 111",
                                    }
                                }
                            />
                        </Row>
                        <Row className="mb-3">
                            <InputComponent
                                formData={{
                                    value: formData.image.value,
                                    correct: formData.image.correct,
                                    message: formData.image.message
                                }}
                                handleOnChange={handleOnChange}
                                inputConfig={
                                    {
                                        sizeOfField: 6,
                                        title: "Image",
                                        name: "image",
                                        type: "text",
                                        placeholder: "Image URL",
                                    }
                                }
                            />
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
                                <Form.Control.Feedback type={formData.categoryId.correct ? "valid" : "invalid"}>
                                    {formData.categoryId.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    name="description"
                                    value={formData.description.value}
                                    isInvalid={!formData.description.correct}
                                    onChange={(e) => handleOnChange(e.currentTarget.value, e.currentTarget.name)}
                                    as="textarea"
                                    rows={3}
                                />
                                <Form.Control.Feedback type={formData.description.correct ? "valid" : "invalid"}>
                                    {formData.description.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        {isAdvertError || isCategoryError ?
                            <Button disabled type="submit">Submit form</Button> :
                            <>
                                <Button type="submit">Submit form</Button>
                                <ModalComponent
                                    showModal={showModal}
                                    handleCloseModal={handleCloseModal}
                                    handleAction={handleEdit}
                                    item={{
                                        itemId: `${data.id}`,
                                        itemTitle: `${data.title}`,
                                        infoTitle: "EditFormComponent",
                                        infoDescription: "Are you sure you want to edit"
                                    }}
                                />
                            </>
                        }
                    </Form>
            }
        </>
    )
}