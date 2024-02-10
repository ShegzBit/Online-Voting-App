import Button from "../Button"
import ProjectCreated from "./ProjectCreatedSucess"
import { useState } from "react"
import { Modal } from "react-bootstrap"


export default function ProjectDetails({ show, onHide }) {
    const [showModal, setShowModal] = useState(false)

    const handleShow = (key) => {
        // if (key === 'open') {
        //     setShowModal(true)
        // } else {
        //     setShowModal(false)
        // }
        onHide()
        setShowModal(!showModal)
    }
    return (
        <>
            <Modal show={show} onHide={onHide}>
                {/* <div className="modal-dialog">
                    <div className="modal-content"> */}
                    <Modal.Header closeButton>
                        <Modal.Title>New Project</Modal.Title>
                    </Modal.Header>
                        <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="projectName" className="form-label">Enter project name</label>
                            <input type="text" className="form-control rounded-4" style={{ height: "56px"}} id="projectName" placeholder="Enter Project name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="projectDesc" className="form-label">Enter project description</label>
                            <textarea className="form-control rounded-3" id="projectDesc" rows="3" placeholder="A brief overview of the project"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="startDate" className="form-label">Enter start date</label>
                            <input type="date" className="form-control" id="startDate" rows="3"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="endDate" className="form-label">Enter End date</label>
                            <input type="date" className="form-control" id="endDate" rows="3"></input>
                        </div>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-outline-secondary px-5" data-bs-dismiss="modal">Close</button> */}
                            <button onClick={handleShow} type="button" className="btn btn-gradient btn-primary w-100" aria-label="Create project">Continue</button>
                        </div>
                    {/* </div>
                </div> */}
            </Modal>
            <ProjectCreated show={showModal} onHide={handleShow} />
        </>
    )
}
