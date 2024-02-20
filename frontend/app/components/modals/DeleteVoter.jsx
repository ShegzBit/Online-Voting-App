import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateElection } from "@/lib/electionHelper";
import { useUser } from "@/app/contexts/userContext";
import { useElection } from "@/app/contexts/electionContext";

export default function DeleteVoter({ show, onHide, email}) {
  const { user } = useUser()
  const { election, setElection } = useElection()

  console.log(election.voters_id.filter(voter => voter !== email));
  const handleSubmit = async () => {
    try {
      const res = await updateElection(user?.id, election.id, {
        voters_id: [...election.voters_id.filter(voter => voter !== email)]
      })
      setElection(res)
      onHide(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Voter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <p>Are you sure you want to delete this voter?</p>
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
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}