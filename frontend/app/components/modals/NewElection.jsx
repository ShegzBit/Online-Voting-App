import Button from "../Button";
import ElectionDetails from "./ElectionDetails";
import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function NewElection({ isOpen, setIsOpen }) {
  const [showDetails, setShowDetails] = useState(false);
  const handleShowProjDetails = () => {
    // We close the modal and open the project details modal
    setIsOpen();
    setShowDetails(!showDetails);
  };

  return (
    <>
      <Modal show={isOpen} onHide={setIsOpen}>
        {/* <div className="modal-dialog"> */}
        {/* <div className="modal-content"> */}
        <Modal.Header closeButton>
          <Modal.Title>New Election</Modal.Title>
        </Modal.Header>
        <div className="modal-body">
          <ul className="list-group">
            <li className="list-group-item border-0 d-flex">
              <input
                onChange={() => console.log()}
                className="form-check-input me-2"
                type="radio"
                name="listGroupRadio"
                value=""
                id="firstRadio"
                checked
              />
              <div className="d-flex flex-column">
                <label
                  className="form-check-label lh-1 fs-6 mb-2"
                  htmlFor="firstRadio"
                >
                  Online Voting
                </label>
                <p
                  className="text-muted lh-sm px-0"
                  style={{ fontSize: ".8rem" }}
                >
                  Set up elections and allow voters participate remotely from
                  anywhere,
                </p>
              </div>
            </li>
            <li className="list-group-item border-0 d-flex">
              <input
                className="form-check-input me-2"
                type="radio"
                name="listGroupRadio"
                value=""
                id="secondRadio"
                disabled
              />
              <div className="d-flex flex-column">
                <label
                  className="form-check-label lh-1 fs-6 text-muted mb-2"
                  htmlFor="secondRadio"
                >
                  Live Voting
                </label>
                <p
                  className="text-muted lh-sm px-0"
                  style={{ fontSize: ".8rem" }}
                >
                  Coming Soon
                </p>
              </div>
            </li>
            <li className="list-group-item border-0 d-flex">
              <input
                className="form-check-input me-2"
                type="radio"
                name="listGroupRadio"
                value=""
                id="thirdRadio"
                disabled
              />
              <div className="d-flex flex-column">
                <label
                  className="form-check-label lh-1 fs-6 text-muted mb-2"
                  htmlFor="thirdRadio"
                >
                  Nomination
                </label>
                <p
                  className="text-muted lh-sm px-0"
                  style={{ fontSize: ".8rem" }}
                >
                  Coming Soon
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="modal-footer">
          <button
            onClick={setIsOpen}
            type="button"
            className="btn btn-outline-secondary btn-sm px-5"
          >
            Close
          </button>
          <button
            onClick={handleShowProjDetails}
            type="button"
            className="btn btn-sm btn-gradient btn-primary"
            aria-label="Create project"
          >
            Create Project
          </button>
        </div>
        {/* </div> */}
        {/* </div> */}
      </Modal>
      <ElectionDetails show={showDetails} onHide={handleShowProjDetails} />
    </>
  );
}
