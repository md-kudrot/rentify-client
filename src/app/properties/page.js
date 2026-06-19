import React from "react"
// import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
// import BottomNavBar from '@/components/BottomNavBar';
import PropertyCard from "@/components/PropertyCard"
import Link from "next/link"
import { Button } from "@heroui/react"
import { ArrowLeft } from "@gravity-ui/icons"
// import Icon from "@/components/Icon"

const properties = [
    {
        id: 1,
        title: "Celestial Heights Villa",
        price: "$4,250,000",
        location: "Palm Jumeirah, Dubai",
        beds: 5,
        baths: 6,
        sqft: "8,400",
        imageSrc:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDbkn9-GpDB0Rcvyh-qH6I3p2XXsPzP8eWJAt5IdpBR1005a-EMuIMlBXe01qcxzA9C5s_4gTERfEDdhVJenh5vGhjgI3BdWGs7ssREn4X7GQaEyLKWDuCN1JzaVycnOQLJ1Iu2zSrQkzT1_XF5nzqM3ByQ4LUOy-4FhBmAQzxRknLi7oOjwb-_ch-kN-oXIKvBoEtBXet7HUEzyyrpgDZKYBHKpMrzNluGCuoP81JCkfCYGJxuvGWDmul7uzVeBwfzR0CRm3hnu5E",
        badge: "FEATURED"
    },
    {
        id: 2,
        title: "The Copper Horizon",
        price: "$2,800,000",
        location: "Downtown Miami, FL",
        beds: 3,
        baths: 3.5,
        sqft: "3,200",
        imageSrc:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA2MSu2UE7FTNvDSkPqh7mEEsSzYaWu7aQKo0J4SfSVXttdExqqhm-5YO8axGOjW271fO-uQ581fs6w7kGDbUVoxxvZADucpwWMSmoLXdMnJKt0nFc5p8PVMKoNm1t4QWsWveDczVePpQW6VhLGq2DEW431-UMSs1yvxyuoH8qyiJTDEhVuXqmFcSSOsgtkHfyqB-pMrQep9X-QE5BwC75vdykyrieEJBNL02Zl6dEnLEalDPwOIjmV0uJZXn8qO9ZTbyhSZ8LAQjY",
        badge: "Rare Find"
    },
    {
        id: 3,
        title: "Obsidian Retreat",
        price: "$1,950,000",
        location: "Aspen, Colorado",
        beds: 4,
        baths: 4,
        sqft: "5,100",
        imageSrc:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDoXs-aPmcHker3Hw93J_dyah6dOkHLrFHM0_MuerxVAhcY2Xa7TEKc2FazSSM5MTnPWpyRbT-oKtG24oh1M19aCsnMV2QMR_EqCSdxSBdzaZK2l2MnzZkdplVMMiFoVvCgYNUi6p-_Wf0R5tEfASQbCFUw3MaZzHi2HPYvyviTY_APiSnf94vuv9fu3ad56SMUdQUfBdv7JGteK4oDM_VAYfDv8z-GwZRsZVxAjU3ijmdg__ffYdrXzIK4HlLlg9p6PD_c7tr0nEk",
        badge: null
    },
    {
        id: 4,
        title: "Azure Cove Mansion",
        price: "$8,900,000",
        location: "Monaco Coastline",
        beds: 7,
        baths: 9,
        sqft: "12,000",
        imageSrc:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAbhzf0UwmlJTdOGkdlDJM__JiqiXZKoKNnKI4iQ0BtI3dyBy_s8QUExvWfMuLoBHIVf3NIVLrSoc65EKPsbRK6lJCZbUdkThRH6t8zw5ZXFxjMSPhysGJuafHAlPWK-V5ysj2DzK-6WoAAhRf9DEe8i87W8dwhm_-eV-5j7fD1siBk6B8U_lTHJZpInZ0sMxCVDTxNrd8wPu7c2LRmjGCDWBIH6XjnpkrAxbgd6AaRrJziyCAlwuQjli0IFG_EpK6Ah_qfL8QXqzw",
        badge: null
    },
    {
        id: 5,
        title: "Mayfair Loft Suite",
        price: "$3,400,000",
        location: "London, UK",
        beds: 2,
        baths: 2.5,
        sqft: "2,100",
        imageSrc:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBkpHXhdYCbaqNDPJqKlZJSRj_NQGQEgm9Ht0l14vokoQIkxQcx6e7iePuBI6xi2dRaO4ur4GfhPhePLRY3ZNv-jCaTeef5wGD91idy_J3YU50rYrjyPfPLfWRaIuyAIDCRezSuHm52cWtXjp5gaduPspLcvGKXIfGxglrAKcJVHppZK92ukjCLZIVByRZ1BniFKiBkRa7CtMLI8nwAHpPG-HjK6LSwKQMi0R9hqgiCtwPCfX2I-sfj1FDM4LmUiPOeXEvewopiRbg",
        badge: null
    },
    {
        id: 6,
        title: "Saffron Ridge Estate",
        price: "$5,600,000",
        location: "Scottsdale, AZ",
        beds: 6,
        baths: 7,
        sqft: "9,800",
        imageSrc:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA83VVVzzUrlEhSSxzds81wLdwltaFGEEBIgvvXjaeizXHLRdjmZfh0M5Gpq61lfRoVhhbByJtMN6mm1Wzjs0fFotinejIo3pvB-jn9_s4iWNK3arDmvfzgXs9HbnTXRQADUU7EO3R3OwbBv9hcftPAVSTNLaccDbdCyYjU0yjPf7mxXBFD7rwy_qRDIN6Mq8779BaIcnGsy4ZmvQd14f5d7JixPJkTeqRDcErJaVQL1aNDgyoJ2PhW1B_S0XzXCdK3A23t3tufPPE",
        badge: null
    }
]

