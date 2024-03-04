"use client";

/*Election live results*/
import { convertMilliSecondsIntoLegibleString } from "@/lib/general";
import React, { useState, useEffect, useCallback } from "react";
import { useElection } from "@/app/contexts/electionContext";
import { getElection, getResults } from "@/lib/electionHelper";
import { useUser } from "@/app/contexts/userContext";
import moment from "moment";
import Image from "next/image";
import Button from "@/app/components/Button";

export default function ElectionResults({ params }) {
  const { election, setElection } = useElection();
  const [timeLeft, setTimeLeft] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [results, setResults] = useState([]);
  const { user } = useUser();
  const [show, setShow] = useState(false);
  const [group, setGroup] = useState(null);
  const [pos, setPos] = useState([]);

  useEffect(() => {
    const getRes = async () => {
      try {
        const res = await getElection(params.id);
        if (res) {
          setElection(res);
        }
        const results = await getResults(params.id);
        setResults(results.result);
      } catch (e) {
        console.log(e);
      }
    };
    getRes();
  }, []);

  // useEffect(() => {
  //   if (election) {
  //     setGroup(() => {
  //       const groupedByPosition = election?.candidates?.reduce((acc, obj) => {
  //         const key = obj.position;
  //         if (!acc[key]) {
  //           acc[key] = [];
  //         }
  //         acc[key].push(obj);
  //         return acc;
  //       }, {});
  //       return groupedByPosition;
  //     });
  //   }

  //   if (group) {
  //     setPos(Object.keys(group));
  //   }
  // }, [election]);

  const currentDate = moment(new Date());
  const startDate = moment(election.start_date);
  const endDate = moment(election.end_date);

  const handleSetTime = useCallback(() => {
    if (currentDate.isAfter(startDate)) {
      setHasStarted(true);
    }
    const ms = moment.duration(endDate.diff(currentDate)).asMilliseconds();
    setTimeLeft(convertMilliSecondsIntoLegibleString(ms));
    if (currentDate.isAfter(endDate)) {
      setHasStarted(false);
      setHasEnded(true);
    }
  }, [endDate]);

  useEffect(() => {
    let handleInterval = null;
    if (!hasEnded) {
      handleInterval = setInterval(handleSetTime, 1000);
    }
    return () => {
      if (handleInterval) {
        clearInterval(handleInterval);
      }
    };
  }, [handleSetTime, hasEnded]);
  console.log(results);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h1 className="card-title mb-4">{election?.title}</h1>
            {!hasStarted ? (
              <div>
                <p className="mb-0 text-muted " style={{ fontSize: ".8rem" }}>
                  {hasEnded
                    ? "Election has ended"
                    : "This Election has not started yet"}
                </p>
                <p className="fs-1 fw-bolder">-- : -- : --</p>
              </div>
            ) : (
              <div className="mb-4">
                <p className="mb-0 text-muted " style={{ fontSize: ".8rem" }}>
                  Election will end in
                </p>
                <p className="">
                  <span className="fs-1 fw-bolder">
                    {timeLeft.split(":")[0]}
                  </span>
                  <span className="fw-bolder" style={{ fontSize: ".8rem" }}>
                    h
                  </span>
                  <span className="fs-1 fw-bolder">:</span>
                  <span className="fs-1 fw-bolder">
                    {timeLeft.split(":")[1]}
                  </span>
                  <span className="fw-bolder" style={{ fontSize: ".8rem" }}>
                    m
                  </span>
                  <span className="fs-1 fw-bolder">:</span>
                  <span className="fs-1 fw-bolder">
                    {timeLeft.split(":")[2]}
                  </span>
                  <span className="fw-bolder" style={{ fontSize: ".8rem" }}>
                    s
                  </span>
                </p>
              </div>
            )}
            <ShowChoicesPreview ballots={results} />
          </div>
        </div>
      </div>
    </>
  );
}

const ShowChoicesPreview = ({ ballots }) => {
  const { election } = useElection();
  const { user } = useUser();
  const [activePage, setActivePage] = useState(0);

  const handleNext = () => {
    if (activePage < Object.keys(ballots).length) {
      setActivePage(activePage + 1);
    }
  };

  const handlePrev = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
    }
  };

  const activePosition = Object.keys(ballots)[activePage];

  console.log(election);
  return (
    <div className="d-flex flex-column mb-4">
      <div className="d-flex justify-content-between">
        <h5 className="mt-2 fw-semibold mb-4">{activePosition}</h5>
        <p className="card-subtitle text-muted">{`${activePage + 1}/${
          Object.keys(ballots).length
        }`}</p>
      </div>
      <div className="d-flex flex-column align-items-start gap-1">
        {activePosition &&
          ballots[activePosition].map((choice, j) => (
            <div
              className="d-flex justify-items-center align-content-center gap-3 mb-3"
              key={j}
            >
              <Image
                src={choice.profile_image}
                alt={""}
                width={72}
                height={72}
                className=" rounded-2 object-fit-cover"
              />
              <div className="d-flex flex-column justify-content-center">
                <p className="m-0 fs-6 fw-medium">{choice.full_name}</p>
                <p className="m-0 text-muted">
                  Votes:{" "}
                  <span className="text-dark fw-medium">{choice.votes}</span>
                </p>
              </div>
            </div>
          ))}
      </div>
      {Object.keys(ballots).length > 0 && (
        <div>
          {activePage > 0 && (
            // <Button text={"Prev"} cb={handlePrev} classNames="me-3" />
            <button
            onClick={handlePrev}
            type="button"
            className="btn btn-outline-secondary px-5 btn-sm"
            style={{ color: "#024647", borderColor: "#024647" }}
          >
            Previous
          </button>
          )}
          {Object.keys(ballots).length > 1 &&
            activePage < Object.keys(ballots).length - 1 && (
              <Button text={"Next"} cb={handleNext} classNames="btn-sm btn-gradient btn-primary text-light px-5 py-1 h-75" />
            )}
        </div>
      )}
    </div>
  );
};
