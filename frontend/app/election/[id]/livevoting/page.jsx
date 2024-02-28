"use client";

/*Live voting interface*/
import { useElection } from "../../../contexts/electionContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getElection, vote } from "@/lib/electionHelper";
import Button from "@/app/components/Button";
import { useUser } from "@/app/contexts/userContext";
import VoteSubmitted from "@/app/components/VoteSubmitted";

function LiveVoting({ params }) {
  const { election, setElection } = useElection();
  const [group, setGroup] = useState(null);
  const [pos, setPos] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showVoted, setShowVoted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const getElectionData = async () => {
      try {
        const res = await getElection(params.id);
        if (res) {
          setElection(res);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getElectionData();
  }, [params.id]);

  useEffect(() => {
    if (election) {
      setGroup(() => {
        const groupedByPosition = election?.candidates?.reduce((acc, obj) => {
          const key = obj.position;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});
        return groupedByPosition;
      });
    }

    if (group) {
      setPos(Object.keys(group));
    }
  }, [election]);

  if (!election) {
    return null;
  }

  if (showVoted) {
    return <VoteSubmitted electionId={election.id} />;
  }
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h1 className="card-title mb-0">{election?.title}</h1>
            {!showPreview ? (
              <p className="card-subtitle mb-5">
                Choose your preferred candidate and tap &apos;Next&apos; to cast your vote
                and move on to the next.
              </p>
            ) : (
              <p className="card-subtitle mb-5">
                Carefully review your selections. When you&apos;re ready, press
                &apos;Submit&apos; to finalize your choices.
              </p>
            )}
            {election ? (
              <Positions
                election={election}
                pos={pos}
                group={group}
                showPreview={showPreview}
                setPreview={setShowPreview}
                voted={showVoted}
                setVoted={setShowVoted}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

function Positions({ pos, group, showPreview, setPreview, ...props }) {
  const [activePage, setActivePage] = useState(0);
  const [choices, setChoices] = useState({});
  const [hasVoted, setHasVoted] = useState(false);

  const handleNext = () => {
    if (activePage < pos.length - 1) {
      setActivePage(activePage + 1);
    }

    if (activePage === pos.length - 1) {
      setPreview(true);
    }
    setHasVoted(false);
  };

  const handlePrev = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
    }
  };

  const activePosition = pos[activePage];

  const handleChoice = (e) => {
    setHasVoted(e.target.value !== "");
    setChoices({
      ...choices,
      [pos[activePage]]: e.target.value,
    });
  };

  if (showPreview) {
    return (
      <ShowChoicesPreview
        choices={choices}
        group={group}
        voted={props.showVoted}
        setVoted={props.setVoted}
      />
    );
  }
  return (
    <div>
      {group && activePosition && (
        <div>
          <h5 className="mt-2 fw-bold">{activePosition}</h5>
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex flex-column">
              {/* <input
                className="form-check-input me-2"
                type="radio"
                name="listGroupRadio"
                // value=""
                id="candidateRadio"
                onChange={handleChoice}
                checked={choices[activePage]}
              />
              <label htmlFor="candidateRadio"> */}
              {group[activePosition].map((obj, j) => (
                <div style={{ width: "15rem" }} key={j}>
                  <div className="card-body mb-4">
                    <div className="d-flex align-items-center">
                      <input
                        className="me-3"
                        type="radio"
                        name="candidate"
                        value={obj.id}
                        onChange={handleChoice}
                        checked={choices[activePosition] === obj.id}
                      />
                      <Image
                        src={obj.profile_image}
                        alt={obj.full_name}
                        className="me-3 rounded-2 object-fit-cover"
                        width={72}
                        height={72}
                      />
                      <div>
                        <p className="fs-5">{obj.full_name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* </label> */}
            </div>
          </div>
          {activePage > 0 && (
            <Button text={"Prev"} cb={handlePrev} classNames="me-3" />
          )}
          <Button text={"Next"} cb={handleNext} disabled={!hasVoted} />
        </div>
      )}
    </div>
  );
}
export default LiveVoting;

const ShowChoicesPreview = ({ choices, group, ...props }) => {
  const { election } = useElection();
  const { user } = useUser();
  console.log(choices);

  const handleVote = async () => {
    try {
      Object.values(choices).forEach(async (choice) => {
        console.log(choice);
        const res = await vote(election.id, {
          ...user,
          candidate_id: choice,
          email: user.voter_id,
        });
        props.setVoted(true);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const keys = [];

  Object.keys(choices).map((key, i) => {
    Object.keys(group).map((k, j) => {
      if (key === k) {
        keys.push(group[k]);
      }
    });
  });

  return (
    <div className="d-flex flex-column gap-4">
      {Object.keys(choices).map((key, i) => (
        <div key={i} className="">
          <h5 className="fw-bold">{key}</h5>
          <div className="d-flex align-items-center gap-5">
            <Image
              src={keys[i].find((obj) => obj.id === choices[key]).profile_image}
              alt={keys[i].find((obj) => obj.id === choices[key]).full_name}
              width={72}
              height={72}
            />
            <p>{keys[i].find((obj) => obj.id === choices[key]).full_name}</p>
          </div>
        </div>
      ))}
      <Button cb={handleVote} classNames="" text={"Submit votes"} />
    </div>
  );
};
