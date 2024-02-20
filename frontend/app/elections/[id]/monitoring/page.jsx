"use client"

import { useElection } from "@/app/contexts/electionContext";
import { useEffect, useState } from "react"
import { getElection } from '@/lib/electionHelper'
import styles from '@/app/elections/[id]/page.module.css'
import ElectionOverview from "@/app/components/ElectionOverview";
import LiveResults from "@/app/components/LiveResults";



export default function Monitoring({params}) {
    const [isActive, setActive] = useState('overview')

    const handleActive = (btn) => {
        setActive(btn)
    }

    const { setElection } = useElection()

    useEffect(() => {
        const getElectionData = async () => {
            try {
                const res = await getElection(params.id)
                if (res) {
                    setElection(res)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getElectionData()
    },[params.id])

    return (
        <div className="w-100 px-2">
        <div className="btn-group w-100">
            <button type="button " onClick={() => handleActive('overview')} href="#" className={`btn rounded-0 fw-semibold text-muted border border-2 ${isActive === 'overview' ? styles.activeBtn : ''}`} aria-current="page">Overview</button>
            <button type="button" onClick={() => handleActive('live')} href="#" className={`btn rounded-0 fw-semibold text-muted border border-2 ${isActive === 'live' ? styles.activeBtn : ''}`}>Live results</button>
            <button disabled type="button" onClick={() => handleActive('voters')} href="#" className={`btn rounded-0 fw-semibold text-muted border border-2 ${isActive === 'voters' ? styles.activeBtn : ''}`}>Settings</button>
        </div>
        {isActive === 'overview' && <ElectionOverview electionId={params.id} />}
        {isActive === 'live' && <LiveResults electionId={params.id} />}
        {/* {isActive === 'voters' && <EligibleVoters electionId={params.id} />} */}
    </div>
    )
}