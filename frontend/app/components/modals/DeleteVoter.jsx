import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteVoter, getElection } from "@/lib/electionHelper";
import { useUser } from "@/app/contexts/userContext";
import { useElection } from "@/app/contexts/electionContext";

export default function DeleteVoter({ show, onHide, email}) {
  const { user } = useUser()
  const { election, setElection } = useElection()

  
  const handleSubmit = async () => {
    try {
      console.log(email);
      const delVoter = await deleteVoter(user?.id, election.id, {
        voters_id: email
      })

      const res = await getElection(election.id)
      console.log(res);
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
        {/* <Button
            variant="outline-success"
            className="btn-sm px-5 py-1 h-75 base-color text-bold"
            onClick={onHide}
          >
            Go back
          </Button> */}
          <button
            onClick={onHide}
            type="button"
            className="btn btn-outline-secondary btn-sm px-5"
            style={{ color: "#024647", borderColor: "#024647" }}
          >
            Close
          </button>
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