import {Button, Modal} from "react-bootstrap";

export default function ModalComponent({showModal, handleCloseModal, handleAction, item}: {
    showModal: boolean,
    handleCloseModal: () => void,
    handleAction: (id: string) => void,
    item: {
        itemId: string,
        itemTitle: string,
        infoTitle: string,
        infoDescription: string
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
                    <Modal.Title>{item.infoTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {item.infoDescription} <b>{item.itemTitle}</b>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        No
                    </Button>
                    <Button variant="success" onClick={() => handleAction(item.itemId)}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}