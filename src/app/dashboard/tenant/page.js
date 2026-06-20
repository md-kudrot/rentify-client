import SummaryCards from "@/components/dashboard/SummaryCards"
import Icon from "@/components/Icon"

export default function TenantDashboard() {
    const summaryCards = [
        {
            id: 1,
            title: "Current Rent",
            value: "$4,250.00",
            icon: "home",
            trend: "Due in 12 days",
            trendIcon: "schedule",
            colorClass: {
                glow: "bg-tertiary/10 group-hover:bg-tertiary/20",
                iconBg: "bg-tertiary/10",
                iconText: "text-tertiary",
                trendText: "text-on-surface-variant"
            }
        },
        {
            id: 2,
            title: "Active Leases",
            value: "1",
            icon: "description",
            trend: "Expires Oct 2026",
            colorClass: {
                glow: "bg-secondary/10 group-hover:bg-secondary/20",
                iconBg: "bg-secondary/10",
                iconText: "text-secondary",
                trendText: "text-on-surface-variant"
            }
        },
        {
            id: 3,
            title: "Maintenance",
            value: "0",
            icon: "build",
            trend: "All requests resolved",
            trendIcon: "check_circle",
            colorClass: {
                glow: "bg-primary-fixed/5 group-hover:bg-primary-fixed/15",
                iconBg: "bg-primary-fixed/10",
                iconText: "text-primary-fixed",
                trendText: "text-tertiary"
            }
        }
    ]

    return (
        <>
            <SummaryCards cards={summaryCards} />

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-lg mt-lg">
                {/* Payment History */}
                <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-xxl overflow-hidden flex flex-col min-h-[400px]">
                    <div className="p-lg border-b border-outline-variant/10 flex justify-between items-center">
                        <div>
                            <h4 className="font-headline-md text-on-surface">Payment History</h4>
                            <p className="text-on-surface-variant text-sm">Recent transactions</p>
                        </div>
                        <button className="text-primary text-sm font-bold hover:underline">View All</button>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-md space-y-md">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="p-md bg-surface-container-low rounded-xl border border-outline-variant/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-md">
                                    <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                                        <Icon name="receipt_long" size={20} />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-bold text-on-surface">Rent Payment</h5>
                                        <p className="text-[10px] text-on-surface-variant">Paid on May 1st, 2026</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-on-surface">$4,250.00</div>
                                    <div className="text-[10px] font-bold text-tertiary">SUCCESS</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions & Contact */}
                <div className="space-y-lg">
                    <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 p-lg rounded-xxl space-y-md">
                        <h4 className="font-headline-md text-on-surface">Quick Actions</h4>
                        <div className="grid grid-cols-2 gap-md">
                            <button className="p-md bg-surface-container-low rounded-xl border border-outline-variant/5 hover:border-primary/20 transition-all flex flex-col items-center gap-sm text-center">
                                <Icon name="payments" className="text-primary" size={24} />
                                <span className="text-sm font-bold text-on-surface">Pay Rent</span>
                            </button>
                            <button className="p-md bg-surface-container-low rounded-xl border border-outline-variant/5 hover:border-primary/20 transition-all flex flex-col items-center gap-sm text-center">
                                <Icon name="build" className="text-secondary" size={24} />
                                <span className="text-sm font-bold text-on-surface">Request Fix</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

