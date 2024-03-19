import {useNavigate, useParams} from "react-router-dom";
import {ReactNode, useState} from "react";
import axios from "axios";
import {useToaster} from "../../hooks/useToaster.tsx";
import {Button, Col, Container, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import AdvertSideCarousel from "./AdvertSideCarousel.tsx";
import ModalComponent from "../../components/ModalComponent.tsx";
import useSingleAdvert from "../../hooks/useSingleAdvert.tsx";
import {LinkContainer} from "react-router-bootstrap";


const Link = ({id, children, title}: { id: string, children: ReactNode, title: string }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
        <a>{children}</a>
    </OverlayTrigger>
);

export default function AdvertSide() {
    const {show} = useToaster()
    const nav = useNavigate()
    const {advertId} = useParams()

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false)
    const handleOpenModal = () => setShowModal(true)

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/adverts/${id}`)
            console.log(response)
            show({title: `Success`, description: `Item with id ${id} deleted successfully!`, bg: "success"})
            handleCloseModal()
            nav('/')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                show({title: `Error ${error.code}`, description: error.message, bg: "danger"})
            }
        }
    }

    const [data, isLoading] = useSingleAdvert(advertId)

    return (
        <>
            {isLoading ? "Loading" :
                <Container className='mt-2'>
                    {data.title && data.id ?
                        <Row className="mb-3">
                            <ModalComponent
                                showModal={showModal}
                                handleCloseModal={handleCloseModal}
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
                                <Button variant="danger" onClick={handleOpenModal}>Delete</Button>
                            </Col>
                        </Row>
                        : ''}
                    <Row>
                        <Col lg={6}>
                            <AdvertSideCarousel/>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <h1>{data.title}</h1>
                            <div className='d-flex'>
                                <h3 className='text-secondary'>{data.price} PLN</h3>
                                <span className='ms-3 mt-1'>{data.canNegotiate ?
                                    <Link title='Can be negotiated' id='t-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="currentColor" className="negotiation-svg-true " viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                    </Link> :
                                    <Link title='Cannot be negotiated' id='t-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="currentColor" className="negotiation-svg-false" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                        </svg>
                                    </Link>}
                            </span>
                            </div>
                            <div className='d-flex flex-column'>
                                <span className='fs-2'>Seller: {data.seller}</span>
                                <Button className='mt-3' variant="primary">Buy</Button>
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