export default function PropertiesPage() {
    return (
        <div className="bg-[#0B1120] text-white min-h-screen text-[16px] md:pt-0 pt-20 overflow-x-hidden">
            {/* <Navbar /> */}

            <main className="pt-24 pb-20 px-6 max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-6">
                {/* Sidebar Filters (Desktop) */}
                <aside className="hidden lg:block w-72 shrink-0">
                    <div className="sticky top-24 space-y-6">
                        <div className="flex flex-col  gap-2 text-[#ffb77e] mb-4">
                            {/* back */}
                            <Button
                                className="text-[#ffb77e] hover:underline bg-transparent border-none px-0"
                                variant="text"
                            >
                                <Link href="/" className="text-[#ffb77e] flex items-center gap-2 hover:underline">
                                    <ArrowLeft></ArrowLeft> Back
                                </Link>
                            </Button>

                            {/* <Icon name="tune" size={24} className="text-[#ffb77e]" /> */}
                            <h2 className="font-bold text-[24px]">Filters</h2>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="font-semibold text-[#d9c2b3] uppercase tracking-widest text-[10px]">
                                Location
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full bg-[#130d08] border border-[#534438]/20 rounded-xl px-4 py-2 focus:border-[#ffb77e] outline-none text-[16px] transition-all text-white placeholder:text-[#d9c2b3]/50"
                                    placeholder="Dubai, UAE"
                                    type="text"
                                />
                                {/* <Icon
                                    name="location_on"
                                    size={20}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d9c2b3]/50"
                                /> */}
                            </div>
                        </div>

                        {/* Property Type */}
                        <div className="space-y-2">
                            <label className="font-semibold text-[#d9c2b3] uppercase tracking-widest text-[10px]">
                                Property Type
                            </label>
                            <div className="flex flex-wrap gap-1">
                                <button className="px-4 py-1 rounded-full bg-[#cd7e39] text-white font-semibold text-[14px]">
                                    All
                                </button>
                                <button className="px-4 py-1 rounded-full bg-[#19120d] border border-[#534438]/20 text-[#d9c2b3] font-semibold text-[14px] hover:border-[#ffb77e]/40 transition-all">
                                    Villa
                                </button>
                                <button className="px-4 py-1 rounded-full bg-[#19120d] border border-[#534438]/20 text-[#d9c2b3] font-semibold text-[14px] hover:border-[#ffb77e]/40 transition-all">
                                    Penthouse
                                </button>
                                <button className="px-4 py-1 rounded-full bg-[#19120d] border border-[#534438]/20 text-[#d9c2b3] font-semibold text-[14px] hover:border-[#ffb77e]/40 transition-all">
                                    Mansion
                                </button>
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="font-semibold text-[#d9c2b3] uppercase tracking-widest text-[10px]">
                                    Price Range
                                </label>
                                <span className="text-[#ffb77e] font-semibold text-[14px]">$1.2M - $5M+</span>
                            </div>
                            <input
                                className="w-full h-1.5 bg-[#19120d] rounded-full appearance-none cursor-pointer accent-[#ffb77e]"
                                type="range"
                            />
                            <div className="flex justify-between text-[10px] text-[#d9c2b3]/60">
                                <span>$500k</span>
                                <span>$10M</span>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-2 pt-4 border-t border-[#534438]/10">
                            <label className="font-semibold text-[#d9c2b3] uppercase tracking-widest text-[10px]">
                                Amenities
                            </label>
                            <div className="space-y-1">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-[#534438]/30 flex items-center justify-center group-hover:border-[#ffb77e] transition-all"></div>
                                    <span className="text-[16px] text-[#d9c2b3]">Private Infinity Pool</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    {/* <div className="w-5 h-5 rounded border border-[#534438]/30 flex items-center justify-center group-hover:border-[#ffb77e] transition-all">
                                        <Icon name="check" size={14} className="text-[#ffb77e]" />
                                    </div>
                                    <span className="text-[16px] text-white">Home Theater</span> */}
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-[#534438]/30 flex items-center justify-center group-hover:border-[#ffb77e] transition-all"></div>
                                    <span className="text-[16px] text-[#d9c2b3]">Smart Home Integration</span>
                                </label>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-gray-700 cursor-pointer copper-gradient text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all mt-10">
                            Apply Search
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {/* Mobile Filters Toggle & Sorting */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="font-bold text-[32px] text-[#ffb77e]">Luxury Estates</h2>
                            <p className="text-[#d9c2b3] text-[16px]">
                                248 exclusive properties matching your criteria
                            </p>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <button className="lg:hidden flex-1 flex items-center justify-center gap-2 bg-[#211a15] border border-[#534438]/30 px-4 py-2 rounded-xl text-white">
                                {/* <Icon name="tune" size={20} /> */}
                                <span>Filters</span>
                            </button>
                            <div className="relative flex-1 md:w-48">
                                <select className="w-full bg-[#211a15] border border-[#534438]/30 px-4 py-2 rounded-xl text-white appearance-none focus:border-[#ffb77e] outline-none">
                                    <option>Sort by: Newest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Most Popular</option>
                                </select>
                                {/* <Icon
                                    name="expand_more"
                                    size={20}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#d9c2b3]"
                                /> */}
                            </div>
                        </div>
                    </div>

                    {/* Grid of Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {properties.map((prop) => (
                            <PropertyCard key={prop.id} {...prop} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 pt-10">
                        <button className="w-12 h-12 rounded-xl border border-[#534438]/20 flex items-center justify-center text-white hover:border-[#ffb77e] hover:text-[#ffb77e] transition-all">
                            {/* <Icon name="chevron_left" size={24} /> */}
                        </button>
                        <div className="flex gap-2">
                            <button className="w-12 h-12 rounded-xl bg-[#ffb77e] text-[#0B1120] font-bold flex items-center justify-center">
                                1
                            </button>
                            <button className="w-12 h-12 rounded-xl border border-[#534438]/20 text-white hover:bg-[#19120d] transition-all flex items-center justify-center font-bold">
                                2
                            </button>
                            <button className="w-12 h-12 rounded-xl border border-[#534438]/20 text-white hover:bg-[#19120d] transition-all flex items-center justify-center font-bold">
                                3
                            </button>
                            <span className="w-12 h-12 flex items-center justify-center text-[#d9c2b3]">...</span>
                            <button className="w-12 h-12 rounded-xl border border-[#534438]/20 text-white hover:bg-[#19120d] transition-all flex items-center justify-center font-bold">
                                12
                            </button>
                        </div>
                        <button className="w-12 h-12 rounded-xl border border-[#534438]/20 flex items-center justify-center text-white hover:border-[#ffb77e] hover:text-[#ffb77e] transition-all">
                            {/* <Icon name="chevron_right" size={24} /> */}
                        </button>
                    </div>
                </div>
            </main>

            {/* <Footer /> */}
            {/* <BottomNavBar /> */}
        </div>
    )
}

