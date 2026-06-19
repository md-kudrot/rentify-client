"use client"

import React, { useState } from "react"
// import Icon from "@/components/Icon";
import NextLink from "next/link"
import { motion } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

export default function SignUpPage() {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())
        // console.log("User data:", user)

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password
        })
        if (data) {
            console.log("signup success ")
            redirect("/")
        }

        if (error) {
            alert("signup error " + error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1120] p-4 relative overflow-hidden">
            {/* Background ambient decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C97B36]/10 blur-[100px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#139fb3]/10 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="glass-panel rounded-[32px] p-8 w-full flex flex-col gap-6">
                    <div className="text-center">
                        <h1 className="text-[28px] font-bold tracking-tight text-white">Create Account</h1>
                        <p className="text-[#d9c2b3] mt-2 text-sm">Join us and start your journey</p>
                    </div>

                    <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#efe0d7]">Full Name</label>
                            <div className="relative">
                                <input
                                    autoFocus
                                    placeholder="Enter your full name"
                                    type="text"
                                    name="name"
                                    className="w-full bg-[#19120d] border border-[#534438]/30 rounded-xl h-12 pl-10 pr-4 text-[#efe0d7] focus:border-[#ffb77e] outline-none placeholder:text-[#534438]/60 transition-colors"
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                                    {/* <Icon name="person" className="text-[#ffb77e]" size={20} /> */}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#efe0d7]">Email Address</label>
                            <div className="relative">
                                <input
                                    placeholder="Enter your email"
                                    type="email"
                                    name="email"
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
                                    placeholder="Create a password"
                                    type={isVisible ? "text" : "password"}
                                    name="password"
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

                        <div className="flex items-start gap-3 mt-1">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    aria-describedby="terms-description"
                                    name="terms"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-[#534438]/50 bg-[#19120d] text-[#C97B36] focus:ring-[#C97B36]"
                                />
                            </div>
                            <div className="text-sm">
                                <label htmlFor="terms" className="font-medium text-[#d9c2b3]">
                                    I agree to the{" "}
                                    <NextLink href="#" className="text-[#ffb77e] font-bold hover:underline">
                                        Terms of Service
                                    </NextLink>{" "}
                                    and{" "}
                                    <NextLink href="#" className="text-[#ffb77e] font-bold hover:underline">
                                        Privacy Policy
                                    </NextLink>
                                </label>
                            </div>
                        </div>

                        <button
                            className="copper-gradient bg-[#ffb77e] cursor-pointer w-full h-12 rounded-xl font-semibold text-white shadow-lg mt-2 copper-glow transition-all"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="flex items-center gap-4 py-1">
                        <div className="flex-1 h-[1px] bg-[#534438]/30" />
                        <span className="text-[#d9c2b3] text-sm">or sign up with</span>
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
                        Already have an account?{" "}
                        <NextLink
                            href="/sign-in"
                            className="text-sm font-bold text-[#ffb77e] hover:opacity-80 transition-opacity"
                        >
                            Sign In
                        </NextLink>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

