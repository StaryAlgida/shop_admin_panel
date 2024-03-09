import {Button, Modal} from "react-bootstrap";

export default function ModalComponent({showModal, handleCloseModal, handleAction, item, infoText}: {
    showModal: boolean,
    handleCloseModal: () => void,
    handleAction: (id: string) => void,
    item: {
        title: string,
        id: string
    },
    infoText:{
        title:string
        description: string
    }
}) {

    return (
        <>
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{infoText.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {infoText.description} <b>{item.title}</b>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        No
                    </Button>
                    <Button variant="success" onClick={() => handleAction(item.id)}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}