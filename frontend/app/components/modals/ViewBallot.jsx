import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GoTrash } from "react-icons/go";


function ViewBallot({ show, onHide, name, contestants }) {

  return (
    <>
      <Modal show={show} onHide={() => onHide('view')}>
        <Modal.Header closeButton>
          <Modal.Title>Ballot paper</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="ballotName" className="form-label">Ballot name</label>
            {/* <input type="text" className="form-control rounded-4" style={{ height: "56px" }} id="ballotName" placeholder="Enter name of ballot paper" /> */}
            <p>{name}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="ballotLimit" className="form-label">Set a vote limit</label>
            {/* TODO: fetch data and use */}
            <p>1</p>
          </div>
          <Contestants contestants={contestants} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" className="btn-sm px-5 py-1 h-75 base-color text-bold" onClick={() => onHide('view')}>
            Go back
          </Button>
          <Button className="btn-sm btn-gradient btn-primary text-light px-5 py-1 h-75" variant="light" onClick={() => onHide('view')}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Contestants({ contestants })  {
  return (
    <div>
      <p className='text-bold'>Contestants</p>
  <div className="mb-3 d-flex align-items-center gap-4">
    {}
  </div>
        {contestants.map((contestant, index) => (
            <div className='d-flex justify-content-between'>
                <p><span className='me-4'>{index + 1}.</span>{contestant}</p>
                <button className="rounded-circle m-0 p-0 border-0 text-danger" style={{backgroundColor: "#FFE6E6", width: '28px', height: '28px'}}>
                    <GoTrash />
                </button>
            </div>
        ))}
      {/* <p className='text-success text-center'>Add new contestant</p> */}
    </div>
  )
}


export default ViewBallot;