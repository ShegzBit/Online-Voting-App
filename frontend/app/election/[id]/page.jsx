/* Voter authentication page */
"use client";
import Button from "@/app/components/Button";
import { useState, useEffect } from "react";
import Loader from "@/app/components/core/Loader";
import { useRouter } from "next/navigation";
import Form from "react-bootstrap/Form";
import { useUser } from "@/app/contexts/userContext";
import { useElection } from "@/app/contexts/electionContext";
import { getElection, getVoters } from "@/lib/electionHelper";
// import VoterLoader from "../components/core/VoterLoader";

export default function VerifyVoter({ params }) {
  const [validated, setValidated] = useState(false);
  const [voters, setVoters] = useState(null);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    voter_id: "",
  });

  const { election, setElection } = useElection();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { updateUser } = useUser();

  useEffect(() => {
    if (isVerified) {
      updateUser(userData);
      setLoading(false);
      const hasVoted = election?.voters.some(
        (el) => el.voter_id === userData.voter_id
      );
      if (hasVoted) {
        router.push(`/election/${params.id}/electionresults`);
        return;
      }
      router.push(`/election/${params.id}/instructions`);
    }
  }, [isVerified]);

  useEffect(() => {
    const getRes = async () => {
      try {
        const res = await getElection(params.id);
        if (res) {
          setElection(res);
          setVoters(res.voters_id);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getRes();
  }, []);

  const handleChange = (name) => (event) => {
    setUserData({
      ...userData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (voters && userData.voter_id) {
        setIsVerified(voters.includes(userData.voter_id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div
        className="container "
        style={{ borderRadius: "20px", overFlow: "hidden" }}
      >
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h1 className="card-title mb-0">Verify your identity</h1>
            <p className="card-subtitle">
              Please enter your details and voter id to access election
            </p>
            {/* <Form validated={validated} noValidate onSubmit={handleSubmit}> */}
            <div className="form-floating mb-2">
              <input
                value={userData.first_name}
                type="text"
                className="form-control rounded-4"
                id="floatingInput"
                placeholder=""
                onChange={handleChange("first_name")}
              />
              <label htmlFor="floatingInput">First name</label>
            </div>
            <div className="form-floating mb-2">
              <input
                value={userData.last_name}
                type="text"
                className="form-control rounded-4"
                id="floatingInput"
                placeholder=""
                onChange={handleChange("last_name")}
              />
              <label htmlFor="floatingInput">Last name</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control rounded-4"
                id="floatingInputValid"
                placeholder=""
                onChange={handleChange("voter_id")}
                required
              />
              <label htmlFor="floatingInputValidation">Voter id</label>
              <div className="valid-feedback">Looks good!</div>
            </div>
            {/* </Form> */}
            <div className="d-grid mt-5">
              <Button
                text={loading ? <Loader /> : "Verify me"}
                cb={handleSubmit}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
