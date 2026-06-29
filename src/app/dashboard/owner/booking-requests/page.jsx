"use client"
import { useEffect, useState } from "react"
// import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Icon from "@/components/Icon"
import { authClient, useSession } from "@/lib/auth-client"
import Image from "next/image"

export default function BookingRequestsPage() {
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)

    // const bookings = [
    //     {
    //         id: "REQ-201",
    //         tenant: "Elena Vance",
    //         property: "The Zenith Heights",
    //         amount: "$24,200",
    //         date: "Oct 15 - Oct 22, 2026",
    //         contact: "elena.vance@example.com",
    //         status: "Pending",
    //         image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXBwJ-6EwPcYjGexq9gWyuAhdh5VDLBJxewEIletxToB-g734JKUGj2mVC4leTufiHMAkUpNS9p2YMv6NUL-jx__NvaKtueCwMGm_oolKaF03TwKWldRPl872aLYiT20zdJl7lV4-Kz_VItGQRwND0H9Wb0STTkCfyxSECF_1IA9xhnPv5vxGZ8hcPVhc2gfcI58v1uM-bmW9PPeKJzcnNOMwJS8-iEyOdBh1YCQLLQ_EC3JRc7huLW4gzC-pyxOkmeMcwRcbPTNc"
    //     },
    //     {
    //         id: "REQ-202",
    //         tenant: "Marcus Sterling",
    //         property: "Azure Bay Villa",
    //         amount: "$18,500",
    //         date: "Nov 01 - Nov 08, 2026",
    //         contact: "m.sterling@example.com",
    //         status: "Approved",
    //         image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPxA4Ln7tAUSX6hQzIkgHmqYNSpMnCYVyHNe2mnj2Ki7UpeYWrbs0rrJXdkKXlYfV18lrABNjJgXKKUbj0jSVw0E0JloSyiBMrCQQE5LtGZRmgt18BUUdMreAyoRpDPLF4LVylbcJtDgERT1KKBzTWhDyxNMo3dL9akEnKh_RvjBW0tm7Paa17AQT7tDOqHCgbGzcGjGLN6G06wwLOzVTv46hk6oc21MD0G4_xMJJfF31pLv9Nxn1GNecRyLaQrUrUVE-f-LW8Mc4"
    //     },
    //     {
    //         id: "REQ-203",
    //         tenant: "Sophia Laurent",
    //         property: "Lakeside Cabin",
    //         amount: "$8,800",
    //         date: "Dec 10 - Dec 15, 2026",
    //         contact: "sophia.l@example.com",
    //         status: "Rejected",
    //         image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKbwOYKgGW6fz5B4Wh6j3RaPTVWNng8TkQbOQb7hyT85yNd4MAHOsf36Bk9-WguRNUHeLCzZ-0qSatOYuCpbmk4ou9B-3GEm7-QHX-xYKC7oyQOzAT7nnML4yjOtwCAGmn25gtpAQheOn2SEDmxLHp65HD5EC53fLYzOD-V_ahDLAG6DEVtj9iosJRP12ZGTUVjNn6Bt-rDyi-oBhwz7qi4L2rSErOTWWcS3w3mV0NSp6SnWrRNvAVHPQI0_w1WyE2RDBHD-NiS58"
    //     }
    // ]

    const getStatusBadge = (status) => {
        switch (status) {
            case "approved":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/20">
                        {status}
                    </span>
                )
            case "pending":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">
                        {status}
                    </span>
                )
            case "rejected":
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

    const handleRejectClick = (booking) => {
        setSelectedBooking(booking)
        setIsRejectModalOpen(true)
    }
    const { data: session } = useSession()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        if (!session?.user?.email) return

        const fetchBookings = async () => {
            try {
                setLoading(true)
                const email = session.user.email
                // console.log(email)

                const { data: tokenData } = await authClient.token()
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/owner/${email}`, {
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

    //handleApprove function will patch the booking status to approved and update the bookings state
    const handleApprove = async (bookingId) => {
        try {
            const { data: tokenData } = await authClient.token()

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${bookingId}/approve`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData.token}`
                },
                body: JSON.stringify({ status: "approved" })
            })

            if (!res.ok) throw new Error("Failed to approve booking")

            // State update
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === bookingId ? { ...booking, status: "approved" } : booking
                )
            )
        } catch (err) {
            console.error(err.message)
        }
    }

    const handleReject = async (bookingId) => {
        try {
            const { data: tokenData } = await authClient.token()

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${bookingId}/approve`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData.token}`
                },
                body: JSON.stringify({ status: "rejected" })
            })

            if (!res.ok) throw new Error("Failed to reject booking")

            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === bookingId ? { ...booking, status: "rejected" } : booking
                )
            )
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-[#efe0d7]">Booking Requests</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">Review and manage tenant booking requests.</p>
                </div>

                <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-[#534438]/20 flex justify-between items-center bg-[#211a15]/50">
                        <h4 className="font-bold text-xl text-[#efe0d7]">All Requests</h4>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-[#211a15] text-[10px] uppercase tracking-widest text-[#d9c2b3] font-bold">
                                <tr>
                                    <th className="px-6 py-4">Tenant</th>
                                    <th className="px-6 py-4">Property</th>
                                    <th className="px-6 py-4">Booking Amount</th>
                                    {/* <th className="px-6 py-4">Booking Date</th>
                                    <th className="px-6 py-4">Contact</th> */}
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#534438]/20">
                                {bookings.map((booking, index) => (
                                    <tr key={index} className="hover:bg-[#302823]/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <div className="text-sm font-bold text-[#efe0d7]">
                                                        {booking?.userEmail || "N/A"}
                                                    </div>
                                                    <div className="text-[10px] text-[#d9c2b3]">
                                                        ID: {booking.userId || "N/A"}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#efe0d7]">
                                            {booking.title || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#ffb77e]">
                                            $ {booking.totalPrice || "N/A"}
                                        </td>
                                        {/* <td className="px-6 py-4 text-sm text-[#d9c2b3]">{booking.date}</td> */}
                                        {/* <td className="px-6 py-4 text-sm text-[#d9c2b3]">{booking.contact}</td> */}
                                        <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                                        <td className="px-6 py-4 text-right">
                                            {booking.status == "pending" ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleApprove(booking._id)}
                                                        className="px-4 py-2 bg-green-500/10 text-green-400 text-xs font-bold rounded-lg hover:bg-green-500/20 transition-colors border border-green-500/20"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectClick(booking)}
                                                        className="px-4 py-2 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <button className="text-[#d9c2b3] hover:text-[#ffb77e] transition-colors p-2 rounded-full hover:bg-[#302823]">
                                                    <Icon name="more_vert" size={20} />
                                                </button>
                                            )}
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

                {/* Rejection Confirmation Modal */}
                {isRejectModalOpen && selectedBooking && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-[#19120d] border border-[#534438]/30 rounded-3xl w-1/3  overflow-hidden animate-fade-in shadow-2xl">
                            <div className="p-6 border-b border-[#534438]/20 flex justify-between items-center bg-[#211a15]">
                                <h3 className="text-xl font-bold text-[#efe0d7] flex items-center gap-2">
                                    <Icon name="cancel" size={24} className="text-red-400" /> Reject Booking
                                </h3>
                                <button
                                    onClick={() => setIsRejectModalOpen(false)}
                                    className="text-[#d9c2b3] hover:text-[#ffb77e] p-2 rounded-full hover:bg-[#302823] transition-colors"
                                >
                                    <Icon name="close" size={24} />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <p className="text-[#efe0d7]">
                                    Are you sure you want to reject the booking request from{" "}
                                    <span className="font-bold text-[#ffb77e]">{selectedBooking.userEmail}</span> for{" "}
                                    <span className="font-bold">{selectedBooking.title}</span>?
                                </p>
                                <div>
                                    <label className="text-sm font-bold text-[#d9c2b3] block mb-2">
                                        Reason for rejection (Optional)
                                    </label>
                                    <textarea
                                        rows="3"
                                        className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-red-400 transition-colors resize-none custom-scrollbar"
                                        placeholder="Provide a reason to the tenant..."
                                    ></textarea>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsRejectModalOpen(false)}
                                        className="px-6 py-2.5 bg-[#302823] text-[#efe0d7] rounded-xl font-bold hover:bg-[#534438]/50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsRejectModalOpen(false)
                                            handleReject(selectedBooking._id)
                                        }}
                                        className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                                    >
                                        Confirm Rejection
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

