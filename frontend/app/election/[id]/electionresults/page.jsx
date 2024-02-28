'use client'

/*Election live results*/
import { convertMilliSecondsIntoLegibleString } from "@/lib/general";
import React, { useState, useEffect, useCallback } from "react";
import { useElection } from "@/app/contexts/electionContext";
import { getElection, getResults } from "@/lib/electionHelper";
import { useUser } from "@/app/contexts/userContext";
import moment from "moment";
import Image from "next/image";
import Button from '@/app/components/Button';

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
            <h1 className="card-title mb-0">{election?.title}</h1>
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
            {/* <ShowChoicesPreview ballots={results} /> */}
          </div>
        </div>
      </div>
    </>
  );
}


const ShowChoicesPreview = ({ choices, group, ...props }) => {
  const { election } = useElection()
  const { user } = useUser()


  const handleVote = async () => {
    try {
      // Object.values(choices).forEach( (choice) => {
      //   console.log(choice);
      //   vote(election.id, {
      //     ...user,
      //     candidate_id: choice,
      //   });
      // })
      props.setVoted(true);
    
    } catch (e) {
      console.log(e);
    }
  }

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
          <Button cb={handleVote} classNames='' text={"Submit votes"} />
    </div>
  );
};