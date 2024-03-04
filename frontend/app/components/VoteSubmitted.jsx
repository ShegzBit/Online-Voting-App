/* Thank you page after voting successfully*/

import Thumbs from '@/public/thumbs-up.gif';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function VoteSubmitted({electionId}) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    console.log("Show live results");
  };
  return (
    <>
      <div className="container d-flex flex-column justify-content-center" style={{height: '600px'}}>
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="d-flex justify-content-center">
              <Image 
              src={Thumbs}
              alt="thumbs up animation"
              className="me-3 rounded-2 object-fit-cover"
              width={100}
              height={100}
              />
            </div>
            <p className="card-subtitle mt-3 text-center">
            Thank you for participating!<br />
            Your vote has been successfully submitted.
            </p>
            <div className="d-grid mb-5">
                    {/* <Button text={"Show live results"} cb={handleSubmit} disabled={loading} /> */}
                    <Link className={`btn btn-gradient btn-primary`} href={`/election/${electionId}/electionresults`}>
                      Show live results
                    </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}