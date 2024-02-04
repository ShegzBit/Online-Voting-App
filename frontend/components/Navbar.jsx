import Logo from '@/public/logo.png'
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg border-bottom border-body bg-light mt-2 mb-2">
            <a className="navbar-brand navbar-nav" href="#">
                <img id="logo" src={Logo} alt="PollMaster" />
            </a>
        </nav>
    )
}