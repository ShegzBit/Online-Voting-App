import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GoTrash } from "react-icons/go";
import { useElection } from '@/app/contexts/electionContext';
import EditBallot from './EditBallot';
import Image from 'next/image';


function ViewBallot({ show, onHide, contestant }) {
  const [showEdit, setShowEdit] = useState(false);
  const handleClick = () => {
    setShowEdit(!showEdit)
    onHide('view')
  }

  return (
    <>
      <Modal show={show} onHide={() => onHide('view')}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold'>Candidate details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-center'>
            <Image src={contestant.profile_image} alt={contestant.full_name} width={120} height={120}
            className='rounded-circle mb-4 object-fit-cover'
            />
          </div>
          <div className="mb-3">
            <p className="fw-bold">Position</p>
            {/* <input type="text" className="form-control rounded-4" style={{ height: "56px" }} id="ballotName" placeholder="Enter name of ballot paper" /> */}
            <p>{contestant.position}</p>
          </div>
          <div className="mb-3">
            <p className='fw-bold'>Candidate’s first name</p>
            <p>{contestant.first_name}</p>
          </div>
          <div className="mb-3">
            <p className='fw-bold'>Candidate’s last name</p>
            <p>{contestant.last_name}</p>
          </div>
          {/* <Contestants contestants={contestants} /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" className="btn-sm px-5 py-1 h-75 base-color text-bold" onClick={() => onHide('view')}>
            Go back
          </Button>
          <Button className="btn-sm btn-gradient btn-primary text-light px-5 py-1 h-75" variant="light" onClick={handleClick}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      <EditBallot show={showEdit} onHide={setShowEdit} contestant={contestant} />
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
            <div key={index} className='d-flex justify-content-between'>
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