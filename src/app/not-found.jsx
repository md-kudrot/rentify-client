"use client"

import React from "react"
// import Icon from "@/components/Icon"
import NextLink from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
    return (
        <div className="h-screen flex items-center justify-center bg-[#0B1120]  relative overflow-hidden">
            {/* Background ambient decorations */}
            <div className="absolute top-0 left-0 w-full h-screen overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C97B36]/10 blur-[100px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#139fb3]/10 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg z-10 text-center"
            >
                <div className="glass-panel rounded-[32px] p-12 w-full flex flex-col items-center gap-6">
                    {/* <div className="w-24 h-24 rounded-full bg-[#19120d] border border-[#534438]/30 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(201,123,54,0.15)]">
                        <Icon name="explore" size={48} className="text-[#ffb77e]" />
                    </div> */}

                    <div>
                        <h1
                            className="text-[80px] leading-none font-bold tracking-tight text-white"
                            style={{
                                background: "linear-gradient(135deg, #C97B36 0%, #F4A261 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            404
                        </h1>
                        <h2 className="text-[24px] font-semibold text-white mt-4">Page Not Found</h2>
                        <p className="text-[#d9c2b3] mt-3 text-base max-w-sm mx-auto leading-relaxed">
                            The luxury estate you are looking for seems to have vanished off the map, or perhaps the
                            link is broken.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full mt-6">
                        <NextLink href="/" className="flex-1 block">
                            <button className="copper-gradient bg-[#19120d] hover:bg-[#3f465c]/20 transition-colors text-[#efe0d7] w-full h-12 rounded-xl font-semibold  shadow-lg copper-glow  flex items-center justify-center gap-2">
                                {/* <Icon name="home" size={20} /> */}
                                Return Home
                            </button>
                        </NextLink>
                        <button
                            onClick={() => window.history.back()}
                            className="flex-1 h-12 flex items-center justify-center gap-2 border border-[#534438]/30 rounded-xl bg-[#19120d] hover:bg-[#3f465c]/20 transition-colors text-[#efe0d7] font-medium"
                        >
                            {/* <Icon name="chevron_left" size={20} /> */}
                            Go Back
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
