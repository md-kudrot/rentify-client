"use client"

import { useEffect, useState } from "react"
import { authClient, useSession } from "@/lib/auth-client"
import Icon from "@/components/Icon"

function getStatusBadge(status) {
    const styles = {
        confirmed: "bg-green-500/10 text-green-400 border border-green-500/20",
        pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
        cancelled: "bg-red-500/10 text-red-400 border border-red-500/20"
    }
    return (
        <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest ${styles[status] || "bg-slate-700 text-slate-300"}`}
        >
            {status}
        </span>
    )
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    })
}

export default function MyBookingsPage() {
    const { data: session } = useSession()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!session?.user?.email) return

        const fetchBookings = async () => {
            try {
                setLoading(true)
                const email = session.user.email
                // console.log(email)

                const { data: tokenData } = await authClient.token()
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${email}`, {
                    headers: {
                        Authorization: `Bearer ${tokenData.token}`
                    }
                })

                if (!res.ok) throw new Error("Failed to fetch bookings")

                const data = await res.json()
                // console.log(data)
                setBookings(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [session])

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-[#efe0d7]">My Bookings</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">Manage your upcoming and past property reservations.</p>
                </div>
                <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-12 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3 text-[#d9c2b3]">
                        <div className="w-8 h-8 border-2 border-[#ffb77e] border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm">Loading your bookings...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-[#efe0d7]">My Bookings</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">Manage your upcoming and past property reservations.</p>
                </div>
                <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-12 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3 text-red-400">
                        <Icon name="error" size={48} className="opacity-70" />
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-[#efe0d7]">My Bookings</h2>
                <p className="text-[#d9c2b3] text-sm mt-1">Manage your upcoming and past property reservations.</p>
            </div>

            <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-[#211a15] text-[10px] uppercase tracking-widest text-[#d9c2b3] font-bold">
                            <tr>
                                <th className="px-6 py-4">Property</th>
                                <th className="px-6 py-4">Booked At</th>
                                <th className="px-6 py-4">Nights</th>
                                <th className="px-6 py-4">Total Price</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#534438]/20">
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-[#302823]/50 transition-colors group">
                                    {/* Property Name */}
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-[#efe0d7]">{booking.title}</div>
                                        <div className="text-[10px] text-[#d9c2b3]">ID: {booking._id}</div>
                                    </td>

                                    {/* Booked At */}
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-[#efe0d7]">{formatDate(booking.bookedAt)}</div>
                                        <div className="text-[10px] text-[#d9c2b3]">
                                            {formatDate(booking.createdAt)}
                                        </div>
                                    </td>

                                    {/* Nights */}
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-[#efe0d7]">{booking.nights}</span>
                                        <span className="text-[10px] text-[#d9c2b3] ml-1">nights</span>
                                    </td>

                                    {/* Total Price */}
                                    <td className="px-6 py-4 text-sm font-bold text-[#efe0d7]">
                                        ${booking.totalPrice.toLocaleString()}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[#d9c2b3] hover:text-[#ffb77e] transition-colors p-2 rounded-full hover:bg-[#302823]">
                                            <Icon name="more_vert" size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {bookings.length === 0 && (
                        <div className="p-8 text-center text-[#d9c2b3]">
                            <Icon name="event_busy" size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No bookings found.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

