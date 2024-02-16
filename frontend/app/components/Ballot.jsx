import { FaPlus } from 'react-icons/fa'
import AddNewBallot from '@/app/components/modals/AddNewBallotModal'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownMenu from 'react-bootstrap/DropdownMenu'
import { useState } from 'react'
import { HiBars2 } from "react-icons/hi2";
import { SlOptionsVertical } from "react-icons/sl";
import ViewBallot from './modals/ViewBallot';
import EditBallot from './modals/ViewBallot'

export default function Ballot() {
    const ballotArr = ['President', 'Organizer']
    const ballots = ballotArr.map((x) => (
        <Contestant name={x} ballot={ballotArr} contestants={['Meeda', 'Mahama']} />
    ))
    return (
        <div>
            {true &&
                <p className="text-center text-muted mt-3">You have no ballots yet. Create your first ballot now!</p>
            }
            <hr />
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
                        <div className="d-flex px-1 rounded-1 justify-content-between align-items-center" style={{ backgroundColor: "#E9F2F2" }}>
                            <p className="m-0">Add new ballot</p>
                            <button onClick={() => setShow(true)} type="button" className="btn p-0 text-dark text-light m-0" aria-label="Add new project"><FaPlus /></button>
                        </div>
                    </div>
                </div>
            </div>
            <AddNewBallot show={show} onHide={handleClick} />
        </div>
    )
}

function Contestant({ name, ballot, contestants }) {
    return (
        <div className='row justify-content-center align-items-center px-1'>
            <div className='d-flex justify-content-between align-content-center col-lg-6 col-md-6 col-sm-12'>
                <div className='d-flex'>
                    <HiBars2 />
                    <p className="ms-3">{name}</p>
                </div>
                <BallotOpts name={name} ballot={ballot} contestants={contestants}  />
            </div>
        </div>
    )
}

function BallotOpts({ name, ballot, contestants }) {
    const [showView, setShowView] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)



    const handleClick = (key) => {
        console.log(showEdit, showView)
        if (key === 'view') {
            return setShowView(!showView)
        } else if (key === 'edit') {
            return setShowEdit(!showEdit)
        } else if (key === 'del') {
            return setShowDelete(!showDelete)
        }
    }

    return (
        <div className="dropdown ms-auto">
            <i className="fas fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"><SlOptionsVertical /></i>
            <ul className="dropdown-menu">
                <li onClick={() => handleClick('edit')} className='border-bottom'>
                    <span className="dropdown-item">
                         Edit
                    </span>
                </li>
                <li onClick={() => handleClick('view')} className='border-bottom'>
                    <span className="dropdown-item">
                        View Ballot
                    </span>
                </li>
                <li>
                    <span className="dropdown-item text-danger">
                        Delete
                    </span>
                </li>
            </ul>
            <ViewBallot name={name} ballot={ballot} show={showView} onHide={handleClick} contestants={contestants} />
            <EditBallot name={name} ballot={ballot} show={showEdit} onHide={handleClick} contestants={contestants} />
        </div>
    );
}