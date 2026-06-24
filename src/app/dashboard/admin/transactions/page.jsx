"use client"

import { useState } from "react"
// import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Icon from "@/components/Icon"

export default function AdminTransactionsPage() {
    const [transactions, setTransactions] = useState([
        {
            id: "TXN-9021",
            property: "Azure Bay Villa",
            tenant: "Sarah Jenkins",
            owner: "Alexander Hunt",
            amount: "$9,250",
            date: "Oct 25, 2026",
            status: "Completed"
        },
        {
            id: "TXN-9022",
            property: "Celestial Heights Villa",
            tenant: "Michael Chang",
            owner: "Emma Wilson",
            amount: "$1,600",
            date: "Oct 28, 2026",
            status: "Pending"
        },
        {
            id: "TXN-9023",
            property: "Lakeside Cabin",
            tenant: "David Miller",
            owner: "Sarah Jenkins",
            amount: "$1,450",
            date: "Nov 02, 2026",
            status: "Refunded"
        }
    ])

    const getStatusBadge = (status) => {
        switch (status) {
            case "Completed":
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
            case "Refunded":
            case "Failed":
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
                        <h2 className="text-3xl font-bold text-[#efe0d7]">Transactions</h2>
                        <p className="text-[#d9c2b3] text-sm mt-1">
                            View and manage financial transactions across the platform.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-[#211a15] border border-[#534438]/50 rounded-2xl p-4 min-w-[160px]">
                            <div className="text-[#d9c2b3] text-xs font-medium mb-1">Total Volume</div>
                            <div className="text-[#ffb77e] text-2xl font-bold">$124,500</div>
                        </div>
                        <div className="bg-[#211a15] border border-[#534438]/50 rounded-2xl p-4 min-w-[160px]">
                            <div className="text-[#d9c2b3] text-xs font-medium mb-1">Revenue (10%)</div>
                            <div className="text-green-400 text-2xl font-bold">$12,450</div>
                        </div>
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
                                placeholder="Search by ID, property, or name..."
                                className="w-full bg-[#19120d] border border-[#534438]/50 rounded-xl pl-12 pr-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                            />
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <select className="bg-[#19120d] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none flex-1 md:flex-none">
                                <option value="">All Statuses</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                                <option value="Refunded">Refunded</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-[#211a15] text-[10px] uppercase tracking-widest text-[#d9c2b3] font-bold">
                                <tr>
                                    <th className="px-6 py-4">Transaction ID</th>
                                    <th className="px-6 py-4">Property Name</th>
                                    <th className="px-6 py-4">Tenant</th>
                                    <th className="px-6 py-4">Owner</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#534438]/20">
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-[#302823]/50 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-bold text-[#efe0d7]">{transaction.id}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-[#ffb77e]">
                                            {transaction.property}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-[#d9c2b3] flex items-center gap-2">
                                                <Icon name="person" size={14} className="text-[#534438]" />{" "}
                                                {transaction.tenant}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-[#d9c2b3] flex items-center gap-2">
                                                <Icon name="real_estate_agent" size={14} className="text-[#534438]" />{" "}
                                                {transaction.owner}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#efe0d7]">
                                            {transaction.amount}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#d9c2b3]">{transaction.date}</td>
                                        <td className="px-6 py-4">{getStatusBadge(transaction.status)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] inline-flex items-center justify-center hover:bg-[#ffb77e]/20 hover:text-[#ffb77e] transition-colors"
                                                title="Download Receipt"
                                            >
                                                <Icon name="download" size={16} />
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

