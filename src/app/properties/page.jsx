import React, { Suspense } from "react"
import PropertyCard from "@/components/PropertyCard"
import Link from "next/link"
import Icon from "@/components/Icon"
import { headers } from "next/headers"
import FilterControls from "@/components/filter/FilterControls"
import { auth } from "@/lib/auth"

export default async function PropertiesPage({ searchParams }) {
    const params = await searchParams
    const currentPage = parseInt(params?.page) || 1
    const location = params?.location || ""
    const type = params?.type || ""
    const sort = params?.sort || ""

    // Build query string for backend
    const query = new URLSearchParams()
    query.set("page", currentPage)
    if (location) query.set("location", location)
    if (type) query.set("type", type)
    if (sort) query.set("sort", sort)

    let allProperties = []
    let totalPages = 1
    let total = 0

    try {
        const tokenObj = await auth.api.getToken({
            headers: await headers()
        })
        const token = tokenObj?.token
        // console.log("Auth token:", token)
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/public?${query.toString()}`, {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!res.ok) {
            console.error("API Error Status:", res.status)
            console.error("API Error Body:", await res.text())
            throw new Error(`API returned ${res.status}`)
        }

        const data = await res.json()
        // console.log("API Response:", JSON.stringify(data, null, 2))
        allProperties = data.properties
        totalPages = data.pagination.totalPages
        total = data.pagination.total
    } catch (error) {
        console.error("Error fetching properties:", error)
        return (
            <div className="h-screen flex items-center justify-center bg-[#0B1120]">
                <h1 className="text-white text-[24px] font-semibold">
                    Failed to load properties. Please try again later.
                </h1>
            </div>
        )
    }

    function getPageNumbers(current, total) {
        if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
        if (current <= 4) return [1, 2, 3, 4, 5, "...", total]
        if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total]
        return [1, "...", current - 1, current, current + 1, "...", total]
    }

    // Preserve filters in pagination links
    function buildPageUrl(page) {
        const p = new URLSearchParams()
        p.set("page", page)
        if (location) p.set("location", location)
        if (type) p.set("type", type)
        if (sort) p.set("sort", sort)
        return `/properties?${p.toString()}`
    }

    return (
        <div className="bg-[#0B1120] text-white min-h-screen text-[16px] md:pt-0 pt-20 overflow-x-hidden">
            <main className="pt-24 pb-20 px-6 max-w-[1280px] mx-auto  flex flex-wrap  lg:flex-row gap-6">
                {/* FilterControls — Sidebar + Sort Dropdown একসাথে */}
                <Suspense fallback={<div className="w-72" />}>
                    <FilterControls />
                </Suspense>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="font-bold text-[32px] text-[#ffb77e]">Luxury Estates</h2>
                            <p className="text-[#d9c2b3] text-[16px]">
                                {total} properties found
                                {location && ` in "${location}"`}
                                {type && type !== "All" && ` · ${type}`}
                            </p>
                        </div>
                    </div>

                    {/* Property Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {allProperties.map((prop) => (
                            <PropertyCard key={prop._id} {...prop} />
                        ))}
                        {allProperties.length === 0 && (
                            <p className="text-center mt-20 text-[#d9c2b3] col-span-full">
                                No properties found. Try adjusting your filters.
                            </p>
                        )}
                    </div>

                    {/* Pagination — filters preserve হবে */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-10">
                            <Link
                                href={buildPageUrl(currentPage - 1)}
                                className={`w-12 h-12 rounded-xl border border-[#534438]/20 flex items-center justify-center text-white hover:border-[#ffb77e] hover:text-[#ffb77e] transition-all ${
                                    currentPage === 1 ? "pointer-events-none opacity-30" : ""
                                }`}
                            >
                                <Icon name="chevron_left" size={24} />
                            </Link>

                            <div className="flex gap-2">
                                {getPageNumbers(currentPage, totalPages).map((p, i) =>
                                    p === "..." ? (
                                        <span
                                            key={`d${i}`}
                                            className="w-12 h-12 flex items-center justify-center text-[#d9c2b3]"
                                        >
                                            ...
                                        </span>
                                    ) : (
                                        <Link
                                            key={p}
                                            href={buildPageUrl(p)}
                                            className={`w-12 h-12 rounded-xl font-bold flex items-center justify-center transition-all ${
                                                currentPage === p
                                                    ? "bg-[#ffb77e] text-[#0B1120]"
                                                    : "border border-[#534438]/20 text-white hover:bg-[#19120d]"
                                            }`}
                                        >
                                            {p}
                                        </Link>
                                    )
                                )}
                            </div>

                            <Link
                                href={buildPageUrl(currentPage + 1)}
                                className={`w-12 h-12 rounded-xl border border-[#534438]/20 flex items-center justify-center text-white hover:border-[#ffb77e] hover:text-[#ffb77e] transition-all ${
                                    currentPage === totalPages ? "pointer-events-none opacity-30" : ""
                                }`}
                            >
                                <Icon name="chevron_right" size={24} />
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

