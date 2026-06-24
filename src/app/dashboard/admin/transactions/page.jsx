"use client"

import { useState, useEffect } from "react"
import Icon from "@/components/Icon"
import { authClient } from "@/lib/auth-client"

export default function AdminTransactionsPage() {
    const { data: session } = authClient.useSession()
    const token = session?.session?.token

    // ── State ─────────────────────────────────────────────
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // ── Filter State ──────────────────────────────────────
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("")

    // ── Fetch ─────────────────────────────────────────────
    const fetchTransactions = async () => {
        if (!token) return
        setLoading(true)
        setError("")
        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
                headers: { Authorization: `Bearer ${tokenData.token}` }
            })
            if (!res.ok) throw new Error("Failed to fetch transactions")
            const data = await res.json()
            setBookings(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [token])

    // ── Filter Logic ──────────────────────────────────────
    const filteredBookings = bookings.filter((b) => {
        const txnId = b.sessionId?.slice(-8).toUpperCase()
        const matchSearch =
            txnId?.includes(searchQuery.toUpperCase()) ||
            b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.ownerEmail?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchStatus = statusFilter ? b.status === statusFilter : true
        return matchSearch && matchStatus
    })

    // ── Stats ─────────────────────────────────────────────
    const totalVolume = bookings.filter((b) => b.status === "approved").reduce((sum, b) => sum + (b.totalPrice || 0), 0)
    const revenue = Math.round(totalVolume * 0.1)

    // ── Status Badge ──────────────────────────────────────
    const getStatusBadge = (status) => {
        const map = {
            approved: "bg-green-500/20 text-green-400 border-green-500/20",
            pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
            rejected: "bg-red-500/20 text-red-400 border-red-500/20",
            cancelled: "bg-red-500/20 text-red-400 border-red-500/20"
        }
        const key = status?.toLowerCase()
        return (
            <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold border capitalize ${map[key] || "bg-slate-500/20 text-slate-400 border-slate-500/20"}`}
            >
                {status}
            </span>
        )
    }

    // ── Render ────────────────────────────────────────────
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-[#efe0d7]">Transactions</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">
                        View and manage financial transactions across the platform.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="flex gap-4">
                    <div className="bg-[#211a15] border border-[#534438]/50 rounded-2xl p-4 min-w-[160px]">
                        <div className="text-[#d9c2b3] text-xs font-medium mb-1">Total Volume</div>
                        <div className="text-[#ffb77e] text-2xl font-bold">${totalVolume.toLocaleString()}</div>
                    </div>
                    <div className="bg-[#211a15] border border-[#534438]/50 rounded-2xl p-4 min-w-[160px]">
                        <div className="text-[#d9c2b3] text-xs font-medium mb-1">Revenue (10%)</div>
                        <div className="text-green-400 text-2xl font-bold">${revenue.toLocaleString()}</div>
                    </div>
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by ID, property, or email..."
                            className="w-full bg-[#19120d] border border-[#534438]/50 rounded-xl pl-12 pr-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#19120d] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none w-full md:w-auto"
                    >
                        <option value="">All Statuses</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="p-12 text-center text-[#d9c2b3]">Loading transactions...</div>
                ) : error ? (
                    <div className="p-12 text-center text-red-400">{error}</div>
                ) : filteredBookings.length === 0 ? (
                    <div className="p-12 text-center text-[#d9c2b3]">No transactions found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-[#211a15] text-[10px] uppercase tracking-widest text-[#d9c2b3] font-bold">
                                <tr>
                                    <th className="px-6 py-4">Transaction ID</th>
                                    <th className="px-6 py-4">Property</th>
                                    <th className="px-6 py-4">Tenant</th>
                                    <th className="px-6 py-4">Owner</th>
                                    <th className="px-6 py-4">Nights</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#534438]/20">
                                {filteredBookings.map((booking) => {
                                    // sessionId এর শেষ ৮ character = Transaction ID
                                    const txnId = "TXN-" + booking.sessionId?.slice(-8).toUpperCase()

                                    return (
                                        <tr key={booking._id} className="hover:bg-[#302823]/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold text-[#efe0d7]">{txnId}</div>
                                                <div className="text-[10px] text-[#534438] font-mono mt-0.5">
                                                    {booking.sessionId?.slice(0, 20)}...
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#ffb77e]">
                                                {booking.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-[#d9c2b3] flex items-center gap-2">
                                                    <Icon name="person" size={14} className="text-[#534438]" />
                                                    {booking.userEmail}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-[#d9c2b3] flex items-center gap-2">
                                                    <Icon
                                                        name="real_estate_agent"
                                                        size={14}
                                                        className="text-[#534438]"
                                                    />
                                                    {booking.ownerEmail}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#d9c2b3]">
                                                {booking.nights} {booking.nights === 1 ? "night" : "nights"}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-[#efe0d7]">
                                                ${booking.totalPrice?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#d9c2b3]">
                                                {booking.bookedAt
                                                    ? new Date(booking.bookedAt).toLocaleDateString("en-US", {
                                                          month: "short",
                                                          day: "numeric",
                                                          year: "numeric"
                                                      })
                                                    : "—"}
                                            </td>
                                            <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    )
}

