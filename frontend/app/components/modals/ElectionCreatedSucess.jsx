import Button from "../Button";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Link from "next/link";

export default function ProjectCreated({ show, onHide, electionId }) {
  return (
    <>
      <Modal show={show}>
        {/* <div className="modal-dialog">
                    <div className="modal-content"> */}
        {/* <Modal.Header> */}
        {/* <Modal.Title>New Project</Modal.Title> */}
        {/* </Modal.Header> */}
        <div className="modal-body">
          <h1 className="mb-1 text-center" style={{ fontSize: "1.3rem" }}>
            Hooray! 🎉 Your project was created
          </h1>
          <p className="card-subtitle">
            Take it to the next level by adding additional voting options.
            Engage your audience and make your project shine!
          </p>
        </div>
        <div className="modal-footer">
        {/* <Link
            className="px-5 btn btn-sm  btn-outline-secondary"
            href='/elections'
          >
            Close
          </Link> */}
          {/* <button
            variant="outline-success"
            className="btn btn-outline-secondary btn-sm px-5"
            onClick={onHide}
          >
            Close
          </button> */}
          {/* <button onClick={handleClick} type="button" className="btn btn-outline-secondary px-5">Finish setting up</button> */}
          {/* <Button text="Finish setting up" classNames="px-5 w-100"> */}
          <Link
            className="pt-2 btn btn-gradient btn-primary w-100"
            href={`/elections/${electionId}`}
          >
            Finish setting up
          </Link>
          {/* </Button> */}
        </div>
        {/* </div>
                </div> */}
      </Modal>
    </>
  );
}
