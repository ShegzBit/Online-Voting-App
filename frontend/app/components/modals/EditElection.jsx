import { useElection } from "@/app/contexts/electionContext";
import { getUser } from "@/lib/authHelper";
import { updateElection } from "@/lib/electionHelper";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Datetime from "react-datetime";
import Loader from "../core/Loader";

export default function EditElection({ show, onHide, election }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: election.title,
    description: election.description,
    start_date: election.start_date,
    end_date: election.end_date,
    error: "",
    isSuccess: false,
    fwdParam: "",
  });
  const { setElection } = useElection();

  const handleChange = (name) => (event) => {
    if (name != "start_date" && name != "end_date") {
      setValues({
        ...values,
        [name]: event.target.value,
      });
    } else {
      setValues({
        ...values,
        [name]: event.format("YYYY-MM-DD HH:mm:ss"),
      });
    }
  };


  const handleSubmit = async () => {
    const { title, description, start_date, end_date } = values;
    const isError = (title && description && end_date) === "";
    if (isError) {
      setValues({
        ...values,
        error: "No input",
        isSuccess: false,
      });
      return;
    }
    if (!isError) {
    }
    try {
      setLoading(true);
      const res = await updateElection(getUser().id, election.id, {
        title,
        description,
        start_date,
        end_date,
      });
      setElection(res);
      setLoading(false);
      onHide(false);
      console.log(res);
    } catch (e) {
      console.log(e);
      return;
    }
  };


  return (
    <>
      <Modal show={show} onHide={onHide}>
        {/* <div className="modal-dialog">
                    <div className="modal-content"> */}
        <Modal.Header closeButton>
          <Modal.Title>New Election</Modal.Title>
        </Modal.Header>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="projectName" className="form-label">
              Enter election name
            </label>
            <input
              defaultValue={election.title}
              type="text"
              className="form-control rounded-4"
              style={{ height: "56px" }}
              id="projectName"
              placeholder="Enter Election name"
              onChange={handleChange("title")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="projectDesc" className="form-label">
              Enter election description
            </label>
            <textarea
              defaultValue={election.description}
              className="form-control rounded-3"
              id="projectDesc"
              rows="3"
              placeholder="A brief overview of the project"
              onChange={handleChange("description")}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Enter start date
            </label>
            {/* <input value={values.start_date} type="date" className="form-control" id="startDate" rows="3" onChange={handleChange('start_date')} /> */}
            <Datetime
              onChange={handleChange("start_date")}
              timeFormat="HH:mm:ss"
              dateFormat="DD-MM-YYYY"
              initialValue={election.start_date}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              Enter End date
            </label>
            <Datetime
              onChange={handleChange("end_date")}
              timeFormat="HH:mm:ss"
              dateFormat="DD-MM-YYYY"
              initialValue={election.end_date}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={handleSubmit}
            type="button"
            className="btn btn-gradient btn-primary w-100"
            aria-label="Save election"
            disabled={loading}
          >
            {loading ? <Loader /> : "Save changes"}
          </button>
        </div>
      </Modal>
    </>
  );
}
