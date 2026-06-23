"use client"

// import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SummaryCards from "@/components/dashboard/SummaryCards"
import RevenueChart from "@/components/dashboard/RevenueChart"
import Icon from "@/components/Icon"

export default function OverviewPage() {
    const summaryCards = [
        {
            id: 1,
            title: "Total Earnings",
            value: "$142,850.00",
            icon: "payments",
            trend: "+12.4% vs last month",
            trendIcon: "trending_up",
            colorClass: {
                glow: "bg-[#ffb77e]/10 group-hover:bg-[#ffb77e]/20",
                iconBg: "bg-[#ffb77e]/10",
                iconText: "text-[#ffb77e]",
                trendText: "text-[#64d6eb]"
            }
        },
        {
            id: 2,
            title: "Total Properties",
            value: "18",
            icon: "domain",
            trend: "15 Active • 3 Maintenance",
            colorClass: {
                glow: "bg-[#bec6e0]/10 group-hover:bg-[#bec6e0]/20",
                iconBg: "bg-[#bec6e0]/10",
                iconText: "text-[#bec6e0]",
                trendText: "text-[#d9c2b3]"
            }
        },
        {
            id: 3,
            title: "Total Bookings",
            value: "342",
            icon: "event_available",
            trend: "+8.1% year to date",
            trendIcon: "trending_up",
            colorClass: {
                glow: "bg-[#ffdcc3]/5 group-hover:bg-[#ffdcc3]/15",
                iconBg: "bg-[#ffdcc3]/10",
                iconText: "text-[#ffdcc3]",
                trendText: "text-[#64d6eb]"
            }
        }
    ]

    const chartData = [
        { name: "Jan", value: 45000 },
        { name: "Feb", value: 52000 },
        { name: "Mar", value: 48000 },
        { name: "Apr", value: 61000 },
        { name: "May", value: 59000 },
        { name: "Jun", value: 75000 },
        { name: "Jul", value: 82000 },
        { name: "Aug", value: 78000 },
        { name: "Sep", value: 90000 },
        { name: "Oct", value: 95000 },
        { name: "Nov", value: 110000 },
        { name: "Dec", value: 142850 }
    ]

    const recentProperties = [
        {
            id: 1,
            name: "The Zenith Heights",
            location: "Manhattan, NY",
            status: "Approved",
            price: "$24,200/mo",
            date: "Oct 12, 2026",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKbwOYKgGW6fz5B4Wh6j3RaPTVWNng8TkQbOQb7hyT85yNd4MAHOsf36Bk9-WguRNUHeLCzZ-0qSatOYuCpbmk4ou9B-3GEm7-QHX-xYKC7oyQOzAT7nnML4yjOtwCAGmn25gtpAQheOn2SEDmxLHp65HD5EC53fLYzOD-V_ahDLAG6DEVtj9iosJRP12ZGTUVjNn6Bt-rDyi-oBhwz7qi4L2rSErOTWWcS3w3mV0NSp6SnWrRNvAVHPQI0_w1WyE2RDBHD-NiS58"
        },
        {
            id: 2,
            name: "Azure Bay Villa",
            location: "Miami, FL",
            status: "Pending",
            price: "$18,500/mo",
            date: "Nov 05, 2026",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPxA4Ln7tAUSX6hQzIkgHmqYNSpMnCYVyHNe2mnj2Ki7UpeYWrbs0rrJXdkKXlYfV18lrABNjJgXKKUbj0jSVw0E0JloSyiBMrCQQE5LtGZRmgt18BUUdMreAyoRpDPLF4LVylbcJtDgERT1KKBzTWhDyxNMo3dL9akEnKh_RvjBW0tm7Paa17AQT7tDOqHCgbGzcGjGLN6G06wwLOzVTv46hk6oc21MD0G4_xMJJfF31pLv9Nxn1GNecRyLaQrUrUVE-f-LW8Mc4"
        },
        {
            id: 3,
            name: "Lakeside Cabin",
            location: "Lake Tahoe, CA",
            status: "Rejected",
            price: "$8,800/mo",
            date: "Dec 20, 2026",
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
                    <h2 className="text-3xl font-bold text-[#efe0d7]">Overview</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">
                        Welcome back. Here's what's happening with your properties today.
                    </p>
                </div>

                <SummaryCards cards={summaryCards} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* We make the chart span full width in its container or span 2 columns if sidebar exists */}
                    <div className="lg:col-span-3">
                        <RevenueChart
                            data={chartData}
                            title="Monthly Earnings"
                            subtitle="Revenue generated over the last 12 months"
                            colorTheme="copper"
                        />
                    </div>
                </div>

                <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-[#534438]/20 flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-xl text-[#efe0d7]">Recent Properties</h4>
                            <p className="text-[#d9c2b3] text-sm">Latest additions to your portfolio</p>
                        </div>
                        <button className="text-[#ffb77e] text-sm font-bold hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-[#211a15] text-[10px] uppercase tracking-widest text-[#d9c2b3] font-bold">
                                <tr>
                                    <th className="px-6 py-4">Property</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Created Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#534438]/20">
                                {recentProperties.map((property) => (
                                    <tr
                                        key={property.id}
                                        className="hover:bg-[#302823]/50 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        alt={property.name}
                                                        src={property.image}
                                                    />
                                                </div>
                                                <div className="text-sm font-bold text-[#efe0d7]">{property.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#d9c2b3]">{property.location}</td>
                                        <td className="px-6 py-4">{getStatusBadge(property.status)}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#ffb77e]">{property.price}</td>
                                        <td className="px-6 py-4 text-sm text-[#d9c2b3]">{property.date}</td>
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

