import React, { useState } from 'react'
import { Accordion } from "react-bootstrap"
import { FaRegEdit } from "react-icons/fa"
import { IoMdArrowDropdown } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";


export default function Overview() {
    return (
        <Accordion className="mt-2 d-flex flex-column gap-1" defaultActiveKey="0" flush>
            <Accordion.Item className="border border-2" eventKey="0">
                <Accordion.Header>Project Details</Accordion.Header>
                <Accordion.Body>
                    <ProjectDetails />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="border border-2" eventKey="1">
                <Accordion.Header>Project Customization</Accordion.Header>
                <Accordion.Body>
                    <ProjectCustomization />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="border border-2" eventKey="2">
                <Accordion.Header>Voting Configuration</Accordion.Header>
                <Accordion.Body>
                    <VotingConfiguration />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="border border-2" eventKey="3">
                <Accordion.Header>Privacy Settings</Accordion.Header>
                <Accordion.Body>
                    <PrivacySettings />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

function ProjectDetails() {
    return (
        <div className="d-flex flex-column gap-0">
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0 text-muted " style={{ fontSize: ".8rem" }}>Election name</p>
                    <button className="btn p-0 m-0"><FaRegEdit /></button>
                </div>
                <h6 className="fw-bold">SRC Election</h6>
            </div>
            <div className="mb-4">
                <p className="text-muted" style={{ fontSize: ".8rem" }}>Project Id</p>
                <p className="fw-bold">123456</p>
            </div>
            <div className="mb-4">
                <p className="text-muted" style={{ fontSize: ".8rem" }}>Project Owner</p>
                <p className="fw-bold">jon@email.com</p>
            </div>
            <div className="mb-4">
                <p className="text-muted" style={{ fontSize: ".8rem" }}>Project Duration</p>
                <p className="fw-bold">July 23, 2023  12:00 PM</p>
            </div>
            <div className="mb-4">
                <p className="text-muted" style={{ fontSize: ".8rem" }}>Project Description</p>
                <p className="fw-bold">
                    This is a test project description. the quick brown fox jumps over the lazy dog.
                </p>
            </div>
        </div>
    )
}

function ProjectCustomization() {
    return (
        <div>
            <p>Add your organization's logo</p>
            <input type="file" />
        </div>
    )
}

function VotingConfiguration() {
    return (
        <div className="mb-4">
            <div className="d-flex justify-content-end">
                <button className="btn p-0 m-0"><FaRegEdit /></button>

            </div>
            <div className="mb-4">
                <p className="text-muted" style={{ fontSize: ".8rem" }}>Ballot papers</p>
                <p className="fw-bold">0</p>
            </div>
            <div>
                <p className="text-muted" style={{ fontSize: ".8rem" }}>Eligible voters</p>
                <p className="fw-bold">0</p>
            </div>
        </div>
    )
}

function PrivacySettings() {
    const [privacy, setPrivacy] = useState("By invitation")

    const handlePrivacy = (name) => {
        setPrivacy(name)
    }
    return (
        <>
            <div className="dropdown">
                <button className="btn w-100 text-start rounded-4 border border-2 d-flex justify-content-between align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {privacy}
                    <IoMdArrowDropdown />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li onClick={() => handlePrivacy("Public")}><a className="dropdown-item" href="#">Public</a></li>
                    <li onClick={() => handlePrivacy("By invitation")}><a className="dropdown-item" href="#">By invitation</a></li>
                </ul>
            </div>
            {privacy === 'Public' && <div className='mt-3 py-2 px-2 d-flex gap-2 rounded-4 border border-2 justify-content-between align-items-center'>
                <p className='m-0 px-1'>http://pollmaster.com/src-election/ty=sjf</p>
                <button className="btn p-0 m-0"><IoCopyOutline /></button>
            </div>}
        </>
    )
}