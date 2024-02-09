import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function AddNewModal({ show, onHide }) {

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Ballot paper</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="ballotName" className="form-label">Ballot name</label>
            <input type="text" className="form-control rounded-4" style={{ height: "56px" }} id="ballotName" placeholder="Enter name of ballot paper" />
          </div>
          <div className="mb-3">
            <label htmlFor="ballotLimit" className="form-label">Set a vote limit</label>
            <input type="text" className="form-control rounded-4" style={{ height: "56px" }} id="ballotLimit" placeholder="Enter number of votes" />
          </div>
          <Contestants />
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

function Contestants() {
  return (
    <div>
      <p className='text-bold'>Contestants</p>
  <div className="mb-3 d-flex align-items-center gap-4">
    <label htmlFor="contestandName" className="form-label fs-6">1.</label>
    <input type="text" className="form-control rounded-4" style={{ height: "56px" }} id="contestandName" placeholder="Enter name of contestants" />
  </div>
      <p className='text-success text-center'>Add new contestant</p>
    </div>
  )
}


export default AddNewModal;