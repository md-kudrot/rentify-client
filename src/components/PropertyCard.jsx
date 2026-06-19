// import React from 'react';
// import Icon from './Icon';
import { LocationArrow } from "@gravity-ui/icons"
import Link from "next/link"

export default function PropertyCard({ id, title, price, location, beds, baths, sqft, imageSrc, badge }) {
    const badgeBg = badge === "FEATURED" ? "bg-[#cd7e39]" : "bg-[#139fb3]"

    return (
        <Link
            href={`/properties/${id}`}
            className="bg-[#3f465c]/20 rounded-[32px] overflow-hidden border border-[#534438]/10 group cursor-pointer copper-glow transition-all duration-500"
        >
            <div className="h-64 relative overflow-hidden">
                <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={title}
                    src={imageSrc}
                />
                {badge && (
                    <div
                        className={`absolute top-4 left-4 ${badgeBg} px-3 py-1 rounded-full text-white text-[12px] font-bold`}
                    >
                        {badge}
                    </div>
                )}
            </div>
            <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                    <h4 className="text-[20px] font-semibold text-white">{title}</h4>
                    <p className="text-[#ffb77e] font-bold text-[18px]">
                        {price}
                        <span className="text-[#d9c2b3] font-normal text-[14px]">/mo</span>
                    </p>
                </div>
                <p className="text-[#d9c2b3] text-[16px] flex items-center gap-1">
                    {/* <Icon name="location_on" size={16} className="text-[#ffb77e]" /> */}
                    <LocationArrow className="text-[#ffb77e]" size={16} />
                    {location}
                </p>
                <div className="flex gap-4 text-[#d9c2b3] border-t border-[#534438]/10 pt-4">
                    <span className="flex items-center gap-1 text-[14px] font-medium">
                        {/* <Icon name="bed" size={16} className="text-[#ffb77e]" /> */}
                        🛏 {beds} Beds
                    </span>
                    <span className="flex items-center gap-1 text-[14px] font-medium">
                        {/* <Icon name="shower" size={16} className="text-[#ffb77e]" /> */}
                        🛁 {baths} Baths
                    </span>
                    <span className="flex items-center gap-1 text-[14px] font-medium">
                        {/* <Icon name="aspect_ratio" size={16} className="text-[#ffb77e]" /> */}
                        📏 {sqft} sqft
                    </span>
                </div>
            </div>
        </Link>
    )
}

