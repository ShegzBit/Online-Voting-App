import Button from "../Button"
import ElectionCreated from "./ElectionCreatedSucess"
import { useState } from "react"
import { Modal } from "react-bootstrap"
import { formatDate } from '@/lib/general'
import { createElection } from '@/lib/electionHelper'
import { getUser } from '@/lib/authHelper'
import Datetime from 'react-datetime';
import moment from 'moment'
import Loader from '../core/Loader'


export default function ElectionDetails({ show, onHide }) {
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        title: '',
        description: '',
        start_date: moment(),
        end_date: moment(),
        error: '',
        isSuccess: false,
        fwdParam: '',
    })


    const handleChange = (name) => (event) => {
        if (name != 'start_date' && name != 'end_date') {
            setValues({
                ...values,
                [name]: event.target.value
            })
        } else {
            setValues({
                ...values,
                [name]: event.format('YYYY-MM-DD HH:mm:ss')
            })
        }
        
    }

    const handleShow = (key) => {
        // if (key === 'open') {
        //     setShowModal(true)
        // } else {
        //     setShowModal(false)
        // }
        onHide()
        setShowModal(!showModal)
    }

    const handleSubmit = async () => {
        const {title, description, start_date, end_date} = values;
        const isError = (title && description && end_date) === ''
        if (isError) {
            setValues({
                ...values,
                error: 'No input',
                isSuccess: false
            })
            return
        }
        if (!isError) {

        }
        try {
            setLoading(true)
            const res = await createElection({
                admin_id: getUser().id,
                election: {
                    title,
                    description,
                    start_date,
                    end_date,
                }
            })
            setValues({
                ...values,
                fwdParam: res.election.id
            })
            setLoading(false)
            onHide()
            setShowModal(!showModal)
            console.log(res)
        } catch (e) {
            console.log(e)
            return
        }
    }
    return (
        <>
            <Modal show={show} onHide={onHide}>
                {/* <div className="modal-dialog">
                    <div className="modal-content"> */}
                    <Modal.Header closeButton>
                        <Modal.Title>New Project</Modal.Title>
                    </Modal.Header>
                        <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="projectName" className="form-label">Enter project name</label>
                            <input value={values.title} type="text" className="form-control rounded-4" style={{ height: "56px"}} id="projectName" placeholder="Enter Election name" onChange={handleChange('title')} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="projectDesc" className="form-label">Enter project description</label>
                            <textarea value={values.description} className="form-control rounded-3" id="projectDesc" rows="3" placeholder="A brief overview of the project" onChange={handleChange('description')}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="startDate" className="form-label">Enter start date</label>
                            {/* <input value={values.start_date} type="date" className="form-control" id="startDate" rows="3" onChange={handleChange('start_date')} /> */}
                        <Datetime onChange={handleChange('start_date')} timeFormat='HH:mm:ss' dateFormat='DD-MM-YYYY' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="endDate" className="form-label">Enter End date</label>
                            {/* <input value={values.end_date} type="date" className="form-control" id="endDate" rows="3" onChange={handleChange('end_date')} /> */}
                        <Datetime onChange={handleChange('end_date')} timeFormat='HH:mm:ss' dateFormat='DD-MM-YYYY' />

                        </div>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-outline-secondary px-5" data-bs-dismiss="modal">Close</button> */}
                            <button onClick={handleSubmit} type="button" className="btn btn-gradient btn-primary w-100" aria-label="Create project" disabled={loading}>{loading ? <Loader /> : "Continue"}</button>
                        </div>
                    {/* </div>
                </div> */}
            </Modal>
            <ElectionCreated electionId={values.fwdParam} show={showModal} onHide={handleShow} />
        </>
    )
}
