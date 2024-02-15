"use client"

import { useState, useEffect } from "react"
import DashBoard from "@/app/components/DashBoard"
import { getUser } from '@/lib/authHelper';
import { getElections } from "@/lib/electionHelper";


export default function ElectionsPage() {
    const [isEmpty, setIsEmpty] = useState(false)
    const [elections, setElections] = useState([])

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const res = await getElections(getUser().id)
                setElections(res)

                if (res.length === 0) {
                    setIsEmpty(true)
                }

            } catch (e) {
                console.log(e)
            }
        }

        fetchElections()
    }, [])

    console.log('user', getUser().id)

    return (
        <>
            <DashBoard toggle={setIsEmpty} isEmpty={isEmpty} data={elections} />
        </>
    )
}


