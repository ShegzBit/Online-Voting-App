import { FaRegEdit } from "react-icons/fa";
import Link from 'next/link'

export default function ElectionCard({ election }) {
    // const router  = useRouter()
    const statusColor = (status) => {
        if (status === "In progress") {
            return "#F1A867"
        } else if (status === "Completed") {
            return "#037122"
        } else {
            return "#ABB3BF"
        }
    }

    return (
        <>
        <div className="container p-3 rounded-2" style={{ backgroundColor: "#FAFBFC", border: "1px #E7EAEB solid" }}>
            <div className="m-0 d-flex justify-content-between align-items-center align-items-sm-center">
                <p className="text-muted m-0" style={{ fontSize: ".8rem" }}>Online Voting</p>
                <Link href={`/elections/${election.id}`}><FaRegEdit /></Link>
            </div>
            <h3 className="mb-5">{election.title}</h3>
            <div className="d-flex justify-content-between align-items-center">
                <p className="m-0" style={{ fontSize: ".8rem" }}>Status</p>
                <div className="d-flex align-items-center justify-content-center p-1" style={{ fontSize: ".8rem", backgroundColor: statusColor(election.status), textAlign: "center" }}>
                    <p className="text-center text-light m-0 rounded-2 px-2">{election.status}</p>
                </div>
            </div>
        </div>
        </>
    )
}

