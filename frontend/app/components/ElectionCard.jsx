'use client'

import { useState } from "react"
import { FaRegEdit, FaTrash, FaRegEye } from "react-icons/fa";
import Link from 'next/link'
import DeleteElection from "./modals/DeleteElection";

export default function ElectionCard({ election }) {
    const [show, setShow] = useState(false)
    const statusColor = (status) => {
        if (status === "In progress") {
            return "#F1A867"
        } else if (status === "Completed") {
            return "#037122"
        } else {
            return "#ABB3BF"
        }
    }

    return (
        <>
        <div className="container p-3 rounded-2" style={{ backgroundColor: "#FAFBFC", border: "1px #E7EAEB solid" }}>
            <div className="m-0 d-flex justify-content-between align-items-center align-items-sm-center">
                <p className="text-muted m-0" style={{ fontSize: ".8rem" }}>Online Voting</p>
                <div className="d-flex align-items-center justify-content-center p-1" style={{ fontSize: ".8rem", backgroundColor: statusColor(election.status), textAlign: "center" }}>
                    <p className="text-center text-light m-0 rounded-2 px-2">{election.status}</p>
                </div>
            </div>
            <Link href={`/elections/${election.id}/monitoring`} className=""><p className="mb-5">{election.title}</p></Link>
            <p>Actions:</p>
            <div className="d-flex gap-3 align-items-center w-100">
                <button className="btn m-0 py-0" style={{ backgroundColor: "#D0F3F2", color: "#024647", padding: '4px 8px', height: '32px'}}>
                    <Link style={{color: "#024647", fontSize: '.8rem', padding: 0}} className="text-decoration-none" href={`/elections/${election.id}/monitoring`}><FaRegEye /> Monitor results</Link>
                </button>
                <button className="btn m-0" style={{ backgroundColor: "#D0F3F2", color: "#024647", padding: '4px 8px', height: '32px'}}>
                <Link style={{color: "#131c1c"}} className="text-decoration-none" href={`/elections/${election.id}`}><FaRegEdit />Edit</Link>
                </button>
                <button onClick={() => setShow(true)} className="btn m-0" style={{ backgroundColor: "#E2E2E2", padding: '4px 8px', height: '32px'}}>
                <FaTrash /> Delete
                </button>
            </div>
            <DeleteElection show={show} onHide={setShow} id={election.id}/>
        </div>
        </>
    )
}