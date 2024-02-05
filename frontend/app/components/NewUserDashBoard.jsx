import Button from './Button';

export default function NewUserDashBoard({ toggle, isNew }) {

    return (
        <div className='container'>
            <h1 className="card-title mb-4">My Projects</h1>
            {isNew && <div className="alert alert-success" role="alert">
                <div className="d-flex justify-content-between">
                    <p className='alert-heading'>Congratulations on joining our platform! 🎉</p>
                    <button onClick={() => toggle(false)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <p>Start shaping the future by creating your first project today. </p>
                <p>Best of luck with your elections! 🗳️🌟</p>
            </div>}
            <hr />
            <Button text={"New Project"} classNames="w-100" />
        </div>
    )
}