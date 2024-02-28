'use client'

/*Ground rules page*/
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from "next/navigation";



export default function Instruction({params}) {
    const [loading, setLoading] = useState(false)
  const router = useRouter();

    const handleSubmit = () => {
        router.push(`/election/${params.id}/livevoting`)
    }
    return (
        <>
            <div className='container'>
                <div className="alert alert-success" role="alert">
                    <p className="fw-bold">Welcome to Pollmaster!</p>
                    <p>Just a few points to note before you begin voting:</p>
                    <ol>
                        <li>Review the ballot carefully before making your selections.</li>
                        <li>Click on your chosen candidate or option to cast your vote.</li>
                        <li>You may vote for only one candidate per position</li>
                        <li>Once you&apos;ve made your selections, review your choices before submitting.</li>
                        <li>After submitting your vote, you cannot change it, so please make sure it&apos;s accurate.</li>
                    </ol>
                    <p className="fw-bold">Some Ground Rules:</p>
                    <ol>
                        <li>Only registered voters are eligible to participate.</li>
                        <li>Voting multiple times or sharing your login information is strictly prohibited.</li>
                        <li>Respect others choices and refrain from disruptive behavior.</li>
                        <li>Any attempt to manipulate or influence the voting process will result in disqualification.</li>
                    </ol>
                    <p>Thank you for your participation!!</p>
                </div>
                <div className="d-grid mb-5">
                <Link className={`btn btn-gradient btn-primary`} href={`/election/${electionId}/livevoting`}>
                      Start voting
                    </Link>
                </div>
            </div>
        </>
    );
}