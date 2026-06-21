"use client"

import React, { useState } from "react"
import Icon from "../Icon"

export default function PropertyHeader() {
    const [isFavorited, setIsFavorited] = useState(false)
    const [animateHeart, setAnimateHeart] = useState(false)

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited)
        if (!isFavorited) {
            setAnimateHeart(true)
            setTimeout(() => setAnimateHeart(false), 400)
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-1 bg-[#ffb77e]/10 border border-[#ffb77e]/20 rounded-lg text-[#ffb77e] text-[12px] font-bold uppercase tracking-wider">
                        Premium Estate
                    </span>
                    <div className="flex items-center gap-1 text-[#ffb77e]">
                        <Icon name="star_filled" size={16} />
                        <span className="font-bold text-[14px]">4.98</span>
                        <span className="text-[#d9c2b3] font-normal text-[14px] ml-1">(124 reviews)</span>
                    </div>
                </div>
                <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.2] md:leading-[1.1] tracking-[-0.01em] md:tracking-[-0.02em] text-white mb-1">
                    The Copper Meridian Villa
                </h2>
                <div className="flex items-center gap-1 text-[#d9c2b3]">
                    <Icon name="location_on" size={20} className="text-[#ffb77e]" />
                    <span className="text-[16px]">Beverly Hills, California</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleFavorite}
                    className="w-12 h-12 rounded-full border border-[#534438]/30 flex items-center justify-center text-[#ffb77e] hover:bg-[#ffb77e]/5 transition-all group active:scale-90 relative"
                >
                    <Icon
                        name={isFavorited ? "favorite_filled" : "favorite"}
                        size={20}
                        className={`group-hover:scale-110 transition-transform ${animateHeart ? "animate-ping" : ""}`}
                    />
                </button>
                <button className="w-12 h-12 rounded-full border border-[#534438]/30 flex items-center justify-center text-[#d9c2b3] hover:text-[#ffb77e] transition-all active:scale-90">
                    <Icon name="ios_share" size={20} />
                </button>
            </div>
        </div>
    )
}

