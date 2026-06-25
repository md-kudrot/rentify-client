"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import Icon from "@/components/Icon"
import { Button } from "@heroui/react"
import Link from "next/link"
import { ArrowLeft } from "@gravity-ui/icons"

const PROPERTY_TYPES = ["All", "Villa", "Penthouse", "Mansion", "Apartment", "Studio"]

export default function FilterControls() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [location, setLocation] = useState(searchParams.get("location") || "")
    const [type, setType] = useState(searchParams.get("type") || "All")
    const [sort, setSort] = useState(searchParams.get("sort") || "newest")

    const applyFilters = () => {
        const params = new URLSearchParams()
        params.set("page", "1") // filter change হলে page 1 এ যাবে
        if (location.trim()) params.set("location", location.trim())
        if (type && type !== "All") params.set("type", type)
        if (sort && sort !== "newest") params.set("sort", sort)

        router.push(`/properties?${params.toString()}`)
    }

    const handleSortChange = (e) => {
        const newSort = e.target.value
        setSort(newSort)

        // Sort immediately apply হবে (filter button ছাড়াই)
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", "1")
        if (newSort === "newest") {
            params.delete("sort")
        } else {
            params.set("sort", newSort)
        }
        router.push(`/properties?${params.toString()}`)
    }

    return (
        <div className="">
            {/* ── SIDEBAR (Desktop) ── */}
            <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-24 space-y-6">
                    <div className="flex flex-col gap-2 text-[#ffb77e] mb-4">
                        <Button
                            className="text-[#ffb77e] hover:underline bg-transparent border-none px-0"
                            variant="text"
                        >
                            <Link href="/" className="text-[#ffb77e] flex items-center gap-2 hover:underline">
                                <ArrowLeft /> Back
                            </Link>
                        </Button>
                        <Icon name="tune" size={24} className="text-[#ffb77e]" />
                        <h2 className="font-bold text-[24px]">Filters</h2>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <label className="font-semibold text-[#d9c2b3] uppercase tracking-widest text-[10px]">
                            Location
                        </label>
                        <div className="relative">
                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                                className="w-full bg-[#130d08] border border-[#534438]/20 rounded-xl px-4 py-2 focus:border-[#ffb77e] outline-none text-[16px] transition-all text-white placeholder:text-[#d9c2b3]/50"
                                placeholder="e.g. Dhaka, Dubai"
                                type="text"
                            />
                            <Icon
                                name="location_on"
                                size={20}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d9c2b3]/50"
                            />
                        </div>
                    </div>

                    {/* Property Type */}
                    <div className="space-y-2">
                        <label className="font-semibold text-[#d9c2b3] uppercase tracking-widest text-[10px]">
                            Property Type
                        </label>
                        <div className="flex flex-wrap gap-1">
                            {PROPERTY_TYPES.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`px-4 py-1 rounded-full font-semibold text-[14px] transition-all ${
                                        type === t
                                            ? "bg-[#cd7e39] text-white"
                                            : "bg-[#19120d] border border-[#534438]/20 text-[#d9c2b3] hover:border-[#ffb77e]/40"
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* ── MOBILE FILTER BUTTON + SORT (Top bar, exported separately) ── */}
                    <div id="sort-and-mobile-filter" className="flex items-center gap-2 w-full md:w-auto">
                        <button className="lg:hidden flex-1 flex items-center justify-center gap-2 bg-[#211a15] border border-[#534438]/30 px-4 py-2 rounded-xl text-white">
                            <Icon name="tune" size={20} />
                            <span>Filters</span>
                        </button>
                        <div className="relative flex-1 md:w-48">
                            <select
                                value={sort}
                                onChange={handleSortChange}
                                className="w-full bg-[#211a15] border border-[#534438]/30 px-4 py-2 rounded-xl text-white appearance-none focus:border-[#ffb77e] outline-none"
                            >
                                <option value="newest">Sort by: Newest</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                            <Icon
                                name="expand_more"
                                size={20}
                                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#d9c2b3]"
                            />
                        </div>
                    </div>
                    <button
                        onClick={applyFilters}
                        className="w-full py-4 copper-gradient bg-[#ffb77e] text-[#0B1120] cursor-pointer font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all mt-10"
                    >
                        Apply Filters
                    </button>
                </div>
            </aside>

            {/* ── SORT DROPDOWN (passed as data-attr for parent to use) ── */}
            {/* Sort is rendered in the top bar — see PropertiesPage */}
            <div className="hidden" data-sort={sort} />
        </div>
    )
}
