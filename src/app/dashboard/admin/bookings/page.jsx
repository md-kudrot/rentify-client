"use client"

import { useState, useEffect } from "react"
import Icon from "@/components/Icon"
import { authClient } from "@/lib/auth-client"

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data: tokenData } = await authClient.token()
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
                    headers: { Authorization: `Bearer ${tokenData.token}` }
                })
                const data = await res.json()
                setBookings(data)
            } catch (err) {
                console.error("Failed to fetch bookings:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [])

    // Client-side search + filter
    const filtered = bookings.filter((b) => {
        const matchSearch =
            !search ||
            b.title?.toLowerCase().includes(search.toLowerCase()) ||
            b.userEmail?.toLowerCase().includes(search.toLowerCase()) ||
            b.ownerEmail?.toLowerCase().includes(search.toLowerCase()) ||
            b._id?.toString().includes(search)

        const matchStatus = !statusFilter || b.status?.toLowerCase() === statusFilter.toLowerCase()

        return matchSearch && matchStatus
    })

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/20 capitalize">
                        {status}
                    </span>
                )
            case "pending":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 capitalize">
                        {status}
                    </span>
                )
            case "cancelled":
            case "rejected":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/20 capitalize">
                        {status}
                    </span>
                )
            default:
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-500/20 text-slate-400 border border-slate-500/20 capitalize">
                        {status || "Unknown"}
                    </span>
                )
        }
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return "—"
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        })
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
                    {/* Filters */}
                    <div className="p-6 border-b border-[#534438]/20 flex flex-col md:flex-row gap-4 items-center justify-between bg-[#211a15]/50">
                        <div className="relative w-full md:w-96">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d9c2b3]">
                                <Icon name="search" size={20} />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by property, email, or ID..."
                                className="w-full bg-[#19120d] border border-[#534438]/50 rounded-xl pl-12 pr-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                            />
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-[#19120d] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none flex-1 md:flex-none"
                            >
                                <option value="">All Statuses</option>
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="cancelled">Cancelled</option>
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
                                    <th className="px-6 py-4">Booked At</th>
                                    <th className="px-6 py-4">Total Price</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#534438]/20">
                                {loading ? (
                                    // Skeleton rows
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            {[...Array(8)].map((_, j) => (
                                                <td key={j} className="px-6 py-4">
                                                    <div className="h-4 bg-[#ffffff08] rounded-md w-24" />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-16 text-center text-[#d9c2b3]/50">
                                            No bookings found.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-[#302823]/50 transition-colors group">
                                            <td className="px-6 py-4 text-sm font-bold text-[#efe0d7]">
                                                ...{booking._id.toString().slice(-6).toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#ffb77e]">
                                                {booking.title || "—"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#d9c2b3]">
                                                {booking.userEmail || "—"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#d9c2b3]">
                                                {booking.ownerEmail || "—"}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-[#d9c2b3]">
                                                {formatDate(booking.bookedAt || booking.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-[#efe0d7]">
                                                ${(booking.totalPrice || 0).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer count */}
                    {!loading && filtered.length > 0 && (
                        <div className="px-6 py-4 border-t border-[#534438]/20 bg-[#211a15]/50">
                            <p className="text-[#d9c2b3]/60 text-xs">
                                Showing {filtered.length} of {bookings.length} bookings
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </>
    )
}

