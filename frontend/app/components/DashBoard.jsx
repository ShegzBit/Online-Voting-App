'use client'

import Fab from './Fab';
import NewElection from './modals/NewElection';
import { getElections } from "@/lib/electionHelper"
import EmptyElections from './EmptyElections';
import ElectionCard from './ElectionCard'
import { useEffect, useState } from 'react'

export default function DashBoard({ toggle, isEmpty, id, data }) {
    // const [data, setData] = useState([])

    // useEffect(() => {
    //     const fecthData = async () => {
    //         console.log(id)
    //         try {
    //             const res = await getElections(id)
    //             setData(res)
    //         } catch(e) {
    //             console.log(e)
    //         }
    //     }
    //     fecthData()
    // }, [id])

    return (
        <>
            {isEmpty ? 
            <div className='container'>
                <EmptyElections />
                <NewElection />
            </div> : <Elections elections={data} />}
            <Fab />
        </>
    )
}


const Elections = ({elections}) => {
    return (
        <div className="container d-flex flex-column gap-2 mt-4">
            <h1 className="card-title">My Elections</h1>
            {elections.map((election) => (
                <ElectionCard key={election.id} election={election} /> 
            ))}
        </div>
    )
}

// {
//     "election": {
//         "__class__": "Election",
//         "candidates": [],
//         "created_at": "2024-02-11 22:56:00",
//         "description": "okijijjm",
//         "end_date": "2024-02-11 23:55:53",
//         "expected_voters": 0,
//         "id": "3e7cce10-d6f5-4dc1-8d9e-7d0caabfff6c",
//         "public_id": "4Yb7-bmxw-UPXh",
//         "results": {},
//         "start_date": "2024-02-11 23:55:45",
//         "status": "Upcoming",
//         "title": "tttvvy",
//         "total_votes": 0,
//         "voters": [],
//         "voters_id": []
//     },
//     "status": "successful"
// }