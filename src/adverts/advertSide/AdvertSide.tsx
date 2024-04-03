import {useParams} from "react-router-dom";
import {ReactNode, useState} from "react";
import axios from "axios";
import {useToaster} from "../../hooks/useToaster.tsx";
import {Button, Col, Container, Image, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import AdvertCarousel from "./components/AdvertCarousel.tsx";
import ModalComponent from "../../components/ModalComponent.tsx";
import useSingleAdvert from "../../hooks/useSingleAdvert.tsx";
import {LinkContainer} from "react-router-bootstrap";
import canNegotiated from "/canNegotiated.svg"
import noNegotiated from "/noNegotiated.svg"
import ErrorPage from "../../components/ErrorPage.tsx";


const Link = ({id, children, title}: { id: string, children: ReactNode, title: string }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
        <a>{children}</a>
    </OverlayTrigger>
);

export default function AdvertSide() {
    const {show} = useToaster()
    const {advertId} = useParams()

    const [showModal, setShowModal] = useState(false);

    const handleCloseDeleteModal = () => setShowModal(false)
    const handleOpenDeleteModal = () => setShowModal(true)

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/adverts/${id}`)
            console.log(response)
            show({title: `Success`, description: `Item with id ${id} deleted successfully!`, bg: "success"})
            handleCloseDeleteModal()
            window.history.back()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                show({title: `Error ${error.code}`, description: error.message, bg: "danger"})
            }
        }
    }

    const [data, isLoading, isError, errorMessage] = useSingleAdvert(advertId)

    return (
        <>
            {isLoading ? "Loading" :
                isError ? <ErrorPage status={''} errorText={errorMessage}/> :
                <Container className='mt-2'>
                    {data.title && data.id ?
                        <Row className="mb-3">
                            <ModalComponent
                                showModal={showModal}
                                handleCloseModal={handleCloseDeleteModal}
                                handleAction={handleDelete}
                                item={{
                                    itemId: data.id,
                                    itemTitle: data.title,
                                    infoTitle: "Delete",
                                    infoDescription: "Are you sure you want to delete "
                                }}
                            />
                            <Col>
                                <LinkContainer to={`/adverts/${advertId}/edit`}>
                                    <Button variant="success" className="me-2">Edit</Button>
                                </LinkContainer>
                                <Button variant="danger" onClick={handleOpenDeleteModal}>Delete</Button>
                            </Col>
                        </Row>
                        : ''}
                    <Row>
                        <Col lg={6}>
                            <AdvertCarousel/>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <h1>{data.title}</h1>
                            <div className='d-flex'>
                                <h3 className='text-secondary'>{data.price} PLN</h3>
                                <span className='ms-3 mt-1'>{data.canNegotiate ?
                                    <Link title='Can be negotiated' id='t-1'>
                                        <Image src={canNegotiated}/>
                                    </Link> :
                                    <Link title='Cannot be negotiated' id='t-2'>
                                    <Image src={noNegotiated}/>
                                    </Link>}
                            </span>
                            </div>
                            <div className='d-flex flex-column'>
                                <span className='fs-2'>Seller: {data.seller}</span>
                                <Button className='mt-3' variant="primary" disabled>Buy</Button>
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <p>Phone: <span className='fw-bold'>{data.sellerPhone}</span></p>
                                <p>Created: <span
                                    className='fw-bold'>{data.createdOn ? data.createdOn.split('T')[0] : ''}</span></p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <h5 className='mt-3'>Description</h5>
                        <span>{data.description}</span>
                    </Row>
                </Container>
            }
        </>
    )
}