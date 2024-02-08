import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react';
import NewProjectModal from './modals/NewProject';

export default function Fab() {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = (key) => {
        if (key === 'open') {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }

    return (
        <>
            <NewProjectModal isOpen={isOpen} setIsOpen={handleClick} />
            <div className="rounded-circle border-0 position-fixed bottom-0 end-0 me-2 mb-2 shadow-sm">
                <button onClick={() => handleClick('open')} type="button" className="bg-success btn-gradient text-light rounded-circle border-0" aria-label="Add new project" style={{ width: "56px", height: "56px" }}><FaPlus /></button>
            </div>
        </>
    )
}
