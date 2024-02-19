"use client"

import { FaPlus } from 'react-icons/fa'
import AddNewVoter from '@/app/components/modals/AddNewVoter'
import { useState, useEffect } from 'react'
import EditVoter from './modals/EditVoter'
import { SlOptionsVertical } from "react-icons/sl";
import { useElection } from '@/app/contexts/electionContext'
import DeleteVoter from './modals/DeleteVoter'



export default function EligibleVoters({electionId}) {
    const { election } = useElection()

    
    useEffect(() => {
    }, [])


    
    return (
        <div>
            {election?.voters_id.length === 0 &&
                <p className="text-center text-muted mt-3">You have no eligible voters yet.</p>
            }
            <hr />
            <AddVoter />
            <div className='mt-3'>
            {election?.voters_id.length > 0 && election?.voters_id.map((voter, i) => (
                <div className="d-flex px-2 justify-content-between align-content-center col-lg-6 col-md-6 col-sm-12" key={i}>
                <div className="d-flex">
                  <p className="">{voter}</p>
                </div>
                <VoterOptions
                  voter={voter}
                />
              </div>
            ))
            }
            </div>
        </div>
    )
}

function AddVoter() {
    const [show, setShow] = useState(false)
    const handleClick = () => {
        setShow(!show)
    }
    return (
        <div className='mt-3'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className="d-flex px-1 rounded-1 justify-content-between align-items-center" style={{ backgroundColor: "#E9F2F2" }}>
                            <p className="m-0 p-2">Add new voter</p>
                            <button onClick={() => setShow(true)} type="button" className="btn py-0 text-dark text-light m-0" aria-label="Add new project"><FaPlus /></button>
                        </div>
                    </div>
                </div>
            </div>
            <AddNewVoter show={show} onHide={handleClick} />
        </div>
    )
}

function VoterOptions({ voter }) {
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)



  const handleClick = (key) => {
    if (key === "edit") {
      return setShowEdit(!showEdit);
    } else if (key === "del") {
      return setShowDelete(!showDelete);
    }
  };

  return (
    <div className="dropdown ms-auto">
      <i
        className="fas fa-ellipsis-vertical"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ cursor: "pointer" }}
      >
        <SlOptionsVertical />
      </i>
      <ul className="dropdown-menu">
        <li onClick={() => handleClick("edit")} className="border-bottom" 
        style={{ cursor: "pointer" }}
        >
          <span className="dropdown-item">Edit</span>
        </li>
        <li onClick={() => handleClick("del")} 
        style={{ cursor: "pointer" }}
        >
          <span className="dropdown-item text-danger">Delete</span>
        </li>
      </ul>
      <EditVoter
        show={showEdit}
        onHide={setShowEdit}
        email={voter}
      />
      <DeleteVoter
        show={showDelete}
        onHide={setShowDelete}
        email={voter}
      />
    </div>
  );
}