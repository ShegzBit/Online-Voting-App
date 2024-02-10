"use client"

import { useState, useEffect } from "react"
import NewUserDashBoard from "@/app/components/NewUserDashBoard"
import Button from "../components/Button"
import ElectionCard from "../components/ElectionCard"


export default function DashBoard() {
    const [isNew, setIsNew] = useState(false)
    if (isNew) {
        return <NewUserDashBoard toggle={setIsNew} isNew={isNew} />
    }
    return (
    <div className="container d-flex flex-column gap-2 mt-4">
        <h1 className="card-title">My Elections</h1>
        <ElectionCard election={{title: "Election 1", description: "This is the first election", status: "In progress"}} />
        <ElectionCard election={{title: "Election 1", description: "This is the first election", status: "Completed"}} />
        <ElectionCard election={{title: "Election 1", description: "This is the first election", status: "Not started"}} />
    </div>
    )
}
