import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useUser } from '@/app/contexts/userContext';
import { useElection } from '@/app/contexts/electionContext';
import { updateElection, updateCandidate, getElection } from '@/lib/electionHelper'

function EditVoter({ show, onHide, email }) {
  const [newEmail, setNewEmail] = useState(email);

  const { user } = useUser()
  const { election, setElection } = useElection()


  const handleChange = (e) => {
      setNewEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await updateElection(user?.id, election.id, {
        voters_id: [newEmail, ...election.voters_id.filter(voter => voter !== newEmail)]
      })
      setElection(res)
      onHide(false)
      console.log(res);
      newEmail('')
    } catch (e) {
      
    }
  }

  return (
    <>
    <Modal show={show} onHide={() => onHide(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Voter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="ballotName" className="form-label">
          Edit email
          </label>
          <input
            onChange={handleChange}
            // value={data.first_name}
            defaultValue={email}
            type="text"
            className="form-control rounded-4"
            style={{ height: "56px" }}
            id="ballotName"
            placeholder="Enter voters email"
          />
        </div>
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
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
}

export default EditVoter;