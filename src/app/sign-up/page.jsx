"use client"

import React, { useState } from "react"
import { Person, Envelope, Link as LinkIcon, ShieldKeyhole, Eye, EyeSlash } from "@gravity-ui/icons"
import NextLink from "next/link"
import { motion } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { avatarVariants } from "@heroui/styles"

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
            password: user.password,
            image: user.image
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
                                    <Person className="text-[#ffb77e]" width={20} height={20} />
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
                                    <Envelope className="text-[#ffb77e]" width={20} height={20} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#efe0d7]">Image URL</label>
                            <div className="relative">
                                <input
                                    placeholder="Enter your image url"
                                    type="url"
                                    name="image"
                                    className="w-full bg-[#19120d] border border-[#534438]/30 rounded-xl h-12 pl-10 pr-4 text-[#efe0d7] focus:border-[#ffb77e] outline-none placeholder:text-[#534438]/60 transition-colors"
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                                    <LinkIcon className="text-[#ffb77e]" width={20} height={20} />
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
                                    <ShieldKeyhole className="text-[#ffb77e]" width={20} height={20} />
                                </div>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
                                    <button
                                        className="focus:outline-none flex items-center justify-center"
                                        type="button"
                                        onClick={toggleVisibility}
                                        aria-label="toggle password visibility"
                                    >
                                        {isVisible ? (
                                            <Eye
                                                className="text-[#534438] hover:text-[#ffb77e] transition-colors"
                                                width={20}
                                                height={20}
                                            />
                                        ) : (
                                            <EyeSlash
                                                className="text-[#534438] hover:text-[#ffb77e] transition-colors"
                                                width={20}
                                                height={20}
                                            />
                                        )}
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
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </button>
                        <button className="flex-1 h-12 flex items-center justify-center gap-2 border border-[#534438]/30 rounded-xl bg-[#19120d] hover:bg-[#3f465c]/20 transition-colors text-[#efe0d7] font-medium">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.92 1.34-1.86 2.67-3.353 2.7-1.466.03-1.94-.87-3.62-.87-1.68 0-2.21.84-3.6.9-1.444.06-2.54-1.45-3.467-2.78-1.885-2.72-3.33-7.7-1.39-11.05.96-1.66 2.68-2.7 4.55-2.73 1.42-.03 2.76.96 3.62.96.86 0 2.5-1.19 4.21-1.01.71.03 2.72.29 4.01 2.18-.1.07-2.39 1.4-2.37 4.17.03 3.31 2.91 4.41 2.95 4.43z" />
                            </svg>
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

