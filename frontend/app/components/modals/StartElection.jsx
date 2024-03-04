import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateElection } from "@/lib/electionHelper";
import { useUser } from "@/app/contexts/userContext";
import { useElection } from "@/app/contexts/electionContext";
import moment from "moment";


export default function StartElection({ show, onHide }) {
  const { user } = useUser();
  const { election, setElection } = useElection();


  const handleClick = async () => {
    try {
        const res = await updateElection(user?.id, election.id, {
            start_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        })
        if (res) {
            setElection(res)
        }
        onHide(false)
    } catch(e) {
        console.log(e)
    }
}


  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title style={{fontSize:"20px"}}>Time for Election is not up yet! 🕰️</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>The system will automatically start election on the set date. Do you still want to begin the election now?</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <button
            onClick={handleClick}
            type="button"
            className="btn btn-outline-secondary btn-sm px-5"
            style={{ color: "#024647", borderColor: "#024647" }}
          >
            Yes
          </button>
          {/* <Button
            variant="outline-success"
            className="btn-sm px-5 py-1 h-75 base-color text-bold"
            onClick={handleClick}
          >
            Yes
          </Button> */}
          <Button
            className="btn-sm btn-gradient btn-primary text-light px-5 py-1 h-75"
            variant="light"
            onClick={() => onHide(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}