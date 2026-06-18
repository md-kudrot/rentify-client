"use client"
import StatsCard from "@/components/dashBoard/StatasCart"
import { authClient } from "@/lib/auth-client"
import React from "react"
import { FileText, Persons, Briefcase, CircleCheck } from "@gravity-ui/icons"
import ApplicationTable from "@/components/dashBoard/ApplicationTable"

const Recruiter = () => {
    const { data: session, isPending, error } = authClient.useSession()

    if (isPending) {
        return (
            <div className="flex h-[2rem] w-full items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
            </div>
        )
    }

    // console.log(session?.user)
    const dashboardStats = [
        {
            icon: FileText,
            label: "Total Job Posts",
            value: "48"
        },
        {
            icon: Persons,
            label: "Total Applicants",
            value: "1,284"
        },
        {
            icon: Briefcase,
            label: "Active Jobs",
            value: "18"
        },
        {
            icon: CircleCheck,
            label: "Jobs Closed",
            value: "32"
        }
    ]

    return (
        <div>
            <h1 className="text-3xl mt-10 md:mt-0 font-bold mb-4">
                Welcome back, {session?.user?.name || "Recruiter"}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat) => (
                    <StatsCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} />
                ))}
            </div>
            {/* Recent Applications Table */}
            <div className="mt-8">
                <ApplicationTable></ApplicationTable>
            </div>
        </div>
    )
}

export default Recruiter
