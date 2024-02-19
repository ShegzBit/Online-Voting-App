import React, { useState, useEffect, useCallback } from 'react'
import { useElection } from '@/app/contexts/electionContext'
import moment from 'moment';

export default function ElectionOverview() {
    const { election } = useElection()
    const [timeLeft, setTimeLeft] = useState('')

    const currentDate = new Date()
    const startDate = moment(currentDate)
    const endDate = moment(election.end_date)

    const handleSetTime = useCallback (() => {
        setTimeLeft(
            moment(endDate.diff(startDate)).format('h:mm:ss')
            )
    }, [startDate, endDate])

    console.log(timeLeft);
    
    useEffect(() => {
        const handleInterval = setInterval(handleSetTime, 1000)
        return () => clearInterval(handleInterval)
        }, [handleSetTime])
    
  console.log(timeLeft.split(':'));
  return (
    <div className='flex flex-column rounded-2 px-3 py-2 align-items-start border mt-3' style={{backgroundColor: "#FAFBFC"}}>
        <div>
            <p className='mb-0 text-muted ' style={{fontSize: '.8rem'}}>Election will end in</p>
            <p className=''>
                <span className='fs-1 fw-bolder'>{timeLeft.split(':')[0]}</span>
                <span className='fw-bolder' style={{fontSize: '.8rem'}}>h</span>
                <span className='fs-1 fw-bolder'>:</span>
                <span className='fs-1 fw-bolder'>{timeLeft.split(':')[1]}</span>
                <span className='fw-bolder' style={{fontSize: '.8rem'}}>m</span>
                <span className='fs-1 fw-bolder'>:</span>
                <span className='fs-1 fw-bolder'>{timeLeft.split(':')[2]}</span>
                <span className='fw-bolder' style={{fontSize: '.8rem'}}>s</span>
            </p>
        </div>
        <div>
            <p className='mb-0 text-muted' style={{fontSize: '.8rem'}}>Election name</p>
            <p className='fw-semibold'>{election?.title}</p>
        </div>
        <div className=''>
            <div className='d-flex justify-content-between'>
            <div>
                <p className='mb-0 text-muted' style={{fontSize: '.8rem'}}>Start date</p>
                <p className='fw-semibold'>{election?.start_date}</p>
            </div>
            <div>
                <p className='mb-0 text-muted' style={{fontSize: '.8rem'}}>End date</p>
                <p className='fw-semibold'>{election?.end_date}</p>
            </div>
                
            </div>
            <div>
                <p className='mb-0 text-muted' style={{fontSize: '.8rem'}}>Number of ballots</p>
                <p className='fw-semibold'>{
                    election.candidates && [new Set (election.candidates.map(x => x.position))].length + 1
                }
                </p>
            </div>
            <div>
                <p className='mb-0 text-muted ' style={{fontSize: '.8rem'}}>Expected voters</p>
                <p className='fw-semibold'>{election?.expected_voters}</p>
            </div>
            <div>
                <p className='mb-0 text-muted' style={{fontSize: '.8rem'}}>Description</p>
                <p className='fw-semibold'>{election?.description}</p>
            </div>
        </div>
    </div>
  )
}