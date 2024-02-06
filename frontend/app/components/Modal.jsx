import Button from "./Button"
export default function Modal() {
    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Project</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                                <li className="list-group-item border-0 d-flex">
                                    <input className="form-check-input me-2" type="radio" name="listGroupRadio" value="" id="firstRadio" checked />
                                    <div className="d-flex flex-column">
                                        <label className="form-check-label lh-1 fs-6 mb-2" for="firstRadio">Online Voting</label>
                                        <p className='text-muted lh-sm px-0' style={{ fontSize: ".8rem"}}>Set up elections and allow voters participate remotely from anywhere,</p>
                                    </div>
                                </li>
                                <li className="list-group-item border-0 d-flex">
                                    <input className="form-check-input me-2" type="radio" name="listGroupRadio" value="" id="secondRadio" disabled />
                                    <div className="d-flex flex-column">
                                    <label className="form-check-label lh-1 fs-6 text-muted mb-2" for="secondRadio">Live Voting</label>
                                    <p className='text-muted lh-sm px-0' style={{ fontSize: ".8rem"}}>Coming Soon</p>
                                    </div>
                                </li>
                                <li className="list-group-item border-0 d-flex">
                                    <input className="form-check-input me-2" type="radio" name="listGroupRadio" value="" id="thirdRadio" disabled />
                                    <div className="d-flex flex-column">
                                    <label className="form-check-label lh-1 fs-6 text-muted mb-2" for="thirdRadio">Nomination</label>
                                    <p className='text-muted lh-sm px-0' style={{ fontSize: ".8rem"}}>Coming Soon</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary px-5" data-bs-dismiss="modal">Close</button>
                            <Button text="Continue" classNames="px-5" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}