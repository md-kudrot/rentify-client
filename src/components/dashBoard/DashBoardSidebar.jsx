"use client"

import { LayoutSideContentLeft } from "@gravity-ui/icons"
import { Button, Drawer } from "@heroui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
// import Icon from "../Icon";

export default function DashboardSidebar({ role = "owner" }) {
    const pathname = usePathname()

    const navLinks = {
        owner: [
            { name: "Dashboard", href: "/dashboard/owner", icon: "dashboard" },
            { name: "Properties", href: "/dashboard/owner/properties", icon: "real_estate_agent" },
            { name: "Analytics", href: "/dashboard/owner/analytics", icon: "analytics" },
            { name: "Messages", href: "/dashboard/owner/messages", icon: "mail", badge: 12 },
            { name: "Settings", href: "/dashboard/owner/settings", icon: "settings" }
        ],
        tenant: [
            { name: "Dashboard", href: "/dashboard/tenant", icon: "dashboard" },
            { name: "My Rentals", href: "/dashboard/tenant/rentals", icon: "home" },
            { name: "Payments", href: "/dashboard/tenant/payments", icon: "payments" },
            { name: "Maintenance", href: "/dashboard/tenant/maintenance", icon: "build" },
            { name: "Settings", href: "/dashboard/tenant/settings", icon: "settings" }
        ],
        admin: [
            { name: "Dashboard", href: "/dashboard/admin", icon: "dashboard" },
            { name: "Users", href: "/dashboard/admin/users", icon: "group" },
            { name: "Properties", href: "/dashboard/admin/properties", icon: "real_estate_agent" },
            { name: "Financials", href: "/dashboard/admin/financials", icon: "account_balance" },
            { name: "Settings", href: "/dashboard/admin/settings", icon: "settings" }
        ]
    }

    const links = navLinks[role] || navLinks.owner

    const navContent = (
        <div className="flex flex-col h-full bg-surface-container border-r border-outline-variant/10">
            <div className="p-lg h-16 flex items-center justify-between overflow-hidden whitespace-nowrap">
                <span className="font-display-lg text-headline-md tracking-tight text-primary">Rentora</span>
            </div>

            <nav className="px-md py-lg flex flex-col gap-1 flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Button
                            key={link.name}
                            variant="ghost"
                            className={`justify-start w-full px-4 h-12 flex items-center justify-start gap-3 ${isActive ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant hover:bg-surface-container-high"}`}
                            as={Link}
                            href={link.href}
                        >
                            {/* <Icon name={link.icon} size={20} className={isActive ? "text-primary" : "text-on-surface-variant"} /> */}
                            <span className="font-body-md whitespace-nowrap">{link.name}</span>
                            {link.badge && (
                                <span className="ml-auto bg-primary text-on-primary-container text-[10px] px-1.5 py-0.5 rounded-full">
                                    {link.badge}
                                </span>
                            )}
                        </Button>
                    )
                })}
            </nav>

            <div className="p-lg border-t border-outline-variant/10 bg-surface-container-low overflow-hidden whitespace-nowrap">
                <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden flex-shrink-0">
                        <img
                            className="w-full h-full object-cover"
                            alt="User Avatar"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1Wh8d2SI_AXllKIdoqLHBvzUPoX-azJP9MgI6QptWE3PTeAG3KAVT2-z6psWKvea7NCG6No20x1pprNBPab3PTypX7TcScmvD4uWSb9-i2o9fPLheIIVwceypdpVQC52cBwdN-t7P2ZFeZKEfn5a_-mGBO9cGXrGTRtoU9yglPThpHikJ9PPlr-eAKHpybtAyTZ8axzCEGVVwnEoyv38PUdJok_ESL8oQXSzxX6M6_eFGoCy5m8XQPw_YxJzLHalsyEkQJ0aOxOE"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-on-surface">Alexander Hunt</span>
                        <span className="text-xs text-on-surface-variant capitalize">{role} Account</span>
                    </div>
                    {/* <Icon name="verified" className="text-primary ml-auto" size={16} /> */}
                </div>
            </div>
        </div>
    )

    return (
        <>
            <aside className="hidden w-72 shrink-0 md:block h-screen z-[60] relative sticky top-0">{navContent}</aside>
            <Drawer>
                <Drawer.Trigger asChild>
                    <Button variant="secondary" className="md:hidden fixed top-4 left-4 z-[100] bg-surface shadow-md">
                        <LayoutSideContentLeft />
                        Menu
                    </Button>
                </Drawer.Trigger>
                <Drawer.Backdrop className="z-[110]">
                    <Drawer.Content placement="left" className="z-[120]">
                        <Drawer.Dialog className="w-72 p-0 h-full bg-surface-container">
                            <Drawer.CloseTrigger className="absolute top-4 right-4 z-50 text-on-surface" />
                            <Drawer.Body className="p-0 h-full w-full">{navContent}</Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    )
}

