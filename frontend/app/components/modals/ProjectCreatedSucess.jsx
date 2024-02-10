import Button from "../Button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Modal } from "react-bootstrap"

export default function ProjectCreated({ show, onHide }) {
    const [isOpen, setIsOpen] = useState(show)
    const router = useRouter()
    const handleClick = () => {
        // onHide()
        router.push("/elections/1")
    }
    return (
        <>
            <Modal show={show}>
                {/* <div className="modal-dialog">
                    <div className="modal-content"> */}
                    {/* <Modal.Header> */}
                        {/* <Modal.Title>New Project</Modal.Title> */}
                    {/* </Modal.Header> */}
                        <div className="modal-body">
                            <h1 className="mb-4" style={{ fontSize: "1.5rem" }}>Hooray! 🎉 Your project was created</h1>
                            <p>Take it to the next level by adding additional voting options. Engage your audience and make your project shine!</p>
                        </div>
                        <div className="modal-footer">
                            {/* <button onClick={handleClick} type="button" className="btn btn-outline-secondary px-5">Finish setting up</button> */}
                            <Button cb={handleClick} text="Finish setting up" classNames="px-5 w-100" />
                        </div>
                    {/* </div>
                </div> */}
            </Modal>
        </>
    )
}