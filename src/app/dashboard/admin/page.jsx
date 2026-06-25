"use client"
import { authClient } from "@/lib/auth-client"

function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
}

export default function AdminDashboard() {
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user
    const role = user?.role
    if (isPending) return null

    return (
        <div className="flex flex-col gap-1">
            <p className="text-sm text-[#8a7060] tracking-widest uppercase">{getGreeting()}</p>
            <h1 className="text-4xl font-medium text-white">
                Welcome back, <span className="text-[#ffb77e]">{user?.name?.split(" ")[0] ?? role}</span>
            </h1>
            <p className="text-sm text-[#6b5a4e] mt-1">
                {new Date().toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })}
            </p>
        </div>
    )
}

