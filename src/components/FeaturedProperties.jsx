import React from "react"
import { ArrowRight } from "@gravity-ui/icons"
import PropertyCard from "./PropertyCard"

export default function FeaturedProperties() {
    const properties = [
        {
            id: 1,
            title: "The Azure Penthouse",
            price: "$12,500",
            location: "Dubai Marina, AE",
            beds: 4,
            baths: 5,
            sqft: "3,400",
            imageSrc:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCTk3jAhx8ptARqpDWNL5_YTGOY3zYkLfLdoLt5U9GDyIY9tGxl9oNYRxh6lxG28CycjirbORGkxx8yLzNl2BXcs-ZUT5NSkJLk_sRVHkBVtJytZR3IY66xvtT_jX3e9dBDQGjdF0ZmMuAYfEq58sBOhAnGUawUFdhvjoh9cxsTF5Ro_pmNXE7rVM8QKohwbrtnEu1iHUrekEwplfG0Mfs6Byq-zgU8cuty4i7Pz3lDyUksAZIUp-yKMSOTH_EiEii6OOYwfGvs9rU",
            badge: "FEATURED"
        },
        {
            id: 2,
            title: "Zenith Heights Villa",
            price: "$18,200",
            location: "Los Angeles, USA",
            beds: 6,
            baths: 7,
            sqft: "5,200",
            imageSrc:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAWeQBbn5wMl7dBjK5fy6H4gs5Xy12sK7vkySjPwvi0Ykkp2dRnBVICLcm1PwN_aRl3a7SiV0n4mA03gtl_ztr4f5QMZjuLpJV-tpk2GxbB7_N4ym0Ao2X55HAWWlhae1W70IJop08W72ZErpOYAa28EK1ZOoOkHO9h3OURm4AgvnX2OpC2pCmL1waY_zxyAribYKHOWNwWUrp3kktuaGkH6_KzvFJNivrmBFrKrh6N3AZUm1hTm6Fyj3CL8fiWOqtvT7bCJSWJuHE",
            badge: "AVAILABLE"
        },
        {
            id: 3,
            title: "Skyline Glass Loft",
            price: "$9,800",
            location: "London, UK",
            beds: 2,
            baths: 2,
            sqft: "1,850",
            imageSrc:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBPEltKz8V6seY2d-T-O75OQK4kQ6g5VeUwaRNA9dDaeea1iMOUoX3CqvRMlH6snGIZjVvZCIWeUI143jIYSS12-W-MmVLB32CYcDk-oxIbQtZ6QDX6bk50HtyC8OFa6XTx2YtgUfhjWXbe9-U68_NVN79X8XzCY0fD7s6NvThnpVfxPxJVU0Icn2IRc58cWpGpCpKHufkr895IlL2DZwyD6C7ez9uSb6PEikNagB2LnVNni5KEUYDhjn67RqbzdwRK0D8TyJ9Ce7o",
            badge: null
        },
        {
            id: 4,
            title: "Marbella Cove Estate",
            price: "$22,000",
            location: "Costa del Sol, ES",
            beds: 8,
            baths: 9,
            sqft: "7,800",
            imageSrc:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDhs_so_Qa5rhnjK8zKzFPFCPSKIUn767nGFC1REN8axEGL2mV9nuc4umnNdAIm2hwKAuZ_4pgJUsiUk5oczKlKVW2H4I5hpNjrPvhhG2XNPTpTPAXAMwhRpuLZZNdRV6a8hP7DP__v8V1jt44swUWegm2eAiU1wF0wGO5_iaANzJTylM5hOuCeUC3ovh_wofrvznM-mVlJQxZtuQC0e7EvjXo_QDH4xAdUmHaKvu7_VrKUg2X5h6paz9iVNqvOWSt4LBGA8LcWrzY",
            badge: null
        },
        {
            id: 5,
            title: "Shibuya High-Tech Suites",
            price: "$7,200",
            location: "Tokyo, JP",
            beds: 1,
            baths: 1,
            sqft: "950",
            imageSrc:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCwV_ACZx_JjeRVyCtMrUZSte3f5FREt5SFqoGzDQAv8Ih7F1x_3g1Qze9Ai5DQtdsYmz4HMQI6vahjfiNV-93cxhMiv1NTHkx0aVc7NyrIhgTMJ48ERdfNQ_nbvar9r0WXDStxHXsGG6j7YgTn9WASCEphESgM9_1PmnzOIvsbaf1O_SeRIX1shgfhBs1TtjetXasYL-6oaUL8PYdbeEkYvaYLkT_TKAA9aHVfQcX_EaAadDTttPpe0DJlVLiKayi_O9LE5me0n_c",
            badge: null
        },
        {
            id: 6,
            title: "Champs-Élysées Classic",
            price: "$14,000",
            location: "Paris, FR",
            beds: 3,
            baths: 3,
            sqft: "2,100",
            imageSrc:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCzDT8qj70sSxWgS1QOjkpbUP-T5pL_c8b31OsR6-neVOLUp1KJX6sNmPAkYlbY3_RujqbqfgNBPjrPd1fIVqa47YIN64yx9rd7_uyEDru7XWDAvRpuS1Qgrll1T__tuZtDZDxH37w7n9yIpUGFtHgncZrqN8d65AZQokIvGdDt-28X8i3fqtBnzBDiVIRj-Ge5h8NnHmtc9JZ_L3oPr3w5jH15khBMNB7oc0YaRwZUafNffg5OVr4HzLha3tWRk0d-xK2V0dbKj1A",
            badge: null
        }
    ]

    return (
        <section className="py-20 max-w-[1280px] mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <p className="text-[#ffb77e] text-[14px] font-medium tracking-[0.05em] tracking-widest uppercase mb-2">
                        Exclusive Listings
                    </p>
                    <h3 className="text-[32px] font-semibold leading-[1.3] text-white">Featured Properties</h3>
                </div>
                <a className="text-[#ffb77e] hover:underline text-[14px] font-medium flex items-center gap-1" href="#">
                    View all
                    <ArrowRight width={14} height={14} />
                </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                ))}
            </div>
        </section>
    )
}

