"use client"

import { useState } from "react"
// import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Icon from "@/components/Icon"

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([
        {
            id: "BKG-201",
            property: "Azure Bay Villa",
            tenant: "Sarah Jenkins",
            owner: "Alexander Hunt",
            checkIn: "Dec 01, 2026",
            checkOut: "Dec 15, 2026",
            total: "$9,250",
            status: "Approved"
        },
        {
            id: "BKG-202",
            property: "Celestial Heights Villa",
            tenant: "Michael Chang",
            owner: "Emma Wilson",
            checkIn: "Jan 10, 2027",
            checkOut: "Jan 20, 2027",
            total: "$1,600",
            status: "Pending"
        },
        {
            id: "BKG-203",
            property: "Lakeside Cabin",
            tenant: "David Miller",
            owner: "Sarah Jenkins",
            checkIn: "Nov 20, 2026",
            checkOut: "Nov 25, 2026",
            total: "$1,450",
            status: "Cancelled"
        }
    ])

    const getStatusBadge = (status) => {
        switch (status) {
            case "Approved":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/20">
                        {status}
                    </span>
                )
            case "Pending":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">
                        {status}
                    </span>
                )
            case "Cancelled":
            case "Rejected":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/20">
                        {status}
                    </span>
                )
            default:
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-500/20 text-slate-400 border border-slate-500/20">
                        {status}
                    </span>
                )
        }
    }

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-[#efe0d7]">All Bookings</h2>
                        <p className="text-[#d9c2b3] text-sm mt-1">
                            Monitor all booking activities across the platform.
                        </p>
                    </div>
                </div>

                <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl overflow-hidden">
                    {/* Filters Area */}
                    <div className="p-6 border-b border-[#534438]/20 flex flex-col md:flex-row gap-4 items-center justify-between bg-[#211a15]/50">
                        <div className="relative w-full md:w-96">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d9c2b3]">
                                <Icon name="search" size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search bookings, properties, or users..."
                                className="w-full bg-[#19120d] border border-[#534438]/50 rounded-xl pl-12 pr-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                            />
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <select className="bg-[#19120d] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none flex-1 md:flex-none">
                                <option value="">All Statuses</option>
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-[#211a15] text-[10px] uppercase tracking-widest text-[#d9c2b3] font-bold">
                                <tr>
                                    <th className="px-6 py-4">Booking ID</th>
                                    <th className="px-6 py-4">Property</th>
                                    <th className="px-6 py-4">Tenant</th>
                                    <th className="px-6 py-4">Owner</th>
                                    <th className="px-6 py-4">Dates</th>
                                    <th className="px-6 py-4">Total Price</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#534438]/20">
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-[#302823]/50 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-bold text-[#efe0d7]">{booking.id}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-[#ffb77e]">
                                            {booking.property}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#d9c2b3]">{booking.tenant}</td>
                                        <td className="px-6 py-4 text-sm text-[#d9c2b3]">{booking.owner}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1 text-xs text-[#d9c2b3]">
                                                <span className="flex items-center gap-1">
                                                    <Icon name="calendar_today" size={12} /> {booking.checkIn}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Icon name="event" size={12} /> {booking.checkOut}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#efe0d7]">{booking.total}</td>
                                        <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] inline-flex items-center justify-center hover:bg-[#ffb77e]/20 hover:text-[#ffb77e] transition-colors"
                                                title="View Details"
                                            >
                                                <Icon name="visibility" size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    )
}

