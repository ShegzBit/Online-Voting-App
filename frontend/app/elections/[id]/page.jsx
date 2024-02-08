"use client";

import { useState } from "react"
import styles from './page.module.css'
import Overview from '@/app/components/Overview'

export default function SingleElection({ params }) {
    const [isActive, setActive] = useState('overview')
    console.log(styles)
    const handleActive = (btn) => {
        setActive(btn)
    }

    return (
        <div className="w-100 px-2">
            <div className="btn-group w-100">
                <button type="button " onClick={() => handleActive('overview')} href="#" className={`btn rounded-0 fw-semibold text-muted border border-2 ${isActive === 'overview' ? styles.activeBtn : ''}`} aria-current="page">Overview</button>
                <button type="button" onClick={() => handleActive('ballot')} href="#" className={`btn rounded-0 fw-semibold text-muted border border-2 ${isActive === 'ballot' ? styles.activeBtn : ''}`}>Ballot</button>
                <button type="button" onClick={() => handleActive('voters')} href="#" className={`btn rounded-0 fw-semibold text-muted border border-2 ${isActive === 'voters' ? styles.activeBtn : ''}`}>Eligible voters</button>
            </div>
            {isActive === 'overview' && <Overview electionId={params.id} />}
        </div>
    )
}
