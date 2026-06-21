"use client"

import React, { useState } from "react"
import Icon from "../Icon"

export default function AboutSection() {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <section className="space-y-4">
            <h3 className="text-[32px] font-semibold leading-[1.3] text-white">About this estate</h3>
            <div className="text-[18px] leading-[1.6] text-[#d9c2b3] space-y-4 transition-all duration-500">
                <p>
                    Experience unparalleled luxury at The Copper Meridian, an architectural masterpiece nestled in the
                    heart of Beverly Hills. This estate blends brutalist concrete textures with the warmth of aged
                    copper accents and expansive glass walls. Designed for the ultimate entertainer, the villa features
                    an open-concept living area that flows seamlessly into a zero-edge infinity pool.
                </p>
                {isExpanded && (
                    <p className="animate-fade-in">
                        Boasting automated sliding glass portals, the indoor lounge morphs effortlessly into the outer
                        deck oasis. A professional-grade culinary wing, equipped with premium copper fixtures, offers
                        catering capacity, while the state-of-the-art cinema vault provides a private theater
                        experience. Every single bedroom offers private terraces with unobstructed sunset views of the
                        canyon.
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

