import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react';
import NewProjectModal from './modals/NewProject';

export default function Fab() {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    if (isOpen) {
        return <NewProjectModal />
    }
    return (
        <div className="position-fixed bottom-0 end-0 me-2 mb-2 shadow-sm">
            <button type="button" className="bg-success btn-gradient text-light rounded-circle border-0" aria-label="Add new project" style={{ width: "56px", height: "56px" }} data-bs-toggle="modal" data-bs-target="#newProject"><FaPlus /></button>
        </div>
    )
}
