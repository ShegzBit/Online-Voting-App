import Button from "../components/Button"


export default function SignUp() {
    return (
        <div className="px-2">
            <div className="card container " style={{ borderRadius: "20px", overFlow: "hidden" }}>
                <div className="row justify-content-center">
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <h1 className="card-title mb-0">Create a new account</h1>
                        <p className="card-subtitle">Please enter your details to create an account</p>
                        <div className="form-floating mb-2">
                            <input type="email" className="form-control rounded-4" id="floatingInput" placeholder="" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input type="email" className="form-control rounded-4" id="floatingInput" placeholder="" />
                            <label htmlFor="floatingInput">Full name</label>
                        </div>

                        <div className="form-floating mb-2">
                            <input type="password" className="form-control rounded-4" id="floatingPassword" placeholder="" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>


                        <div className="d-flex justify-content-between gap-2">
                            <div className="">
                                {/* <label htmlFor="floatingPassword" style={{ fontSize: ".7rem"}}>Country</label> */}
                                <select className="form-select py-3 rounded-4" aria-label="Default select example" disabled>
                                    <option defaultValue={'+233'}>+233</option>
                                    <option value="1">One</option>
                                </select>
                            </div>
                            <div className="form-floating w-75 mb-4">
                                <input type="password" className="form-control rounded-4" id="floatingPassword" placeholder="" />
                                <label htmlFor="floatingPassword">Mobile number</label>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="mb-5" style={{ fontSize: ".8rem" }}>By signing up, you agree to our <a href="#" className="link-success link-offset-2 link-underline link-underline-opacity-0 ">terms & conditions</a></p>
                        </div>

                        <div className="d-grid gap-2">
                            {/* <button href="#" className="btn btn-primary">Submit</button> */}
                            <Button text={"Sign Up"} />
                            <p className="mt-3 text-center">Already have an account? <a href="#" className=" fw-semibold link-success link-offset-2 link-underline link-underline-opacity-0">Log in here </a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}