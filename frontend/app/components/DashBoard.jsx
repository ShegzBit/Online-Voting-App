'use client'

import Fab from './Fab';
import NewElection from './modals/NewElection';
import { getElections } from "@/lib/electionHelper"
import EmptyElections from './EmptyElections';
import ElectionCard from './ElectionCard'
import { useEffect, useState } from 'react'
import { useElections } from '../contexts/electionsContext';

export default function DashBoard({ toggle, isEmpty, id, data }) {
    const {updateElections } = useElections()

    useEffect(() => {
        updateElections(data)
    }, [data])

    return (
        <>
            {isEmpty ? 
            <div className='container'>
                <EmptyElections />
                <NewElection />
            </div> : <Elections />}
            <Fab />
        </>
    )
}


const Elections = () => {
    const { elections } = useElections()
    return (
        <div>
        {elections && <div className="container d-flex flex-column gap-2 mt-4">
            <h1 className="card-title">My Elections</h1>
            {elections.map((election) => (
                <ElectionCard key={election.id} election={election} /> 
            ))}
        </div>}
        </div>
    )
}
