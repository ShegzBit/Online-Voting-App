import Button from "../components/Button"
export default function SignInPage() {
    return (
        <form>
            <div className="container " style={{ borderRadius: "20px", overFlow: "hidden" }}>
                <div className="row justify-content-center">
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <h1 className="card-title mb-0">Sign in</h1>
                        <p className="card-subtitle">Please enter your details to sign in</p>
                        <div className="form-floating mb-2">
                            <input type="email" className="form-control rounded-4" id="floatingInput" placeholder="" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control rounded-4 mb-2" id="floatingPassword" placeholder="" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="mb-5">
                            <a href="#" className="link-success link-offset-2 link-underline link-underline-opacity-0 " style={{ fontSize: ".8rem" }}>Forgot password?</a>
                        </div>
                        <div className="d-grid gap-2">
                            {/* <button href="#" className="btn btn-primary">Submit</button> */}
                            <Button text={"Sign In"} />
                            <p className="mt-3 text-center">Don’t have an account? <a href="#" className=" fw-semibold link-success link-offset-2 link-underline link-underline-opacity-0">Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}