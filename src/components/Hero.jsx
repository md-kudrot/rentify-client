"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { LocationArrow, House, CreditCard, Magnifier } from "@gravity-ui/icons"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
    const router = useRouter()
    const [location, setLocation] = useState("")
    const [propertyType, setPropertyType] = useState("")

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (location.trim()) params.set("location", location.trim())
        if (propertyType) params.set("type", propertyType)
        router.push(`/properties?${params.toString()}`)
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center md:pt-16 pt-28">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/40 via-[#0B1120]/60 to-[#0B1120] z-10" />
                <Image
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                    alt="Luxury Real Estate Hero Background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuABSGpmpihQbaFEsyMg-yZ6m6xT9dnGDPwNp5Ww_3PiH0Pqg0YaEf6bTUTUGvXXPlW_YMq7bEE32NJLSPIfICyOg8iWVkf5yay0wWjUKZ6UWW9i_uEhK6T9SbYZm29IMAn7SHkb3iD9ULnEkehfxZW5Ioa4ZR5H3GDTXtmb_-0zJPnNT5QrXjH7WULldtvx2sy15NT2pnNfTtitXxH8Po3E1DUewRNgbEmCVNx8XGuCqn-yntdPfvo-0YbC-rj_fxtlLKobsYPj7xE"
                />
            </div>

            <div className="relative z-20 w-full max-w-[1280px] px-6 text-center">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-[32px] md:text-[48px] font-bold leading-[1.2] md:leading-[1.1] tracking-[-0.01em] md:tracking-[-0.02em] text-white mb-10"
                >
                    Find Your Perfect <br className="hidden md:block" /> Rental Property
                </motion.h2>

                {/* Search Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="glass-panel rounded-[32px] bg-gray-700 p-6 md:p-10 shadow-lg max-w-4xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-left space-y-1"
                        >
                            <label className="text-[14px] font-medium tracking-[0.05em] text-[#d9c2b3] block ml-4">
                                Location
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ffb77e] flex items-center">
                                    <LocationArrow />
                                </span>
                                <input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    className="w-full bg-[#0B1120]/50 border border-[#534438]/30 rounded-xl py-3 pl-11 pr-4 text-[#efe0d7] focus:border-[#ffb77e] outline-none transition-all placeholder:text-[#534438]/60"
                                    placeholder="Dubai Marina"
                                    type="text"
                                />
                            </div>
                        </motion.div>

                        {/* Property Type */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="text-left space-y-1"
                        >
                            <label className="text-[14px] font-medium tracking-[0.05em] text-[#d9c2b3] block ml-4">
                                Property Type
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ffb77e] flex items-center">
                                    <House />
                                </span>
                                <select
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                    className="w-full bg-[#0B1120]/50 border border-[#534438]/30 rounded-xl py-3 pl-11 pr-4 text-[#efe0d7] focus:border-[#ffb77e] outline-none transition-all appearance-none"
                                >
                                    <option value="">All Types</option>
                                    <option value="Penthouse">Penthouse</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Mansion">Mansion</option>
                                    <option value="Estate">Estate</option>
                                </select>
                            </div>
                        </motion.div>

                        {/* Price Range */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="text-left space-y-1"
                        >
                            <label className="text-[14px] font-medium tracking-[0.05em] text-[#d9c2b3] block ml-4">
                                Price Range
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ffb77e] flex items-center">
                                    <CreditCard />
                                </span>
                                <input
                                    className="w-full bg-[#0B1120]/50 border border-[#534438]/30 rounded-xl py-3 pl-11 pr-4 text-[#efe0d7] focus:border-[#ffb77e] outline-none transition-all placeholder:text-[#534438]/60"
                                    placeholder="$5k - $15k"
                                    type="text"
                                />
                            </div>
                        </motion.div>

                        {/* Search Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleSearch}
                            className="copper-gradient bg-[#ffb77e] text-[#0B1120] w-full h-[52px] cursor-pointer rounded-xl text-[18px] font-semibold text-white copper-glow transition-all flex items-center justify-center gap-2"
                        >
                            <Magnifier />
                            Search
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

