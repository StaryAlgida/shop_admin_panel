import useSingleAdvert from "../hooks/useSingleAdvert.tsx";
import {useParams} from "react-router-dom";
import useCategory from "../hooks/useCategory.tsx";
import {FormValuesContext} from "../context/FormContext.tsx";
import {Button, Form, Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import InputComponent from "./components/InputComponent.tsx";
import SelectComponent from "./components/SelectComponent.tsx";
import TextareaComponent from "./components/TextareaComponent.tsx";
import ModalComponent from "../components/ModalComponent.tsx";
import checkIfError from "./validations/checkData.ts";
import {useToaster} from "../hooks/useToaster.tsx";


export default function EditForm() {
  const {advertId} = useParams()
  const {singleAdvertData, isAdvertLoading} = useSingleAdvert(advertId)
  const {categoryData,} = useCategory()
  const {values, touched, error, iniValues, handleSubmit} = useContext(FormValuesContext)
  const {show} = useToaster()
  const [showModal, setShowModal] = useState<boolean>(false)
  const handleCloseModal = () => setShowModal(false)
  const handleOpenModal = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    if(checkIfError(error)){
      show({title: "Wrong data", description: "You try to send wrong data!", bg: "danger"})
    }
    else{
      setShowModal(true)
    }
  }

  const submitEditData = () => {
    handleSubmit(`/adverts/${advertId}`, values, 'patch')
  }

  useEffect(() => {
    if (singleAdvertData && !isAdvertLoading) {
      const {id, canNegotiate, ...rest} = singleAdvertData
      iniValues({canNegotiate: `${canNegotiate}`, ...rest})
    }
  }, [iniValues, isAdvertLoading, singleAdvertData]);
  return (
      <Form noValidate onSubmit={handleOpenModal}>
        <Row className="mb-3">
          <InputComponent
              sizeAndLabel={{label: "Title", fieldSize: 6}}
              basicConfiguration={{
                type: "text",
                name: "title",
                placeholder: "Product title",
              }}
              value={values.title}
              touched={touched.title}
              error={error.title}/>
          <InputComponent
              sizeAndLabel={{label: "Price", fieldSize: 3}}
              basicConfiguration={{
                type: "number",
                name: "price",
                step: '0.1',
                placeholder: "20.30",
              }}
              value={values.price}
              touched={touched.price}
              error={error.price}/>
          <InputComponent
              sizeAndLabel={{label: "Seller phone", fieldSize: 3}}
              basicConfiguration={{
                type: "text",
                name: "sellerPhone",
                placeholder: "+48 333 222 111",
              }}
              value={values.sellerPhone}
              touched={touched.sellerPhone}
              error={error.sellerPhone}/>
        </Row>
        <Row className="mb-3">
          <InputComponent
              sizeAndLabel={{label: "Image", fieldSize: 6}}
              basicConfiguration={{
                type: "text",
                name: "image",
                placeholder: "Image URL",
              }}
              value={values.image}
              touched={touched.image}
              error={error.image}/>
          <SelectComponent
              sizeAndLabel={{label: "Can by negotiate", fieldSize: 3}}
              basicConfiguration={{name: "canNegotiate"}}
              value={values.canNegotiate}
              touched={touched.canNegotiate}
              error={error.canNegotiate}
              data={[{text: "Yes/No", value: ''}, {text: "Yes", value: "true"}, {text: "No", value: "false"}]}/>
          <SelectComponent
              sizeAndLabel={{label: "Category", fieldSize: 3}}
              basicConfiguration={{name: "categoryId"}}
              value={values.categoryId}
              touched={touched.categoryId}
              error={error.categoryId}
              data={[{text: "Select category", value: ''}, ...categoryData.map(category => ({
                text: category.title,
                value: category.id
              }))]}/>
        </Row>
        <Row className="mb-3">
          <TextareaComponent
              sizeAndLabel={{
                label: "Description",
                fieldSize: 12
              }}
              basicConfiguration={{
                name: "description",
                placeholder: "Your description",
                rows: 3
              }}
              value={values.description}
              touched={touched.description}
              error={error.description}/>
        </Row>
        <Button type="submit">Submit</Button>
        <ModalComponent
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            handleAction={submitEditData}
            item={{
              itemId: `${advertId}`,
              itemTitle: `${values.title}`,
              infoTitle: "EditForm",
              infoDescription: "Are you sure you want to edit"
            }}
        />
      </Form>
  )
}