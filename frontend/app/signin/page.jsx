import Button from "../components/Button"
export default function SignInPage() {
    return(
        <form>
            <div className="card " style={{borderRadius: "20px", overFlow: "hidden"}}>
                <h1 className="card-title mb-4">Sign in</h1>
                <p className="card-subtitle">Please enter your details to sign in</p>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control rounded-4" id="floatingInput" placeholder="" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control rounded-4" id="floatingPassword" placeholder="" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="d-grid gap-2">
                    {/* <button href="#" className="btn btn-primary">Submit</button> */}
                    <Button text={"Sign In"} />
                </div>
            </div>
        </form>
    )
}