"use client"
import { signIn } from "@/lib/authHelper"
import Button from "../components/Button"
import {useState, useEffect } from 'react'
import Loader from '../components/core/Loader'
import { useRouter } from "next/navigation"


export default function SignInPage() {
    const [userData, setUserData] = useState({
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
            router.push('/elections')
        }
    }, [userData.isSuccess])

    const handleChange = (name) => (event) => {
        setUserData({
            ...userData,
            [name]: event.target.value
        })
    }

    const handleSubmit = async () => {
        const { email, password } = userData;
        const valueError = (email && password) === ''

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
            await signIn(userData).then((data) => {
                console.log(userData)
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
        }

    }


    return (
        <div>
            <div className="container " style={{ borderRadius: "20px", overFlow: "hidden" }}>
                <div className="row justify-content-center">
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <h1 className="card-title mb-0">Sign in</h1>
                        <p className="card-subtitle">Please enter your details to sign in</p>
                        <div className="form-floating mb-2">
                            <input type="email" className="form-control rounded-4" id="floatingInput" placeholder="" onChange={handleChange('email')}/>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control rounded-4 mb-2" id="floatingPassword" placeholder="" onChange={handleChange('password')} />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="mb-5">
                            <a href="#" className="link-success link-offset-2 link-underline link-underline-opacity-0 " style={{ fontSize: ".8rem" }}>Forgot password?</a>
                        </div>
                        <div className="d-grid gap-2">
                            {/* <button href="#" className="btn btn-primary">Submit</button> */}
                            <Button text={loading ? <Loader /> : "Sign In"} cb={handleSubmit} disabled={loading}/>
                            <p className="mt-3 text-center">Don’t have an account? <a href="#" className=" fw-semibold link-success link-offset-2 link-underline link-underline-opacity-0">Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}