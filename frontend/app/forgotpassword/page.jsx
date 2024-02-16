import Button from "../components/Button"
export default function ForgotPassword() {
    return (
        <form>
            <div className="container " style={{ borderRadius: "20px", overFlow: "hidden" }}>
                <div className="row justify-content-center">
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <h1 className="card-title mb-0">Forgot Password?</h1>
                        <p className="card-subtitle">We will send you a recovery password to the email address associated with this account</p>
                        <div className="form-floating mb-2">
                            <input type="email" className="form-control rounded-4" id="floatingInput" placeholder="" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="d-grid gap-2">
                            {/* <button href="#" className="btn btn-primary">Submit</button> */}
                            <Button text={"Continue"} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}