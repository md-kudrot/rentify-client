"use client"
import React from "react"
import { Globe, Envelope, ArrowUpRightFromSquare, PaperPlane } from "@gravity-ui/icons"
import { usePathname } from "next/navigation"

export default function Footer() {
    const pathname = usePathname()
    // console.log(pathname)

    if (pathname.includes("/dashboard")) {
        return null
    }

    return (
        <footer className="bg-[#130d08] border-t border-[#534438]/10 rounded-t-[32px] ">
            <div className="w-full py-20 px-6 grid grid-cols-1 md:grid-cols-4 gap-10 max-w-[1280px] mx-auto">
                <div className="space-y-4">
                    <h2 className="text-[32px] font-bold text-[#ffb77e]">Rentora</h2>
                    <p className="text-[#d9c2b3] text-[16px] leading-[1.6]">
                        Curating the world's most exceptional living spaces for the most discerning individuals.
                    </p>
                    <div className="flex gap-4">
                        <span className="text-[#ffb77e] cursor-pointer hover:opacity-80">
                            <Globe width={20} height={20} />
                        </span>
                        <span className="text-[#ffb77e] cursor-pointer hover:opacity-80">
                            <Envelope width={20} height={20} />
                        </span>
                        <span className="text-[#ffb77e] cursor-pointer hover:opacity-80">
                            <ArrowUpRightFromSquare width={20} height={20} />
                        </span>
                    </div>
                </div>
                <div className="space-y-4">
                    <h6 className="text-[20px] font-semibold text-white">Platform</h6>
                    <ul className="space-y-2 text-[#d9c2b3] text-[16px]">
                        <li>
                            <a
                                className="hover:text-[#ffb77e] transition-all underline decoration-[#ffb77e]/30"
                                href="#"
                            >
                                Properties
                            </a>
                        </li>
                        <li>
                            <a
                                className="hover:text-[#ffb77e] transition-all underline decoration-[#ffb77e]/30"
                                href="#"
                            >
                                Investments
                            </a>
                        </li>
                        <li>
                            <a
                                className="hover:text-[#ffb77e] transition-all underline decoration-[#ffb77e]/30"
                                href="#"
                            >
                                Property Management
                            </a>
                        </li>
                        <li>
                            <a
                                className="hover:text-[#ffb77e] transition-all underline decoration-[#ffb77e]/30"
                                href="#"
                            >
                                Featured Collections
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h6 className="text-[20px] font-semibold text-white">Company</h6>
                    <ul className="space-y-2 text-[#d9c2b3] text-[16px]">
                        <li>
                            <a
                                className="hover:text-[#ffb77e] transition-all underline decoration-[#ffb77e]/30"
                                href="#"
                            >
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                className="hover:text-[#ffb77e] transition-all underline decoration-[#ffb77e]/30"
                                href="#"
                            >
                                Careers
                            </a>
                        </li>
                        <li>
                            <a
                                className="hover:text-[#ffb77e] transition-all underline decoration-[#ffb77e]/30"
                                href="#"
                            >
                                Press Kit
                            </a>
                        </li>
                        <li>
                            <a
                                className="hover:text-[#ffb77e] transition-all underline decoration-[#ffb77e]/30"
                                href="#"
                            >
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h6 className="text-[20px] font-semibold text-white">Newsletter</h6>
                    <p className="text-[#d9c2b3] text-sm">Join our private list for exclusive off-market listings.</p>
                    <div className="flex gap-2">
                        <input
                            className="bg-[#19120d] border border-[#534438]/30 rounded-lg px-4 py-2 text-[#efe0d7] w-full focus:border-[#ffb77e] outline-none placeholder:text-[#534438]/60 text-sm"
                            placeholder="Email"
                            type="email"
                        />
                        <button className="copper-gradient p-2 rounded-lg text-white flex items-center justify-center cursor-pointer">
                            <PaperPlane width={18} height={18} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto px-6 py-6 border-t border-[#534438]/10 flex flex-col md:flex-row justify-between items-center text-[#d9c2b3] text-[14px] font-medium gap-4">
                <p>© 2024 Rentora Luxury Estates. All rights reserved.</p>
                <div className="flex gap-6">
                    <a className="hover:text-[#ffb77e] transition-all" href="#">
                        Privacy Policy
                    </a>
                    <a className="hover:text-[#ffb77e] transition-all" href="#">
                        Terms of Service
                    </a>
                    <a className="hover:text-[#ffb77e] transition-all" href="#">
                        Cookies
                    </a>
                </div>
            </div>
        </footer>
    )
}

