"use client"

import { useState, useEffect } from "react"
import DashBoard from "@/app/components/DashBoard"
import { getElections } from "@/lib/electionHelper";
import { useUser } from "../contexts/userContext";
import { useElection } from "../contexts/electionContext"
import { getUser } from "@/lib/authHelper";


export default function ElectionsPage() {
    const [isEmpty, setIsEmpty] = useState(false)
    const [elections, setElections] = useState([])
    const { user, updateUser } = useUser()
    const { election, updateElections } = useElection()


    if (!user) {
        updateUser(getUser())
    }

    useEffect(() => {
        const fetchElections = async () => {
            try {
                if (user?.id) {
                    const res = await getElections(user?.id)
                    setElections(res)
                    updateElections(res)
                    if (res.length === 0) {
                        setIsEmpty(true)
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
        
        fetchElections()
    }, [user])
    
    console.log(elections)

    return (
        <>
            <DashBoard toggle={setIsEmpty} isEmpty={isEmpty} data={elections} />
        </>
    )
}


