import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GoTrash } from "react-icons/go";
import { useUser } from '@/app/contexts/userContext';
import { useElection } from '@/app/contexts/electionContext';
import { updateElection, updateCandidate, getElection } from '@/lib/electionHelper'

function EditBallot({ show, onHide, contestant }) {
  const [showEdit, setShowEdit] = useState(false);
  const [candidate, setCandidate] = useState(contestant);

  const [data, setData] = useState({
    first_name: contestant.first_name,
    last_name: contestant.last_name,
    position: contestant.position,
    isError: false,
  });

  const { user } = useUser()
  const { election, setElection } = useElection()


  const handleChange = (key) => (e) => {
      setData({
        ...data,
        [key]: e.target.value,
      });
  };

  const handleSubmit = async () => {
    try {
      const {isError, ...rest} = data
      const res = await updateCandidate(user?.id, election.id, contestant.id, {
        ...rest
      })
      if (res) {
        setCandidate(res)
      }
      const updatedElection = await getElection(contestant.election_id)
      setElection(updatedElection)
      onHide(false)
    } catch (e) {
      
    }
  }

  console.log(candidate)

  return (
    <>
    <Modal show={show} onHide={() => onHide(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Candidate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="ballotName" className="form-label">
          Candidate&apos;s first name
          </label>
          <input
            onChange={handleChange("first_name")}
            // value={data.first_name}
            defaultValue={candidate.first_name}
            type="text"
            className="form-control rounded-4"
            style={{ height: "56px" }}
            id="ballotName"
            placeholder="Enter candidate’s name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ballotName" className="form-label">
          Candidate&apos;s last name
          </label>
          <input
            onChange={handleChange("last_name")}
            // value={data.last_name}
            defaultValue={candidate.last_name}
            type="text"
            className="form-control rounded-4"
            style={{ height: "56px" }}
            id="ballotName"
            placeholder="Enter candidate’s name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ballotLimit" className="form-label">
            Position
          </label>
          <input
            type="text"
            // value={data.position}
            defaultValue={candidate.position}
            className="form-control rounded-4"
            style={{ height: "56px" }}
            id="ballotLimit"
            placeholder="Enter name of position"
            onChange={handleChange("position")}

          />
        </div>
        {/* <Contestants setContestants={setContestants} contestants={contestants}  /> */}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-success"
          className="btn-sm px-5 py-1 h-75 base-color text-bold"
          onClick={onHide}
        >
          Go back
        </Button>
        <Button
          className="btn-sm btn-gradient btn-primary text-light px-5 py-1 h-75"
          variant="light"
          onClick={handleSubmit}
        >
          Add
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


export default EditBallot;