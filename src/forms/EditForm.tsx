import {useParams} from "react-router-dom";
import useSingleAdvert from "../hooks/useSingleAdvert.tsx";
import useCategory from "../hooks/useCategory.tsx";
import {Button, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import FormState, {defaultData} from "../interfaces/formInterface.ts";
import EditFormSkeleton from "./skeleton/EditFormSkeleton.tsx";
import ModalComponent from "../components/ModalComponent.tsx";
import {Product} from "../interfaces/prductInterface.ts";
import {useToaster} from "../hooks/useToaster.tsx";
import axios from "axios";
import InputComponent from "./components/InputComponent.tsx";
import SelectComponent from "./components/SelectComponent.tsx";
import TextareaComponent from "./components/TextareaComponent.tsx";
import formValidation from "./validations/formValidation.ts";
import checkData from "./validations/checkData.ts";

export default function EditForm() {
    const {advertId} = useParams()
    const [data, isLoadingAdverts, isAdvertError] = useSingleAdvert(advertId)
    const [categories, isLoadingCategory, isCategoryError] = useCategory()
    const [formData, setFormData] = useState<FormState>({...defaultData})
    const [validated, setValidated] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [dataToSend, setDataToSend] = useState<Product>()
    const handleCloseModal = () => setShowModal(false)
    const {show} = useToaster()
    const handleOpenModal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (checkData(formData)) {
            const price = parseFloat(formData.price.value).toString()
            const copy: Product = {
                id: data.id,
                title: formData.title.value,
                price: price,
                description: formData.description.value,
                seller: data.seller,
                image: formData.image.value,
                sellerPhone: formData.sellerPhone.value,
                canNegotiate: formData.canNegotiate.value === "true",
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
        } finally {
            handleCloseModal()
        }
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
    }, [data]);


    const handleOnChange = (value: string, field: string) => {
        const copy: FormState = {...formData}
        const [status, message] = formValidation(value, field)

        if (status !== null) {
            copy[field].value = value
            copy[field].correct = status
            copy[field].message = message

            setFormData({...copy})
        } else {
            show({title: `${message}`, description: `${message}`, bg: "danger"})
            console.log(`Error ${message}: ${field}`)
        }
        if (!validated) {
            setValidated(true)
        }
    }
    return (
        <>
            {isLoadingAdverts || isLoadingCategory ? <EditFormSkeleton/> :
                <Form noValidate
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
                                    placeholder: "Product title",
                                    isError: isAdvertError || isCategoryError,
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
                                    step: "0.01",
                                    isError: isAdvertError || isCategoryError,
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
                                    isError: isAdvertError || isCategoryError,
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
                            inputConfig={{
                                sizeOfField: 6,
                                title: "Image",
                                name: "image",
                                type: "text",
                                placeholder: "Image URL",
                                isError: isAdvertError || isCategoryError,
                            }}
                        />
                        <SelectComponent
                            formData={{
                                value: formData.canNegotiate.value,
                                correct: formData.canNegotiate.correct,
                                message: formData.canNegotiate.message
                            }}
                            handleOnChange={handleOnChange}
                            inputConfig={{
                                sizeOfField: 3,
                                title: "Can by negotiate",
                                name: "canNegotiate",
                                isError: isAdvertError || isCategoryError,
                            }}
                            data={[
                                {text: "Yes/No", value: ''},
                                {text: "Yes", value: "true"},
                                {text: "No", value: "false"}
                            ]}
                        />
                        <SelectComponent
                            formData={{
                                value: formData.categoryId.value,
                                correct: formData.categoryId.correct,
                                message: formData.categoryId.message
                            }}
                            handleOnChange={handleOnChange}
                            inputConfig={{
                                sizeOfField: 3,
                                title: "Category",
                                name: "categoryId",
                                isError: isAdvertError || isCategoryError,
                            }}
                            data={[
                                {text: "Select category", value: '-1'},
                                ...categories.map((category) => (
                                    {text: category.title, value: category.id}))
                            ]}
                        />
                    </Row>
                    <Row>
                        <TextareaComponent
                            formData={{
                                value: formData.description.value,
                                correct: formData.description.correct,
                                message: formData.description.message
                            }}
                            handleOnChange={handleOnChange}
                            inputConfig={{
                                title: "Description",
                                name: "description",
                                placeholder: "Your description",
                                rows: 3,
                                isError: isAdvertError || isCategoryError,
                            }}
                        />
                    </Row>
                    {isAdvertError || isCategoryError ?
                        <Button disabled>Submit form</Button> :
                        <>
                            <Button type="submit">Submit form</Button>
                            <ModalComponent
                                showModal={showModal}
                                handleCloseModal={handleCloseModal}
                                handleAction={handleEdit}
                                item={{
                                    itemId: `${data.id}`,
                                    itemTitle: `${data.title}`,
                                    infoTitle: "EditForm",
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