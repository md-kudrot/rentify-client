import React from "react"
import Icon from '../Icon';

export default function HostCard() {
    return (
        <section className="p-10 bg-[#3c332d] rounded-[24px] flex flex-col md:flex-row items-center gap-10">
            <div className="relative">
                <img
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#ffb77e]"
                    alt="Elena Vance Host Profile"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2qE7Bs0ZTbbmvbG0TSA6pfbikc-mllIo9ADDvhU4fqIomEKwp1-OwxYGRCDzpsz5K5gNXF6cWoqFhdubKN8IX0pF7qDPBzvUb6JTPN9SyDPjjUPD0ZKjdZUdJviTrF0H6gB9D4W652XCjHKfnLyJky2DKyxl0HOsWlS6u7WNJzXzbJmX-9nup7FQOLaffT8tY6xN7obXtopddoLZXZ7nSnAq63lxOqNpegZIXmHvd5qh0lWgBuCS2_8zJHfXqgG9SQIz3BUtOlmQ"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#ffb77e] rounded-full p-1 border-4 border-[#3c332d]">
                    <span className="text-[#efe0d7] flex items-center justify-center">
                        <Icon name="verified" size={14} className="text-black" />
                    </span>
                </div>
            </div>
            <div className="flex-1 text-center md:text-left">
                <h4 className="text-[24px] font-semibold text-white">Hosted by Elena Vance</h4>
                <p className="text-[#d9c2b3] text-[16px] mb-1">Superhost · 8 years of hosting excellence</p>
                <p className="text-[#d9c2b3]/70 text-[14px] uppercase tracking-widest font-bold">
                    Responds within 1 hour
                </p>
            </div>
            <button className="px-10 py-3 border-2 border-[#ffb77e] text-[#ffb77e] rounded-xl font-bold hover:bg-[#ffb77e]/5 transition-all">
                Contact Host
            </button>
        </section>
    )
}

