"use client"

import { useState, useEffect } from "react"
import NewUserDashBoard from "@/app/components/NewUserDashBoard"
import Button from "../components/Button"


export default function DashBoard() {
    const [isNew, setIsNew] = useState(true)
    if (isNew) {
        return <NewUserDashBoard toggle={setIsNew} isNew={isNew} />
    }
    return (
    <div className="container">
         <Button text={"New Project"} classNames="w-100" />
    </div>
    )
}