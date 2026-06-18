import React from "react"
// import Icon from '../Icon';

export default function FeaturesRibbon() {
    const features = [
        { label: "Bedrooms", value: "6", icon: "king_bed" },
        { label: "Bathrooms", value: "4.5", icon: "bathtub" },
        { label: "Sq Ft", value: "8,400", icon: "square_foot" },
        { label: "Parking", value: "4", icon: "directions_car" }
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-[#534438]/10 py-10">
            {features.map((feat, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 bg-[#211a15] rounded-xl text-center">
                    <span className="text-[#ffb77e] mb-1">{/* <Icon name={feat.icon} size={24} /> */}</span>
                    <span className="text-[24px] font-semibold leading-[1.4] text-white">{feat.value}</span>
                    <span className="text-[14px] font-medium tracking-[0.05em] text-[#d9c2b3]">{feat.label}</span>
                </div>
            ))}
        </div>
    )
}

