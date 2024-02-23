import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateElection, addCandidateImage } from "@/lib/electionHelper";
import { useUser } from "@/app/contexts/userContext";
import { useElection } from "@/app/contexts/electionContext";
import { getElection } from "@/lib/electionHelper";

function AddNewBallot({ show, onHide, electionId }) {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    position: "",
    isError: false,
    profile_image: "",
  });
  const [image, setImage] = useState("");
  const { user } = useUser();
  const { setElection } = useElection();

  const handleChange = (key) => (e) => {
    setData({
      ...data,
      [key]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', image);

      console.log(image);
      if (image) {
        const imgRes = await addCandidateImage(formData);
        setData({
          ...data,
          profile_image: imgRes?.imageUrl,
        });

      const { isError, ...rest } = data;
      
      const res = await updateElection(user?.id, electionId, {
        candidates: [{ ...rest, profile_image: imgRes?.imageUrl }],
      });
      if (res) {
        setElection(res);
      }
      const updatedElection = await getElection(electionId);
      setElection(updatedElection);
      onHide();
      }

      if (!image) {
        const { isError, ...rest } = data;
        const res = await updateElection(user?.id, electionId, {
          candidates: [{ ...rest, profile_image: 'https://placehold.co/600x400?text=No image' }],
        });
        if (res) {
          setElection(res);
        }
        const updatedElection = await getElection(electionId);
        setElection(updatedElection);
        onHide();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Ballot paper</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="ballotName" className="form-label">
              Candidate’s first name
            </label>
            <input
              onChange={handleChange("first_name")}
              value={data.first_name}
              type="text"
              className="form-control rounded-4"
              style={{ height: "56px" }}
              id="ballotName"
              placeholder="Enter candidate’s name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ballotName" className="form-label">
              Candidate’s last name
            </label>
            <input
              onChange={handleChange("last_name")}
              value={data.last_name}
              type="text"
              className="form-control rounded-4"
              style={{ height: "56px" }}
              id="ballotName"
              placeholder="Enter candidate’s name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ballotLimit" className="form-label">
              Position
            </label>
            <input
              type="text"
              value={data.position}
              className="form-control rounded-4"
              style={{ height: "56px" }}
              id="ballotLimit"
              placeholder="Enter name of position"
              onChange={handleChange("position")}
            />
            <input
              type="file"
              name="photo"
              className="form-control rounded-4"
              style={{ height: "56px" }}
              id="photo"
              onChange={handleImageChange}
            />
          </div>
          {/* <Contestants setContestants={setContestants} contestants={contestants}  /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-success"
            className="btn-sm px-5 py-1 h-75 base-color text-bold"
            onClick={onHide}
          >
            Go back
          </Button>
          <Button
            className="btn-sm btn-gradient btn-primary text-light px-5 py-1 h-75"
            variant="light"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Contestants({ contestants, setContestants }) {
  const [contestant, setContestant] = useState("");
  const [editValue, setEditValue] = useState("");
  const [valueData, setValueData] = useState([]);

  const handleChange = () => (e) => {
    setContestant(e.target.value);
  };

  const handleClick = () => {
    if (contestant) {
      setContestants((prev) => [...prev, contestant]);
    }
    setContestant("");
  };

  const handleEditChange = (index) => (e) => {
    // setData((prevState) => prevState.filter((x) => x !== data[key]));
    const value = e.target.value;
    setEditValue(value);
    setContestants((prev) => {
      prev[index] = value;
      return prev;
    });
  };
  return (
    <div>
      <p className="text-bold">Contestants</p>
      {/* {data.length > 0 &&
        data.map((element, i) => (
          <div key={i} className="d-flex justify-content-between">
            <p className="fs-6">{`${i}. ${element}`}</p>
            <button
              className="rounded-circle m-0 p-0 border-0 text-danger"
              style={{
                backgroundColor: "#FFE6E6",
                width: "28px",
                height: "28px",
              }}
              onClick={() => handleRemove(i)}
            >
  // useEffect(() => {
  //   setData(prev => prev.map((x, i) => ))
  // }, [editValue])
              <GoTrash />
            </button>
          </div>
        ))} */}
      {contestants.length > 0 &&
        contestants.map(
          (element, i) =>
            element !== "" && (
              <div key={i} className="mb-3 d-flex align-items-center gap-4">
                <label htmlFor="contestandName" className="form-label fs-6">
                  {`${i + 1}`}
                </label>
                <input
                  value={element}
                  onChange={handleEditChange(i)}
                  // defaultValue={element}
                  type="text"
                  className="form-control rounded-4"
                  style={{ height: "56px" }}
                  id="contestandName"
                  placeholder="Enter name of contestants"
                />
              </div>
            )
        )}
      <div className="mb-3 d-flex align-items-center gap-4">
        <label htmlFor="contestandName" className="form-label fs-6">
          {contestants.length + 1}
        </label>
        {/* {data.length > 0 &&
          data.map((element, i) => (
            <div key={i} className="d-flex justify-content-between">
              <label htmlFor="contestandName" className="form-label fs-6">
                {`${i}. ${element}`}
              </label>
              <input
                value={element}
                // onChange={handleChange()}
                type="text"
                className="form-control rounded-4"
                style={{ height: "56px" }}
                id="contestandName"
                placeholder="Enter name of contestants"
              />
            </div>
          ))} */}
        <input
          value={contestant}
          onChange={handleChange()}
          type="text"
          className="form-control rounded-4"
          style={{ height: "56px" }}
          id="contestandName"
          placeholder="Enter name of contestants"
        />
      </div>
      <p
        onClick={handleClick}
        className="text-success text-center user-select-auto"
      >
        Add new contestant
      </p>
    </div>
  );
}

export default AddNewBallot;
