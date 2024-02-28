"use client";

import { useState } from "react";
import Link from "next/link";
import DeleteElection from "./modals/DeleteElection";
import { TbEdit } from "react-icons/tb";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GoTrash } from "react-icons/go";

export default function ElectionCard({ election }) {
  const [show, setShow] = useState(false);
  const statusColor = (status) => {
    if (status === "In progress") {
      return "#F1A867";
    } else if (status === "Completed") {
      return "#037122";
    } else {
      return "#ABB3BF";
    }
  };

  return (
    <>
      <div
        className="p-3 rounded-2"
        style={{ backgroundColor: "#FAFBFC", border: "1px #E7EAEB solid" }}
      >
        <div className="m-0 d-flex justify-content-between align-items-center align-items-sm-center">
          <p className="text-muted m-0" style={{ fontSize: ".8rem" }}>
            Online Voting
          </p>
          <div
            className="d-flex align-items-center justify-content-center p-1"
            style={{
              fontSize: ".8rem",
              backgroundColor: statusColor(election.status),
              textAlign: "center",
            }}
          >
            <p className="text-center text-light m-0 rounded-2 px-2">
              {election.status}
            </p>
          </div>
        </div>
        <p className="mb-5 fs-5 fw-semibold">{election.title}</p>

        <p className="fw-medium text-muted mb-1" style={{ fonSize: "0.8rem" }}>
          Actions:
        </p>
        <div className="d-flex gap-3 align-items-center w-100">
          <button
            className="btn m-0 py-0"
            style={{
              backgroundColor: "#ffffff",
              color: "#024647",
              padding: "4px 8px",
              height: "32px",
              border: "0.5px solid #E7EAEB",
            }}
          >
            <Link
              style={{ fontSize: ".8rem", padding: 0 }}
              className="text-decoration-none align-middle text-dark "
              href={`/elections/${election.id}/monitoring`}
            >
              <MdOutlineRemoveRedEye
                className="me-1"
                style={{ fontSize: "1rem" }}
              />{" "}
              Monitor results
            </Link>
          </button>
          <button
            className="btn m-0"
            style={{
              backgroundColor: "#ffffff",
              color: "#024647",
              padding: "4px 8px",
              height: "32px",
              border: "0.5px solid #E7EAEB",
            }}
          >
            <Link
              style={{ fontSize: ".8rem", padding: 0 }}
              className="text-decoration-none align-middle text-dark "
              href={`/elections/${election.id}`}
            >
              <TbEdit className="me-1" style={{ fontSize: "1rem" }} />
              Edit
            </Link>
          </button>
          <button
            onClick={() => setShow(true)}
            className="btn m-0"
            style={{
              fontSize: ".8rem",
              backgroundColor: "#E2E2E2",
              color: "#585858",
              padding: "4px 8px",
              height: "32px",
              border: "1px solid #E7EAEB",
            }}
          >
            <GoTrash className="me-1" style={{ fontSize: "1rem" }} /> Delete
          </button>
        </div>
        <DeleteElection show={show} onHide={setShow} id={election.id} />
      </div>
    </>
  );
}
