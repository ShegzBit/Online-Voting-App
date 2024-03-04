import AddNewBallot from "@/app/components/modals/AddNewBallotModal";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { useElection } from "../contexts/electionContext";
import DeleteCandidate from "./modals/DeleteCandidate";
import EditBallot from "./modals/EditBallot";
import ViewBallot from "./modals/ViewBallot";

export default function Ballot({ electionId }) {
  const [empty, setEmpty] = useState(false);
  const { election } = useElection();
  useEffect(() => {
    if (election?.candidates.length === 0) {
      setEmpty(true);
    }
  }, [election]);
  return (
    <div>
      {empty && (
        <p className="text-center text-muted mt-3 card-subtitle">
          You have no candidates yet.
        </p>
      )}
      <hr />
      <AddBallot electionId={electionId} />
      <div className="mt-5">{election && <Contestant />}</div>
    </div>
  );
}

function AddBallot({ electionId }) {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div className="mt-3">
      {/* <div className="container"> */}
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div
              className="d-flex px-1 rounded-1 justify-content-between align-items-center"
              style={{ backgroundColor: "#E9F2F2" }}
            >
              <p className="m-0 p-2">Add new candidate</p>
              <button
                onClick={() => setShow(true)}
                type="button"
                className="btn py-0 text-dark text-light m-0"
                aria-label="Add new ballot"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      {/* </div> */}
      <AddNewBallot electionId={electionId} show={show} onHide={handleClick} />
    </div>
  );
}

function Contestant({ name, ballot, contestants }) {
  const { election } = useElection();

  const groupedByPosition = election?.candidates.reduce((acc, obj) => {
    const key = obj.position;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  
  const positions = Object.keys(groupedByPosition);
  return (
    // <div className='row justify-content-center align-items-center px-1'>
    // <div className='d-flex justify-content-between align-content-center col-lg-6 col-md-6 col-sm-12'>
    //     <div className='d-flex'>
    //         <HiBars2 />
    //         <p className="ms-3">{name}</p>
    //     </div>
    //     <BallotOpts name={name} ballot={ballot} contestants={contestants}  />
    // </div>
    <div>
      {positions &&
        positions.map((element, i) => (
          <Accordion
            className="mt-2 d-flex flex-column gap-1"
            defaultActiveKey="0"
            flush
            key={i}
          >
            <Accordion.Item className="border border-2" eventKey={i}>
              <Accordion.Header>{element}</Accordion.Header>
              <Accordion.Body>
                {groupedByPosition[element].map((obj, j) => (
                  <div className="d-flex justify-content-between align-content-center col-lg-6 col-md-6 col-sm-12" key={j}>
                    <div className="d-flex">
                      <p className="">{obj.full_name}</p>
                    </div>
                    <BallotOpts
                      contestant={obj}
                    />
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
    </div>
    // </div>
  );
}

function BallotOpts({ contestant }) {
    const [showView, setShowView] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)



  const handleClick = (key) => {
    if (key === "view") {
      return setShowView(!showView);
    } else if (key === "edit") {
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
        <li onClick={() => handleClick("view")} className="border-bottom" 
        style={{ cursor: "pointer" }}
        >
          <span className="dropdown-item">View Ballot</span>
        </li>
        <li onClick={() => handleClick("del")} 
        style={{ cursor: "pointer" }}
        >
          <span className="dropdown-item text-danger">Delete</span>
        </li>
      </ul>
      <ViewBallot
        show={showView}
        onHide={handleClick}
        contestant={contestant}
      />
      <EditBallot
        show={showEdit}
        onHide={setShowEdit}
        contestant={contestant}
      />
      <DeleteCandidate
        show={showDelete}
        onHide={setShowDelete}
        contestant={contestant}
      />
    </div>
  );
}
