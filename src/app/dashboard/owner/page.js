import DashboardLayout from "@/components/dashboard/DashboardLayout"
import SummaryCards from "@/components/dashboard/SummaryCards"
import RevenueChart from "@/components/dashboard/RevenueChart"
// import Icon from "@/components/Icon"

export default function OwnerDashboard() {
    const summaryCards = [
        {
            id: 1,
            title: "Total Earnings",
            value: "$142,850.00",
            icon: "payments",
            trend: "+12.4% vs last month",
            trendIcon: "trending_up",
            colorClass: {
                glow: "bg-primary/10 group-hover:bg-primary/20",
                iconBg: "bg-primary/10",
                iconText: "text-primary",
                trendText: "text-tertiary"
            }
        },
        {
            id: 2,
            title: "Properties",
            value: "18",
            icon: "domain",
            trend: "15 Active • 3 Maintenance",
            colorClass: {
                glow: "bg-secondary/10 group-hover:bg-secondary/20",
                iconBg: "bg-secondary/10",
                iconText: "text-secondary",
                trendText: "text-on-surface-variant"
            }
        },
        {
            id: 3,
            title: "New Bookings",
            value: "342",
            icon: "event_available",
            trend: "+8.1% year to date",
            trendIcon: "trending_up",
            colorClass: {
                glow: "bg-primary-fixed/5 group-hover:bg-primary-fixed/15",
                iconBg: "bg-primary-fixed/10",
                iconText: "text-primary-fixed",
                trendText: "text-tertiary"
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

    return (
        <DashboardLayout role="owner">
            {/* Summary Bento Grid */}
            <SummaryCards cards={summaryCards} />

            {/* Earnings Chart & Booking Requests */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
                <RevenueChart data={chartData} colorTheme="copper" />

                {/* Booking Requests Sidebar */}
                <div className="glass-panel rounded-xxl overflow-hidden flex flex-col h-[400px]">
                    <div className="p-lg border-b border-outline-variant/10">
                        <h4 className="font-headline-md text-on-surface">Recent Requests</h4>
                        <p className="text-on-surface-variant text-sm">Action required for 3 pending</p>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-md space-y-md">
                        {/* Request Item */}
                        <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/5 hover:border-primary/20 transition-all cursor-pointer">
                            <div className="flex items-center gap-md mb-md">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        alt="Elena Vance"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXBwJ-6EwPcYjGexq9gWyuAhdh5VDLBJxewEIletxToB-g734JKUGj2mVC4leTufiHMAkUpNS9p2YMv6NUL-jx__NvaKtueCwMGm_oolKaF03TwKWldRPl872aLYiT20zdJl7lV4-Kz_VItGQRwND0H9Wb0STTkCfyxSECF_1IA9xhnPv5vxGZ8hcPVhc2gfcI58v1uM-bmW9PPeKJzcnNOMwJS8-iEyOdBh1YCQLLQ_EC3JRc7huLW4gzC-pyxOkmeMcwRcbPTNc"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-sm font-bold text-on-surface">Elena Vance</h5>
                                    <p className="text-[10px] text-on-surface-variant">The Zenith Heights • 4 Nights</p>
                                </div>
                                <span className="text-[10px] font-bold text-primary">NEW</span>
                            </div>
                            <div className="flex gap-sm">
                                <button className="flex-1 bg-primary text-on-primary font-bold text-xs py-2 rounded-lg hover:opacity-90 transition-all">
                                    Accept
                                </button>
                                <button className="flex-1 border border-outline-variant/30 text-on-surface-variant font-bold text-xs py-2 rounded-lg hover:bg-surface-container-high transition-all">
                                    Decline
                                </button>
                            </div>
                        </div>

                        {/* Request Item */}
                        <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/5 hover:border-primary/20 transition-all cursor-pointer">
                            <div className="flex items-center gap-md mb-md">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        alt="Marcus Sterling"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPxA4Ln7tAUSX6hQzIkgHmqYNSpMnCYVyHNe2mnj2Ki7UpeYWrbs0rrJXdkKXlYfV18lrABNjJgXKKUbj0jSVw0E0JloSyiBMrCQQE5LtGZRmgt18BUUdMreAyoRpDPLF4LVylbcJtDgERT1KKBzTWhDyxNMo3dL9akEnKh_RvjBW0tm7Paa17AQT7tDOqHCgbGzcGjGLN6G06wwLOzVTv46hk6oc21MD0G4_xMJJfF31pLv9Nxn1GNecRyLaQrUrUVE-f-LW8Mc4"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-sm font-bold text-on-surface">Marcus Sterling</h5>
                                    <p className="text-[10px] text-on-surface-variant">Azure Bay Villa • 7 Nights</p>
                                </div>
                            </div>
                            <div className="flex gap-sm">
                                <button className="flex-1 bg-primary text-on-primary font-bold text-xs py-2 rounded-lg hover:opacity-90 transition-all">
                                    Accept
                                </button>
                                <button className="flex-1 border border-outline-variant/30 text-on-surface-variant font-bold text-xs py-2 rounded-lg hover:bg-surface-container-high transition-all">
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Property Management Table */}
            <section className="glass-panel rounded-xxl overflow-hidden">
                <div className="p-lg border-b border-outline-variant/10 flex flex-col md:flex-row md:items-center justify-between gap-md">
                    <div>
                        <h4 className="font-headline-md text-on-surface">Manage Properties</h4>
                        <p className="text-on-surface-variant text-sm">
                            Performance tracking for your luxury portfolio
                        </p>
                    </div>
                    <div className="flex gap-sm">
                        <button className="bg-surface-container-highest text-on-surface px-4 py-2 rounded-lg text-sm flex items-center gap-xs hover:bg-surface-container-high transition-all">
                            {/* <Icon name="tune" size={16} /> Filter */}
                        </button>
                        <button className="copper-gradient text-white px-6 py-2 rounded-lg text-sm font-bold copper-glow hover:scale-105 transition-all">
                            Add Property
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-surface-container-low text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                            <tr>
                                <th className="px-lg py-4">Property</th>
                                <th className="px-lg py-4">Status</th>
                                <th className="px-lg py-4">Occupancy</th>
                                <th className="px-lg py-4">Revenue</th>
                                <th className="px-lg py-4">Reviews</th>
                                <th className="px-lg py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/5">
                            <tr className="hover:bg-surface-container-high/30 transition-colors group cursor-pointer active:scale-[0.98]">
                                <td className="px-lg py-md">
                                    <div className="flex items-center gap-md">
                                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                className="w-full h-full object-cover"
                                                alt="The Zenith Heights"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKbwOYKgGW6fz5B4Wh6j3RaPTVWNng8TkQbOQb7hyT85yNd4MAHOsf36Bk9-WguRNUHeLCzZ-0qSatOYuCpbmk4ou9B-3GEm7-QHX-xYKC7oyQOzAT7nnML4yjOtwCAGmn25gtpAQheOn2SEDmxLHp65HD5EC53fLYzOD-V_ahDLAG6DEVtj9iosJRP12ZGTUVjNn6Bt-rDyi-oBhwz7qi4L2rSErOTWWcS3w3mV0NSp6SnWrRNvAVHPQI0_w1WyE2RDBHD-NiS58"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-on-surface">The Zenith Heights</div>
                                            <div className="text-[10px] text-on-surface-variant">Manhattan, NY</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-lg py-md">
                                    <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-tertiary-container/20 text-tertiary-fixed border border-tertiary/20">
                                        Available
                                    </span>
                                </td>
                                <td className="px-lg py-md">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-xs text-on-surface">92%</div>
                                        <div className="w-24 h-1 bg-surface-container rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[92%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-lg py-md text-sm font-bold text-on-surface">$24,200</td>
                                <td className="px-lg py-md">
                                    <div className="flex items-center gap-1 text-primary">
                                        {/* <Icon name="star_filled" size={16} /> */}
                                        <span className="text-xs font-bold text-on-surface">4.9</span>
                                    </div>
                                </td>
                                <td className="px-lg py-md">
                                    <button className="text-on-surface-variant hover:text-primary transition-colors">
                                        {/* <Icon name="more_vert" size={20} /> */}
                                    </button>
                                </td>
                            </tr>
                            {/* Add more rows here if needed */}
                        </tbody>
                    </table>
                </div>
            </section>
        </DashboardLayout>
    )
}

