"use client"

import React, { useState } from "react"
// import Icon from "@/components/Icon"
import NextLink from "next/link"
import { motion } from "framer-motion"
import Link from "next/link"

export default function SignInPage() {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1120] p-4 relative overflow-hidden">
            {/* Background ambient decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C97B36]/10 blur-[100px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#139fb3]/10 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="glass-panel rounded-[32px] p-8 w-full flex flex-col gap-6">
                    <div className="text-center">
                        <h1 className="text-[28px] font-bold tracking-tight text-white">Welcome Back</h1>
                        <p className="text-[#d9c2b3] mt-2 text-sm">Sign in to your account to continue</p>
                    </div>

                    <form className="flex flex-col gap-5 mt-2" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#efe0d7]">Email Address</label>
                            <div className="relative">
                                <input
                                    autoFocus
                                    placeholder="Enter your email"
                                    type="email"
                                    className="w-full bg-[#19120d] border border-[#534438]/30 rounded-xl h-12 pl-10 pr-4 text-[#efe0d7] focus:border-[#ffb77e] outline-none placeholder:text-[#534438]/60 transition-colors"
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                                    {/* <Icon name="mail" className="text-[#ffb77e]" size={20} /> */}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#efe0d7]">Password</label>
                            <div className="relative">
                                <input
                                    placeholder="Enter your password"
                                    type={isVisible ? "text" : "password"}
                                    className="w-full bg-[#19120d] border border-[#534438]/30 rounded-xl h-12 pl-10 pr-10 text-[#efe0d7] focus:border-[#ffb77e] outline-none placeholder:text-[#534438]/60 transition-colors"
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                                    {/* <Icon name="shield_lock" className="text-[#ffb77e]" size={20} /> */}
                                </div>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
                                    <button
                                        className="focus:outline-none flex items-center justify-center"
                                        type="button"
                                        onClick={toggleVisibility}
                                        aria-label="toggle password visibility"
                                    >
                                        {/* <Icon
                                            name={isVisible ? "public" : "explore"}
                                            className="text-[#534438] hover:text-[#ffb77e] transition-colors"
                                            size={20}
                                        /> */}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-between">
                            <div />
                            <Link
                                href="#"
                                className="text-sm font-medium text-[#ffb77e] hover:opacity-80 transition-opacity"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            className="copper-gradient bg-[#ffb77e] cursor-pointer w-full h-12 rounded-xl font-semibold text-white shadow-lg mt-2 copper-glow transition-all"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="flex items-center gap-4 py-2">
                        <div className="flex-1 h-[1px] bg-[#534438]/30" />
                        <span className="text-[#d9c2b3] text-sm">or continue with</span>
                        <div className="flex-1 h-[1px] bg-[#534438]/30" />
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 h-12 flex items-center justify-center gap-2 border border-[#534438]/30 rounded-xl bg-[#19120d] hover:bg-[#3f465c]/20 transition-colors text-[#efe0d7] font-medium">
                            {/* <Icon name="public" size={20} /> */}
                            Google
                        </button>
                        <button className="flex-1 h-12 flex items-center justify-center gap-2 border border-[#534438]/30 rounded-xl bg-[#19120d] hover:bg-[#3f465c]/20 transition-colors text-[#efe0d7] font-medium">
                            {/* <Icon name="build" size={20} /> */}
                            Apple
                        </button>
                    </div>

                    <p className="text-center text-sm text-[#d9c2b3] mt-2">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="text-sm font-bold text-[#ffb77e] hover:opacity-80 transition-opacity"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

