"use client"

import { useState, useEffect } from "react"
import DashBoard from "@/app/components/DashBoard"


export default function ElectionsPage() {
    const [isEmpty, setIsEmpty] = useState(false)

    // useEffect(() => {
    //     const fetchElections = async () => {
    //         try {
    //             const res = await getElections()

    //             if (res.length === 0) {
    //                 setIsEmpty(true)
    //             }

    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }

    //     fetchElections()
    // }, [])

    return (
        <>
            <DashBoard toggle={setIsEmpty} isNew={isEmpty} />
        </>
    )
}


