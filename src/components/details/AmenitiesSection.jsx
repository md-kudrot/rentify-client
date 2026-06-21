import React from "react"
import Icon from "../Icon"

export default function AmenitiesSection({ property }) {
    const amenities = property?.premiumAmenities || [
        "Infinity Pool",
        "Private Cinema",
        "Gourmet Kitchen",
        "Smart Home System",
        "Fitness Center",
        "Outdoor Lounge"
    ]

    return (
        <section className="space-y-4">
            <h3 className="text-[32px] font-semibold leading-[1.3] text-white">Premium Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-4 p-4 bg-[#211a15] border border-[#534438]/10 rounded-xl"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#ffb77e]/10 flex items-center justify-center text-[#ffb77e]">
                            <Icon name={item.icon} size={20} />
                        </div>
                        <span className="text-[16px] text-white">{item}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

