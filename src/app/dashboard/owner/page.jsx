"use client"

import { useEffect, useState } from "react"
import { authClient, useSession } from "@/lib/auth-client"
import SummaryCards from "@/components/dashboard/SummaryCards"
import RevenueChart from "@/components/dashboard/RevenueChart"

export default function OwnerDashboard() {
    const { data: session } = useSession()
    const user = session?.user

    const [analytics, setAnalytics] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user?.email) return

        const fetchAnalytics = async () => {
            try {
                const { data: tokenData } = await authClient.token()

                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/analytics/owner/${user.email}`, {
                    headers: { Authorization: `Bearer ${tokenData?.token}` }
                })
                const data = await res.json()
                setAnalytics(data)
            } catch (err) {
                console.error("Analytics fetch failed:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchAnalytics()
    }, [user?.email])

    if (loading) return <AnalyticsSkeleton />

    const summaryCards = [
        {
            id: 1,
            title: "Total Earnings",
            value: `$${(analytics?.totalEarnings || 0).toLocaleString("en-US", {
                minimumFractionDigits: 2
            })}`,
            icon: "payments",
            trend: "From approved bookings",
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
            title: "Total Properties",
            value: String(analytics?.totalProperties || 0),
            icon: "domain",
            trend: "Listed properties",
            colorClass: {
                glow: "bg-secondary/10 group-hover:bg-secondary/20",
                iconBg: "bg-secondary/10",
                iconText: "text-secondary",
                trendText: "text-on-surface-variant"
            }
        },
        {
            id: 3,
            title: "Total Bookings",
            value: String(analytics?.totalBookings || 0),
            icon: "event_available",
            trend: "Confirmed bookings",
            trendIcon: "trending_up",
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

            <section className="mt-6">
                <RevenueChart
                    data={analytics?.monthlyEarnings || []}
                    title="Monthly Earnings"
                    subtitle="Last 12 months earnings from approved bookings"
                    colorTheme="copper"
                />
            </section>
        </>
    )
}

function AnalyticsSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-slate-800/80 rounded-2xl" />
                ))}
            </div>
            {/* Chart */}
            <div className="h-[400px] bg-slate-800/80 rounded-2xl" />
        </div>
    )
}

