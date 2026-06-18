import React from "react"
// import Icon from './Icon';
import { LocationArrow, House, CreditCard, Magnifier } from "@gravity-ui/icons"

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-16">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/40 via-[#0B1120]/60 to-[#0B1120] z-10"></div>
                <img
                    className="w-full h-full object-cover"
                    alt="Luxury Real Estate Hero Background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuABSGpmpihQbaFEsyMg-yZ6m6xT9dnGDPwNp5Ww_3PiH0Pqg0YaEf6bTUTUGvXXPlW_YMq7bEE32NJLSPIfICyOg8iWVkf5yay0wWjUKZ6UWW9i_uEhK6T9SbYZm29IMAn7SHkb3iD9ULnEkehfxZW5Ioa4ZR5H3GDTXtmb_-0zJPnNT5QrXjH7WULldtvx2sy15NT2pnNfTtitXxH8Po3E1DUewRNgbEmCVNx8XGuCqn-yntdPfvo-0YbC-rj_fxtlLKobsYPj7xE"
                />
            </div>
            <div className="relative z-20 w-full max-w-[1280px] px-6 text-center">
                <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.2] md:leading-[1.1] tracking-[-0.01em] md:tracking-[-0.02em] text-white mb-10 animate-fade-in">
                    Find Your Perfect <br className="hidden md:block" /> Rental Property
                </h2>
                {/* Glass Search Panel */}
                <div className="glass-panel rounded-[32px] bg-gray-700   p-6 md:p-10 shadow-lg max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="text-left space-y-1">
                            <label className="text-[14px] font-medium tracking-[0.05em] text-[#d9c2b3] block ml-4">
                                Location
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ffb77e] flex items-center">
                                    <LocationArrow />
                                </span>
                                <input
                                    className="w-full bg-[#0B1120]/50 border border-[#534438]/30 rounded-xl py-3 pl-11 pr-4 text-[#efe0d7] focus:border-[#ffb77e] outline-none transition-all placeholder:text-[#534438]/60"
                                    placeholder="Dubai Marina"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="text-left space-y-1">
                            <label className="text-[14px] font-medium tracking-[0.05em] text-[#d9c2b3] block ml-4">
                                Property Type
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ffb77e] flex items-center">
                                    <House />
                                </span>
                                <select className="w-full bg-[#0B1120]/50 border border-[#534438]/30 rounded-xl py-3 pl-11 pr-4 text-[#efe0d7] focus:border-[#ffb77e] outline-none transition-all appearance-none">
                                    <option>Penthouse</option>
                                    <option>Villa</option>
                                    <option>Apartment</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-left space-y-1">
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
                        </div>
                        <button className="copper-gradient w-full h-[52px] bg-gradient-to-r from-[#ffb77e] to-[#ff8c42] cursor-pointer rounded-xl text-[18px] font-semibold text-white copper-glow transition-all flex items-center justify-center gap-2">
                            <Magnifier></Magnifier>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

