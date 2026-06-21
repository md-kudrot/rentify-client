"use client"

import React, { useState } from "react"
import Icon from "../Icon"

export default function AboutSection({ property }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <section className="space-y-4">
            <h3 className="text-[32px] font-semibold leading-[1.3] text-white">About this estate</h3>
            <div className="text-[18px] leading-[1.6] text-[#d9c2b3] space-y-4 transition-all duration-500">
                <p>
                    {property?.shortAbout ||
                        "This estate is a masterpiece of modern architecture, seamlessly blending indoor and outdoor living spaces. The design emphasizes natural light, open floor plans, and high-end finishes throughout."}
                </p>
                {isExpanded && (
                    <p className="animate-fade-in">
                        {property?.description ||
                            "The estate features a state-of-the-art kitchen with top-of-the-line appliances, a luxurious master suite with a spa-like bathroom, and multiple guest rooms that offer comfort and privacy. The outdoor area includes a beautifully landscaped garden, a swimming pool, and ample space for entertaining guests."}
                    </p>
                )}
            </div>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 text-[#ffb77e] font-bold flex items-center gap-1.5 hover:gap-3 transition-all cursor-pointer"
            >
                <span>{isExpanded ? "Read less" : "Read more"}</span>
                <Icon name="arrow_forward" size={16} />
            </button>
        </section>
    )
}

