"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"
import { redirect, usePathname } from "next/navigation"
import Icon from "./Icon"

export default function Navbar() {
    const pathname = usePathname()
    // console.log(pathname)

    if (pathname.includes("/dashboard")) {
        return null
    }

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

    // console.log(session?.user)
    const user = session?.user

    console.log("user roll", user?.role)

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    refetch()
                    redirect("/sign-in")
                }
            }
        })
    }

    const navLinks = (
        <>
            <Link
                href="/"
                className={`text-[#d9c2b3] ${pathname === "/" ? "text-[#ffb77e]" : ""} font-bold text-[14px] hover:text-[#ffb77e] transition-colors`}
            >
                Home
            </Link>
            <Link
                href="/properties"
                className={`text-[#d9c2b3] ${pathname === "/properties" ? "text-[#ffb77e]" : ""} font-bold text-[14px] hover:text-[#ffb77e] transition-colors`}
            >
                All Properties
            </Link>
            {/* <Link href="/saved" className="text-[#d9c2b3] text-[14px] hover:text-[#ffb77e] transition-colors">
                Saved
            </Link>
            <Link href="/bookings" className="text-[#d9c2b3] text-[14px] hover:text-[#ffb77e] transition-colors">
                Bookings
            </Link>
            <Link href="/investments" className="text-[#d9c2b3] text-[14px] hover:text-[#ffb77e] transition-colors">
                Investments
            </Link> */}
        </>
    )

    return (
        <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl border-b border-[#534438]/10 shadow-sm">
            <div className="flex justify-between items-center px-6 h-16 w-full max-w-[1280px] mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/" className="font-bold text-[24px] tracking-tight text-[#ffb77e]">
                        <div className="flex items-center gap-2 text-[#ffb77e]">
                            <Icon name="home" size={28} />
                            <h1 className="font-bold text-[24px] tracking-tight">Rentify</h1>
                        </div>
                    </Link>
                </div>
                <nav className="hidden md:flex gap-6">{navLinks}</nav>
                <div className="flex items-center gap-2">
                    {user && (
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-[#3c332d] border border-[#a18d7f]/20 overflow-hidden cursor-pointer active:scale-95 transition-all">
                                <Image
                                    className="w-full h-full object-cover"
                                    height={40}
                                    width={40}
                                    alt="Alexander Hunt Profile"
                                    src={
                                        user?.image ||
                                        `https://ui-avatars.com/api/?name=${user?.name}&background=19120d&color=ffb77e`
                                    }
                                />
                            </div>

                            <Link href={`/dashboard/${user?.role}`}>Dashboard</Link>

                            {/* log out */}
                            <button
                                onClick={handleSignOut}
                                className="cursor-pointer text-[#ffb77e] border border-[#ffb77e] font-medium text-[14px] hover:bg-[#ffb77e] hover:text-[#0B1120] px-2 rounded-sm transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                    {!user && (
                        <div className="flex items-center gap-2">
                            {/* sign in */}
                            <Link
                                href="/sign-in"
                                className="text-[#ffb77e] border border-[#ffb77e] font-medium text-[14px] hover:bg-[#ffb77e] hover:text-[#0B1120] px-2 rounded-sm transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/sign-up"
                                className="text-[#ffb77e] border border-[#ffb77e] font-medium text-[14px] hover:bg-[#ffb77e] hover:text-[#0B1120] px-2 rounded-sm transition-colors"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="md:hidden bg-transparent backdrop-blur-xl border-t border-[#534438]/10 shadow-sm">
                <div className="flex justify-around items-center px-6 h-16 w-full max-w-[1280px] mx-auto">
                    {navLinks}
                </div>
            </div>
        </header>
    )
}
