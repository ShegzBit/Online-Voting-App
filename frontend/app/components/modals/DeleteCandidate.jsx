import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteCandidate, getElection } from "@/lib/electionHelper";
import { useUser } from "@/app/contexts/userContext";
import { useElection } from "@/app/contexts/electionContext";

export default function DeleteCandidate({ show, onHide, contestant}) {
  const { user } = useUser()
  const { setElection } = useElection()

  const handleSubmit = async () => {
    try {
      const res = await deleteCandidate(user?.id, contestant.election_id, contestant.id)
      console.log(res)
      const updatedElection = await getElection(contestant.election_id)
      setElection(updatedElection)
      onHide(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <p>Are you sure you want to delete this candidate?</p>
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