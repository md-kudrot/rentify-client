import DashboardLayout from "@/../src/app/dashboard/layout"
import SummaryCards from "@/components/dashboard/SummaryCards"
import RevenueChart from "@/components/dashboard/RevenueChart"
import Icon from "@/components/Icon"

export default function AdminDashboard() {
    const summaryCards = [
        {
            id: 1,
            title: "Platform Revenue",
            value: "$2.4M",
            icon: "account_balance",
            trend: "+15% YoY",
            trendIcon: "trending_up",
            colorClass: {
                glow: "bg-tertiary/10 group-hover:bg-tertiary/20",
                iconBg: "bg-tertiary/10",
                iconText: "text-tertiary",
                trendText: "text-tertiary"
            }
        },
        {
            id: 2,
            title: "Total Users",
            value: "12,450",
            icon: "group",
            trend: "850 New This Month",
            colorClass: {
                glow: "bg-secondary/10 group-hover:bg-secondary/20",
                iconBg: "bg-secondary/10",
                iconText: "text-secondary",
                trendText: "text-on-surface-variant"
            }
        },
        {
            id: 3,
            title: "Active Properties",
            value: "3,210",
            icon: "real_estate_agent",
            trend: "94% Occupancy Rate",
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
        { name: "Jan", value: 150000 },
        { name: "Feb", value: 165000 },
        { name: "Mar", value: 160000 },
        { name: "Apr", value: 180000 },
        { name: "May", value: 175000 },
        { name: "Jun", value: 195000 },
        { name: "Jul", value: 210000 },
        { name: "Aug", value: 205000 },
        { name: "Sep", value: 220000 },
        { name: "Oct", value: 235000 },
        { name: "Nov", value: 250000 },
        { name: "Dec", value: 280000 }
    ]

    return (
        <>
            <SummaryCards cards={summaryCards} />

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg mt-lg">
                <RevenueChart
                    data={chartData}
                    title="Platform Volume"
                    subtitle="Total transaction volume across all properties"
                    colorTheme="blue"
                />

                {/* System Health / Recent Activity */}
                <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-xxl overflow-hidden flex flex-col h-[400px]">
                    <div className="p-lg border-b border-outline-variant/10">
                        <h4 className="font-headline-md text-on-surface">System Alerts</h4>
                        <p className="text-on-surface-variant text-sm">Real-time platform monitoring</p>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-md space-y-md">
                        <div className="p-md bg-error-container/10 rounded-xl border border-error/20 flex items-start gap-md">
                            <Icon name="warning" className="text-error" size={24} />
                            <div>
                                <h5 className="text-sm font-bold text-on-surface">Payment Gateway Latency</h5>
                                <p className="text-[10px] text-on-surface-variant">
                                    Elevated response times detected in Stripe integration.
                                </p>
                            </div>
                        </div>

                        <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/5 flex items-start gap-md">
                            <Icon name="info" className="text-tertiary" size={24} />
                            <div>
                                <h5 className="text-sm font-bold text-on-surface">New Owner Onboarding</h5>
                                <p className="text-[10px] text-on-surface-variant">
                                    5 new luxury property owners joined today.
                                </p>
                            </div>
                        </div>

                        <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/5 flex items-start gap-md">
                            <Icon name="update" className="text-secondary" size={24} />
                            <div>
                                <h5 className="text-sm font-bold text-on-surface">System Update Scheduled</h5>
                                <p className="text-[10px] text-on-surface-variant">
                                    Maintenance window planned for Sunday 2AM EST.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

