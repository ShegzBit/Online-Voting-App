/* Display modal to alert admin that the selected election
date hasnt started yet, but they hace the option to proceed
if desired.
*/
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ElectionNotStarted() {
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Time for Election is not up yet! 🕰️</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 className="mb-4" style={{ fontSize: "1.5rem" }}>
            Time for Election is not up yet! 🕰️
          </h1>
          <p>
            The system will automatically start election on the set date. Do you
            still want to begin the election now?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-success"
            className="btn-sm px-5 py-1 h-75 base-color text-bold"
            onClick={onHide}
          >
            Yes
          </Button>
          <Button
            className="btn-sm btn-gradient btn-primary text-light px-5 py-1 h-75"
            variant="light"
            onClick={handleSubmit}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}