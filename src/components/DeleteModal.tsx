import {Button, Modal} from "react-bootstrap";

export default function DeleteModal({showModal, handleCloseModal, handleDelete, item}: {
    showModal: boolean,
    handleCloseModal: () => void,
    handleDelete: (id: string) => void,
    item: {
        title: string,
        id: string
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
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete <b>{item.title}</b>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        No
                    </Button>
                    <Button variant="success" onClick={() => handleDelete(item.id)}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}