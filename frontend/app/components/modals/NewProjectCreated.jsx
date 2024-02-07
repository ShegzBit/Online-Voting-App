import Button from "../Button"
import { useRouter } from "next/navigation"

export default function ProjectCreated() {
    const router = useRouter()
    const handleClick = () => {
        // Check validations and redirect
        // redirect(`/elections/${1}`)
        console.log("hello")
        router.push("/elections/1")
        window.location.reload
    }
    return (
        <>
            <div className="modal fade" id="projCreated" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Project</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h1 className="display-6">Hooray! 🎉 Your project was created</h1>
                            <p>Take it to the next level by adding additional voting options. Engage your audience and make your project shine!</p>
                        </div>
                        <div className="modal-footer">
                            {/* <button onClick={handleClick} type="button" className="btn btn-outline-secondary px-5">Finish setting up</button> */}
                            <Button cb={handleClick} text="Finish setting up" classNames="px-5 w-100" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}