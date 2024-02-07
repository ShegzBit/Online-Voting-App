import Button from "../Button"
import ProjectCreated from "./NewProjectCreated"
import { useState } from "react"


export default function ProjectDetails() {
    const [showModal, setShowModal] = useState(false)

    const handleShow = () => {
        setShowModal(true)
    }
    return (
        <>
            <div href="projDetails" className={`modal fade ${showModal ? 'd-none' : ''}`} id="projDetails" tabIndex="-1" aria-labelledby="projDetails" aria-hidden="true" style={{ display: `${showModal ? 'none' : ''}`}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Project Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
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
                            <button onClick={handleShow} type="button" className="btn btn-gradient btn-primary w-100" aria-label="Create project" data-bs-toggle="modal" data-bs-target="#projCreated">Continue</button>
                        </div>
                    </div>
                </div>
            </div>
            <ProjectCreated />
        </>
    )
}
