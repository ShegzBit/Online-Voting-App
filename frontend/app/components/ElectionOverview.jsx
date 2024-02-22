import React, { useState, useEffect, useCallback } from "react";
import { useElection } from "@/app/contexts/electionContext";
import { useUser } from "@/app/contexts/userContext";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { updateElection } from "@/lib/electionHelper";
import StartElection from "./modals/StartElection";
import { convertMilliSecondsIntoLegibleString } from "@/lib/general";

export default function ElectionOverview() {
  const { election, setElection } = useElection();
  const [timeLeft, setTimeLeft] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const { user } = useUser();
  const [show, setShow] = useState(false);

  const currentDate = moment(new Date());
  const startDate = moment(election.start_date);
  const endDate = moment(election.end_date);

  const handleSetTime = useCallback(() => {
    if (currentDate.isAfter(startDate)) {
      setHasStarted(true);
    }
    const ms = moment.duration(endDate.diff(currentDate)).asMilliseconds()
    setTimeLeft(convertMilliSecondsIntoLegibleString(ms));
  }, [startDate, endDate]);

  useEffect(() => {
    const handleInterval = setInterval(handleSetTime, 1000);
    return () => clearInterval(handleInterval);
  }, [handleSetTime]);


  return (
    <div className="d-flex flex-column gap-4">
    <div
      className="flex flex-column rounded-2 px-3 py-2 align-items-start border mt-3"
      style={{ backgroundColor: "#FAFBFC" }}
    >
      {!hasStarted ? (
        <div>
            <p className="mb-0 text-muted " style={{ fontSize: ".8rem" }}>
            This Election has not started yet
          </p>
          <p className="fs-1 fw-bolder">
          -- : -- : --
          </p>
        </div>
      ) : (
        <div>
          <p className="mb-0 text-muted " style={{ fontSize: ".8rem" }}>
            Election will end in
          </p>
          <p className="">
            <span className="fs-1 fw-bolder">{timeLeft.split(":")[0]}</span>
            <span className="fw-bolder" style={{ fontSize: ".8rem" }}>
              h
            </span>
            <span className="fs-1 fw-bolder">:</span>
            <span className="fs-1 fw-bolder">{timeLeft.split(":")[1]}</span>
            <span className="fw-bolder" style={{ fontSize: ".8rem" }}>
              m
            </span>
            <span className="fs-1 fw-bolder">:</span>
            <span className="fs-1 fw-bolder">{timeLeft.split(":")[2]}</span>
            <span className="fw-bolder" style={{ fontSize: ".8rem" }}>
              s
            </span>
          </p>
        </div>
      )}
      <div>
        <p className="mb-0 text-muted" style={{ fontSize: ".8rem" }}>
          Election name
        </p>
        <p className="fw-semibold">{election?.title}</p>
      </div>
      <div className="">
        <div className="d-flex justify-content-between">
          <div>
            <p className="mb-0 text-muted" style={{ fontSize: ".8rem" }}>
              Start date
            </p>
            <p className="fw-semibold">{election?.start_date}</p>
          </div>
          <div>
            <p className="mb-0 text-muted" style={{ fontSize: ".8rem" }}>
              End date
            </p>
            <p className="fw-semibold">{election?.end_date}</p>
          </div>
        </div>
        <div>
          <p className="mb-0 text-muted" style={{ fontSize: ".8rem" }}>
            Number of ballots
          </p>
          <p className="fw-semibold">
            {election.candidates &&
              [new Set(election.candidates.map((x) => x.position))].length + 1}
          </p>
        </div>
        <div>
          <p className="mb-0 text-muted " style={{ fontSize: ".8rem" }}>
            Expected voters
          </p>
          <p className="fw-semibold">{election?.expected_voters}</p>
        </div>
        <div>
          <p className="mb-0 text-muted" style={{ fontSize: ".8rem" }}>
            Description
          </p>
          <p className="fw-semibold">{election?.description}</p>
        </div>
      </div>
    </div>
      {!hasStarted && <Button
            className="btn-sm btn-gradient btn-primary text-light px-5 py-2 h-75 rounded-3"
            variant="light"
            onClick={() => setShow(true)}
          >
            Start Election Anyway
          </Button>}
          <StartElection show={show} onHide={setShow} />
    </div>
  );
}
