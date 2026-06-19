import React from "react"
import Link from "next/link"

export default function Navbar() {
    const navLinks = (
        <>
            <Link
                href="/properties"
                className="text-[#ffb77e] font-bold text-[14px] hover:text-[#ffb77e] transition-colors"
            >
                Properties
            </Link>
            <Link href="/saved" className="text-[#d9c2b3] text-[14px] hover:text-[#ffb77e] transition-colors">
                Saved
            </Link>
            <Link href="/bookings" className="text-[#d9c2b3] text-[14px] hover:text-[#ffb77e] transition-colors">
                Bookings
            </Link>
            <Link href="/investments" className="text-[#d9c2b3] text-[14px] hover:text-[#ffb77e] transition-colors">
                Investments
            </Link>
        </>
    )

    return (
        <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl border-b border-[#534438]/10 shadow-sm">
            <div className="flex justify-between items-center px-6 h-16 w-full max-w-[1280px] mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/" className="font-bold text-[24px] tracking-tight text-[#ffb77e]">
                        Rentora
                    </Link>
                </div>
                <nav className="hidden md:flex gap-6">{navLinks}</nav>
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-[#3c332d] border border-[#a18d7f]/20 overflow-hidden cursor-pointer active:scale-95 transition-all">
                        <img
                            className="w-full h-full object-cover"
                            alt="Alexander Hunt Profile"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxcaL9xsIW9BWzrexG2_wl1RRl44-DATHR7ecn_QXSP250DvJA7vWIo781vS0SwwRzJ_TAwyLbEPpLRIXy85hEInss5v32GXCv5tYWLF7h6uH4a8xxnqptRDg2Vb32owHexnhI5Wizpy0RbHzpnDUIVW0HNPXSceWmgLMVeleV_wF8x7_rMDeGyDk_iT6TwxD494WTI0m8JjzF21XC39mTJC5KXvUirThMkhYddg01Ekh0y-r2rqn5fsKmj9TY3FB_u9n0KfsUhog"
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}
