import Logo from '@/public/logo.png'
import Link from 'next/link'
import Image from 'next/image'
import { IoMenu } from "react-icons/io5";


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg border-bottom border-body bg-light p-3 mb-2 fixed-top">
            <div className="container-fluid ">
                <a className="navbar-brand" href="https://pollmaster.webflow.io/">
                    <Image id="logo" src={Logo} alt="PollMaster" />
                </a>
                <button className="navbar-toggler bg-light text-dark" style={{ border: "0px" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span><IoMenu style={{ width: "24px", height: "24px" }} /></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active text-center p-2 fw-semibold ml-auto " aria-current="page" href="#">Home</a>
                        </li>
                        <li>
                            <a className="nav-link text-center p-2 fw-semibold ml-auto" href="#">My Elections</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}