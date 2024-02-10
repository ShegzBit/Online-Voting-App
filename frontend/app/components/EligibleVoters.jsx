import { FaPlus } from 'react-icons/fa'

export default function EligibleVoters() {
    return (
        <div>
            {true &&
                <p className="text-center text-muted mt-3">You have no eligible voters yet.</p>
            }
            <AddVoter />
            <div className='mt-5'>
                {ballots}
            </div>
        </div>
    )
}

function AddVoter() {
    return (
        <div className='mt-3'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className="d-flex px-1 rounded-1 justify-content-between align-items-center" style={{ backgroundColor: "#E9F2F2" }}>
                            <p className="m-0">Add new voter</p>
                            <button onClick={() => setShow(true)} type="button" className="btn p-0 text-dark text-light m-0" aria-label="Add new project"><FaPlus /></button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <AddNewModal show={show} onHide={handleClick} /> */}
        </div>
    )
}