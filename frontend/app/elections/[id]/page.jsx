"use client";

import { useEffect, useState } from "react"
import styles from './page.module.css'
import Overview from '@/app/components/Overview'
import Ballot from '@/app/components/Ballot'
import EligibleVoters from '@/app/components/EligibleVoters'
import { getElection } from '@/lib/electionHelper'
import { useElection } from "@/app/contexts/electionContext";

export default function SingleElection({ params }) {
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
        <div className="w-100 px-2 container">
            <div className="btn-group w-100">
                <button type="button " onClick={() => handleActive('overview')} href="#" style={{fontSize:"14px"}} className={`btn rounded-0 fw-semibold text-muted border border-1 ${isActive === 'overview' ? styles.activeBtn : ''}`} aria-current="page">Overview</button>
                <button type="button" onClick={() => handleActive('candidates')} href="#" style={{fontSize:"14px"}} className={`btn rounded-0 fw-semibold text-muted border border-1 ${isActive === 'candidates' ? styles.activeBtn : ''}`}>Candidates</button>
                <button type="button" onClick={() => handleActive('voters')} href="#" style={{fontSize:"14px"}} className={`btn rounded-0 fw-semibold text-muted border border-1 ${isActive === 'voters' ? styles.activeBtn : ''}`}>Eligible voters</button>
            </div>
            {isActive === 'overview' && <Overview electionId={params.id} />}
            {isActive === 'candidates' && <Ballot electionId={params.id} />}
            {isActive === 'voters' && <EligibleVoters electionId={params.id} />}
        </div>
    )
}
