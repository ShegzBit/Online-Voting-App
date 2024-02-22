import Image from "next/image";
import { Accordion } from "react-bootstrap";
import { useElection } from "../contexts/electionContext";

function LiveResults() {
    const { election } = useElection();

    const groupedByPosition = election?.candidates.reduce((acc, obj) => {
      const key = obj.position;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
    
    const positions = Object.keys(groupedByPosition);
    return (
      <div>
        {positions &&
          positions.map((element, i) => (
            <Accordion
              className="mt-2 d-flex flex-column gap-1"
              defaultActiveKey="0"
              flush
              key={i}
            >
              <Accordion.Item className="border border-2" eventKey={i}>
                <Accordion.Header>{element}</Accordion.Header>
                <Accordion.Body>
                  {groupedByPosition[element].map((obj, j) => (
                    <div className="d-flex justify-content-between align-content-center col-lg-6 col-md-6 col-sm-12" key={j}>
                      <div className="d-flex gap-3">
                        <Image src={obj.profile_image} alt={obj.full_name} width={50} height={50} className="rounded-circle object-fit-cover" />
                        <div>
                        <p className="">{obj.full_name}</p>
                        <p className="">Votes: {obj.votes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
      </div>
    );
  }

  export default LiveResults;