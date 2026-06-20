"use client"

import DashboardSidebar from "@/../src/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/../src/components/dashboard/DashboardHeader"

export default function DashboardLayout({ children, role = "tenant" }) {
    return (
        <div className="h-screen w-full relative flex flex-col md:flex-row bg-background font-body-md overflow-x-hidden">
            <div className=" h-full md:h-auto">
                <DashboardSidebar role={role} />
            </div>

            <main className="flex-1 ml-0 p-4 lg:p-lg overflow-y-auto min-h-screen relative pt-20 md:pt-4">
                {/* We add extra top padding on mobile (pt-20) to account for the fixed menu button */}
                <DashboardHeader role={role} />

                <div className="max-w-container-max mx-auto space-y-xl mt-4">{children}</div>
            </main>
        </div>
    )
}
