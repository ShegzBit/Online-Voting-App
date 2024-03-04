import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteElection, getElections } from "@/lib/electionHelper";
import { useUser } from "@/app/contexts/userContext";
import { useElections } from "@/app/contexts/electionsContext";

export default function DeleteElection({ show, onHide, id }) {
  const { user } = useUser();
  const { updateElections } = useElections();

  const handleSubmit = async () => {
    try {
      const res = await deleteElection(user?.id, id);
      const updatedElections = await getElections(user?.id);
      updateElections(updatedElections);
      onHide(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Voter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Are you sure you want to delete this election?</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button
            variant="outline-success"
            className="btn-sm px-5 py-1 h-75 base-color text-bold"
            onClick={() => onHide(false)}
          >
            Go back
          </Button> */}
          <button
            onClick={() => onHide(false)}
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