import { FaPlus } from 'react-icons/fa'
import AddNewModal from '@/app/components/modals/AddNewBallotModal'
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react'
import { HiBars2 } from "react-icons/hi2";
import { SlOptionsVertical } from "react-icons/sl";

export default function Ballot() {
    const ballots = ['President', 'Organizer'].map((x) => (
        <Contestant name={x} />
    ))
    return (
        <div>
            {true &&
                <p className="text-center text-muted mt-3">You have no ballots yet. Create your first ballot now!</p>
            }
            <AddBallot />
            <div className='mt-5'>
                {ballots}
            </div>
        </div>
    )
}

function AddBallot() {
    const [show, setShow] = useState(false)
    const handleClick = () => {
        setShow(!show)
    }
    return (
        <div className='mt-3'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className="d-flex px-3 rounded-1 justify-content-between align-items-center" style={{ backgroundColor: "#E9F2F2" }}>
                            <p className="m-0">Add new ballot</p>
                            <button onClick={() => setShow(true)} type="button" className="btn p-0 text-dark text-light m-0" aria-label="Add new project"><FaPlus /></button>
                        </div>
                    </div>
                </div>
            </div>
            <AddNewModal show={show} onHide={handleClick} />
        </div>
    )
}

function Contestant({ name }) {
    return (
        <div className='row justify-content-center'>
            <div className='d-flex justify-content-between align-content-center col-lg-6 col-md-6 col-sm-12'>
                <div className='d-flex'>
                    <HiBars2 />
                    <p className="ms-3">{name}</p>
                </div>
                <Dropdown>
                    <Dropdown.Toggle className='m-0' variant="light" id="dropdown-basic">
                        <SlOptionsVertical />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

function BallotOpts() {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
                Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}