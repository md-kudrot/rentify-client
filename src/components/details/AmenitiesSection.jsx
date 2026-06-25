import React from "react"
import Icon from "../Icon"

const amenityIconMap = [
    { keywords: ["pool", "infinity"], icon: "wave-sine" },
    { keywords: ["cinema", "movie", "screen"], icon: "movie" },
    { keywords: ["kitchen", "gourmet"], icon: "chef-hat" },
    { keywords: ["smart", "home", "system"], icon: "smart-home" },
    { keywords: ["fitness", "gym", "exercise"], icon: "barbell" },
    { keywords: ["lounge", "outdoor"], icon: "armchair" },
    { keywords: ["terrace", "balcony"], icon: "building" },
    { keywords: ["view", "marina", "360"], icon: "panorama-horizontal" },
    { keywords: ["parking", "valet", "garage"], icon: "car" },
    { keywords: ["concierge", "service"], icon: "bell-ringing" },
    { keywords: ["furnished", "furniture"], icon: "sofa" }
]

function getIconForAmenity(label = "") {
    const lower = label.toLowerCase()
    const match = amenityIconMap.find(({ keywords }) => keywords.some((kw) => lower.includes(kw)))
    return match?.icon ?? "star" // fallback icon
}

const DEFAULT_AMENITIES = ["Infinity Pool"]

export default function AmenitiesSection({ property }) {
    const amenities = property?.premiumAmenities?.length ? property.premiumAmenities : DEFAULT_AMENITIES

    return (
        <section className="space-y-4">
            <h3 className="text-[32px] font-semibold leading-[1.3] text-white">Premium Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((label, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-4 p-4 bg-[#211a15] border border-[#534438]/10 rounded-xl"
                    >
                        <span className="text-[16px] text-white">{label}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

