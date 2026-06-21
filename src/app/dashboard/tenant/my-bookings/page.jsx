"use client"

import DashboardLayout from "@/../src/app/dashboard/layout"
import Icon from "@/components/Icon"

export default function MyBookingsPage() {
    const bookings = [
        {
            id: "BK-1001",
            property: "The Zenith Heights",
            location: "Manhattan, NY",
            date: "Oct 12, 2026 - Oct 18, 2026",
            amount: "$4,200",
            bookingStatus: "Approved",
            paymentStatus: "Paid",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKbwOYKgGW6fz5B4Wh6j3RaPTVWNng8TkQbOQb7hyT85yNd4MAHOsf36Bk9-WguRNUHeLCzZ-0qSatOYuCpbmk4ou9B-3GEm7-QHX-xYKC7oyQOzAT7nnML4yjOtwCAGmn25gtpAQheOn2SEDmxLHp65HD5EC53fLYzOD-V_ahDLAG6DEVtj9iosJRP12ZGTUVjNn6Bt-rDyi-oBhwz7qi4L2rSErOTWWcS3w3mV0NSp6SnWrRNvAVHPQI0_w1WyE2RDBHD-NiS58"
        },
        {
            id: "BK-1002",
            property: "Azure Bay Villa",
            location: "Miami, FL",
            date: "Nov 05, 2026 - Nov 12, 2026",
            amount: "$5,600",
            bookingStatus: "Pending",
            paymentStatus: "Unpaid",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPxA4Ln7tAUSX6hQzIkgHmqYNSpMnCYVyHNe2mnj2Ki7UpeYWrbs0rrJXdkKXlYfV18lrABNjJgXKKUbj0jSVw0E0JloSyiBMrCQQE5LtGZRmgt18BUUdMreAyoRpDPLF4LVylbcJtDgERT1KKBzTWhDyxNMo3dL9akEnKh_RvjBW0tm7Paa17AQT7tDOqHCgbGzcGjGLN6G06wwLOzVTv46hk6oc21MD0G4_xMJJfF31pLv9Nxn1GNecRyLaQrUrUVE-f-LW8Mc4"
        },
        {
            id: "BK-1003",
            property: "Lakeside Cabin",
            location: "Lake Tahoe, CA",
            date: "Dec 20, 2026 - Dec 27, 2026",
            amount: "$2,800",
            bookingStatus: "Rejected",
            paymentStatus: "Refunded",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXBwJ-6EwPcYjGexq9gWyuAhdh5VDLBJxewEIletxToB-g734JKUGj2mVC4leTufiHMAkUpNS9p2YMv6NUL-jx__NvaKtueCwMGm_oolKaF03TwKWldRPl872aLYiT20zdJl7lV4-Kz_VItGQRwND0H9Wb0STTkCfyxSECF_1IA9xhnPv5vxGZ8hcPVhc2gfcI58v1uM-bmW9PPeKJzcnNOMwJS8-iEyOdBh1YCQLLQ_EC3JRc7huLW4gzC-pyxOkmeMcwRcbPTNc"
        }
    ]

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
                <div>
                    <h2 className="text-3xl font-bold text-[#efe0d7]">My Bookings</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">Manage your upcoming and past property reservations.</p>
                </div>

                <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-[#211a15] text-[10px] uppercase tracking-widest text-[#d9c2b3] font-bold">
                                <tr>
                                    <th className="px-6 py-4">Property Name</th>
                                    <th className="px-6 py-4">Booking Date</th>
                                    <th className="px-6 py-4">Amount Paid</th>
                                    <th className="px-6 py-4">Booking Status</th>
                                    <th className="px-6 py-4">Payment Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#534438]/20">
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-[#302823]/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        alt={booking.property}
                                                        src={booking.image}
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-[#efe0d7]">
                                                        {booking.property}
                                                    </div>
                                                    <div className="text-[10px] text-[#d9c2b3]">{booking.location}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-[#efe0d7]">{booking.date}</div>
                                            <div className="text-[10px] text-[#d9c2b3]">ID: {booking.id}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#efe0d7]">{booking.amount}</td>
                                        <td className="px-6 py-4">{getStatusBadge(booking.bookingStatus)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {booking.paymentStatus === "Paid" ? (
                                                    <Icon name="check_circle" className="text-green-400" size={16} />
                                                ) : booking.paymentStatus === "Unpaid" ? (
                                                    <Icon name="schedule" className="text-yellow-400" size={16} />
                                                ) : (
                                                    <Icon name="info" className="text-red-400" size={16} />
                                                )}
                                                <span className="text-sm text-[#efe0d7]">{booking.paymentStatus}</span>
                                            </div>
                                        </td>
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
        </>
    )
}

