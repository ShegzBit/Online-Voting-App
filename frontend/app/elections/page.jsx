"use client"

import { useState, useEffect } from "react"
import DashBoard from "@/app/components/DashBoard"
import { getElections } from "@/lib/electionHelper";
import { useUser } from "../contexts/userContext";
import { getUser } from "@/lib/authHelper";
import { useElections } from "../contexts/electionsContext";


export default function ElectionsPage() {
    const [isEmpty, setIsEmpty] = useState(false)
    const {elections, updateElections} = useElections()
    const { user, updateUser } = useUser()


    if (!user) {
        updateUser(getUser())
    }

    useEffect(() => {
        const fetchElections = async () => {
            try {
                if (user?.id) {
                    const res = await getElections(user?.id)
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

    return (
        <>
            <DashBoard toggle={setIsEmpty} isEmpty={isEmpty} data={elections} />
        </>
    )
}