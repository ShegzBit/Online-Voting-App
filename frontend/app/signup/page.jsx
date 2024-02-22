"use client"

import Button from "../components/Button"
import { useState, useEffect } from 'react'
import { createUser, signIn } from '@/lib/authHelper'
import { useRouter } from "next/navigation"
import Loader from '../components/core/Loader'



export default function SignUp() {
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        error: '',
        isSuccess: false,
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (userData.isSuccess) {
            setLoading(false)
            router.push('/signin')
        }
    }, [userData.isSuccess, router])


    const handleChange = (name) => (event) => {
        setUserData({
            ...userData,
            [name]: event.target.value
        })
    }

    const handleSubmit = async () => {
        const { first_name, last_name, email, password } = userData;
        const valueError = (first_name && last_name && email && password) === ''

        if (valueError) {
            setUserData({
                ...userData,
                error: 'No input',
                isSuccess: false
            })
            return
        }

        try {
            setLoading(true)
            await createUser(userData).then((data) => {
                if (data.user) {
                    setLoading(false)
                    setUserData({
                        ...userData,
                        isSuccess: true
                    })
                }
            })

        } catch (e) {
            setUserData({
                ...userData,
                error: e,
                isSuccess: false
            })
            setLoading(false)
        }
    }



    return (
        <div className="px-2">
            <div className="container" style={{ borderRadius: "20px", overFlow: "hidden" }}>
                <div className="row justify-content-center">
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <h1 className="card-title mb-0">Create a new account</h1>
                        <p className="card-subtitle">Please enter your details to create an account</p>
                        <div className="form-floating mb-2">
                            <input name='email' value={userData.email} type="email" className="form-control rounded-4" id="floatingInput" placeholder="" onChange={handleChange('email')} />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input value={userData.first_name} type="text" className="form-control rounded-4" id="floatingInput" placeholder="" onChange={handleChange('first_name')} />
                            <label htmlFor="floatingInput">First name</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input value={userData.last_name} type="text" className="form-control rounded-4" id="floatingInput" placeholder="" onChange={handleChange('last_name')} />
                            <label htmlFor="floatingInput">Last name</label>
                        </div>

                        <div className="form-floating mb-2">
                            <input value={userData.password} type="password" className="form-control rounded-4" id="floatingPassword" placeholder="" onChange={handleChange('password')} />
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
                                <input type="number" className="form-control rounded-4" id="floatingPassword" placeholder="" />
                                <label htmlFor="floatingPassword">Mobile number</label>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="mb-5" style={{ fontSize: ".8rem" }}>By signing up, you agree to our <a href="#" className="link-success link-offset-2 link-underline link-underline-opacity-0 ">terms & conditions</a></p>
                        </div>

                        <div className="d-grid gap-2">
                            {/* <button href="#" className="btn btn-primary">Submit</button> */}
                            <Button cb={handleSubmit} text={loading ? <Loader /> : "Sign Up"} disabled={loading}/>
                            <p className="mt-3 text-center">Already have an account? <a href="/signin" className=" fw-semibold link-success link-offset-2 link-underline link-underline-opacity-0">Log in here </a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}