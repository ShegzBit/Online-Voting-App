import Button from "../Button";
import { Modal } from "react-bootstrap";

export default function ProjectCreatedFailed({ show, onHide }) {
    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Project Creation Failed</Modal.Title>
                </Modal.Header>
                <div className="modal-body">
                    <h1 className="mb-4" style={{ fontSize: "1.5rem" }}>Oops! 🤦‍♂️ Something went wrong</h1>
                    <p>Project creation failed. Please try again later.</p>
                </div>
                <div className="modal-footer">
                    <Button cb={onHide} text="Close" classNames="px-5 w-100" />
                </div>
            </Modal>
        </>
    )
}