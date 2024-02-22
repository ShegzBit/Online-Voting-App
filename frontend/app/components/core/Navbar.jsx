import Logo from '@/public/logo.png'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg border-bottom border-body bg-light pt-3 mb-2">
            <div className="container-fluid">
                <a className="navbar-brand navbar-nav" href="https://pollmaster.webflow.io/">
                    <Image id="logo" src={Logo} alt="PollMaster" />
                </a>
            </div>
        </nav>
    )
}