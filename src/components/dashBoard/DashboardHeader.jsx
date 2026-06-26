'use client"'
import Link from "next/link"
import Icon from "../Icon"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"

export default function DashboardHeader({ role }) {
    const titles = {
        owner: "Owner Dashboard",
        tenant: "Tenant Dashboard",
        admin: "Admin Dashboard"
    }

    const { data: session } = authClient.useSession()
    // console.log(session);

    const user = session?.user
    console.log(user)

    return (
        <header className="h-16 sticky top-0 bg-surface/80 backdrop-blur-xl z-50 border-b border-outline-variant/10 px-lg flex items-center justify-between">
            <div className="flex items-center gap-md">
                <h1 className="font-headline-md text-on-surface hidden md:block">{titles[role] || "Dashboard"}</h1>
            </div>
            <div className="flex items-center gap-lg">
                <div className="relative hidden sm:block">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        <Icon name="search" size={18} />
                    </div>
                    <input
                        className="bg-surface-container-low border border-outline-variant/20 rounded-full pl-10 pr-4 py-2 text-sm focus:border-primary outline-none transition-all w-64"
                        placeholder="Search data..."
                        type="text"
                    />
                </div>
                <div className="flex items-center gap-md">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all">
                        <Icon name="notifications" size={24} />
                    </button>
                    <div className="w-10 h-10 rounded-full copper-gradient p-[2px]">
                        <Link
                            href="/dashboard/tenant/profile"
                            className="w-full h-full rounded-full bg-surface-container overflow-hidden"
                        >
                            <Image
                                height={40}
                                width={40}
                                className="w-full h-full object-cover"
                                alt={user?.name || "User Avatar"}
                                src={
                                    user?.image ||
                                    `https://ui-avatars.com/api/?name=${user?.name}&background=19120d&color=ffb77e`
                                }
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

