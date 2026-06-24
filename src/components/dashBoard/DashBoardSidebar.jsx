"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Icon from "../Icon"
import { ArrowLeft, CirclePlusFill } from "@gravity-ui/icons"

export default function DashboardSidebar({ role = "owner" }) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    // Close drawer when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const navLinks = {
        owner: [
            { name: "Dashboard", href: "/dashboard/owner", icon: "dashboard" },
            { name: "Add Property", href: "/dashboard/owner/add-property", icon: "add_circle" },
            { name: "Booking Requests", href: "/dashboard/owner/booking-requests", icon: "analytics" },
            { name: "My Properties", href: "/dashboard/owner/my-properties", icon: "home" },
            { name: "Profile", href: "/dashboard/owner/profile", icon: "person" }
        ],
        tenant: [
            // { name: "Dashboard", href: "/dashboard/tenant", icon: "dashboard" },
            { name: "My Bookings", href: "/dashboard/tenant/my-bookings", icon: "home" },
            { name: "Favorites", href: "/dashboard/tenant/favorites", icon: "favorite" },
            { name: "Profile", href: "/dashboard/tenant/profile", icon: "person" }
        ],
        admin: [
            // { name: "Dashboard", href: "/dashboard/admin", icon: "dashboard" },
            { name: "Booking Management", href: "/dashboard/admin/bookings", icon: "calendar_today" },
            { name: "Properties", href: "/dashboard/admin/properties", icon: "real_estate_agent" },
            { name: "Transactions", href: "/dashboard/admin/transactions", icon: "favorite" },
            { name: "Users", href: "/dashboard/admin/users", icon: "group" },
            { name: "Profile", href: "/dashboard/owner/profile", icon: "person" }
        ]
    }

    const links = navLinks[role] || navLinks.owner

    const navContent = (
        <div className="flex flex-col h-full bg-surface-container border-r border-outline-variant/10">
            <div className="p-lg h-16 flex items-center justify-between overflow-hidden whitespace-nowrap">
                <Link href="/" className="font-display-lg text-headline-md tracking-tight text-primary">
                    <ArrowLeft></ArrowLeft> Rentora
                </Link>
            </div>

            <nav className="px-md py-lg flex flex-col gap-1 flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`w-full px-4 h-12 rounded-xl flex items-center justify-start gap-3 transition-colors ${isActive ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant hover:bg-surface-container-high"}`}
                        >
                            <Icon
                                name={link.icon}
                                size={20}
                                className={isActive ? "text-primary" : "text-on-surface-variant"}
                            />
                            <span className="font-body-md whitespace-nowrap">{link.name}</span>
                            {link.badge && (
                                <span className="ml-auto bg-primary text-on-primary-container text-[10px] px-1.5 py-0.5 rounded-full">
                                    {link.badge}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* <div className="p-lg border-t border-outline-variant/10 bg-surface-container-low overflow-hidden whitespace-nowrap">
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
                    <Icon name="verified" className="text-primary ml-auto" size={16} />
                </div>
            </div> */}
        </div>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden w-72 shrink-0 md:block h-screen z-[60] relative sticky top-0">{navContent}</aside>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-4 left-4 z-[100] bg-surface shadow-md p-2 rounded-lg text-on-surface flex items-center gap-2 border border-outline-variant/20 hover:bg-surface-container transition-colors"
            >
                <Icon name="menu" size={20} />
                <span className="text-sm font-bold">Menu</span>
            </button>

            {/* Mobile Drawer Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Drawer Content */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-surface-container z-[120] transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 z-50 text-on-surface p-2 rounded-full hover:bg-surface-container-high transition-colors"
                >
                    <Icon name="close" size={24} />
                </button>
                <div className="p-0 h-full w-full">{navContent}</div>
            </div>
        </>
    )
}

