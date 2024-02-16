import { FaPlus } from 'react-icons/fa'
import AddNewVoter from '@/app/components/modals/AddNewVoter'
import { useState } from 'react'

export default function EligibleVoters() {
    return (
        <div>
            {true &&
                <p className="text-center text-muted mt-3">You have no eligible voters yet.</p>
            }
            <hr />
            <AddVoter />
            {/* <div className='mt-5'>
                {ballots}
            </div> */}
        </div>
    )
}

function AddVoter() {
    const [show, setShow] = useState(false)
    const handleClick = () => {
        setShow(!show)
    }
    return (
        <div className='mt-3'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className="d-flex px-1 rounded-1 justify-content-between align-items-center" style={{ backgroundColor: "#E9F2F2" }}>
                            <p className="m-0 p-2">Add new voter</p>
                            <button onClick={() => setShow(true)} type="button" className="btn py-0 text-dark text-light m-0" aria-label="Add new project"><FaPlus /></button>
                        </div>
                    </div>
                </div>
            </div>
            <AddNewVoter show={show} onHide={handleClick} />
        </div>
    )
}