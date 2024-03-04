"use client";

import Fab from "./Fab";
import NewElection from "./modals/NewElection";
import EmptyElections from "./EmptyElections";
import ElectionCard from "./ElectionCard";
import { useElections } from "../contexts/electionsContext";

export default function DashBoard({ isEmpty }) {
  return (
    <>
      {isEmpty ? (
        <div className="container">
          <EmptyElections />
          <NewElection />
        </div>
      ) : (
        <Elections />
      )}
      <Fab />
    </>
  );
}

const Elections = () => {
  const { elections } = useElections();
  return (
    <div>
      <div className="container">

      {elections && (
        <div className=" d-flex flex-column gap-2 mt-4">
          <h1 className="card-title">My Elections</h1>
          {elections.map((election) => (
            <ElectionCard key={election.id} election={election} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};
