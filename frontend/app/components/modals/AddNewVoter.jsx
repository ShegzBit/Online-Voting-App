import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoMdArrowDropdown } from 'react-icons/io';
import { updateElection, getElection } from '@/lib/electionHelper'


function AddNewVoter({ show, onHide }) {
    const [attribute, setAttribute] = useState("Email")

    const handleAttribute = (name) => {
        setAttribute(name)
    }

    // const fetchElection = async () => {
    //     try {
    //       const election = await getElection()
    //     }
    // }
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Elligible voter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="ballotName" className="form-label">Set attribute</label>
            <div className="dropdown">
                <button className="btn w-100 text-start rounded-4 border border-2 d-flex justify-content-between align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {attribute}
                    <IoMdArrowDropdown />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li onClick={() => handleAttribute("Email")}><a className="dropdown-item" href="#">Email</a></li>
                    <li onClick={() => handleAttribute("Student id")}><a className="dropdown-item" href="#">Student id</a></li>
                </ul>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="ballotLimit" className="form-label">Elligible Voters</label>
            <input type="text" className="form-control rounded-4" style={{ height: "56px" }} id="ballotLimit" placeholder="Enter number of votes" />
          </div>
          <Voters />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" className="btn-sm px-5 py-1 h-75 base-color text-bold" onClick={onHide}>
            Go back
          </Button>
          <Button className="btn-sm btn-gradient btn-primary text-light px-5 py-1 h-75" variant="light" onClick={onHide}>
            Finish
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Voters() {
  return (
    <div>
      <p className='text-bold'>Voters</p>
      <div className="mb-3 d-flex align-items-center gap-4">
        <label htmlFor="contestandName" className="form-label fs-6">1.</label>
        <input type="text" className="form-control rounded-4" style={{ height: "56px" }} id="contestandName" placeholder="Enter name of voter" />
      </div>
      <p className='text-success text-center'>Add new voter</p>
    </div>
  )
}


export default AddNewVoter;