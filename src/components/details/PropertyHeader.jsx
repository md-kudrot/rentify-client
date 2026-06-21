"use client"

import React, { useState } from "react"
import Icon from "../Icon"

export default function PropertyHeader({ property }) {
    const [isFavorited, setIsFavorited] = useState(false)
    const [animateHeart, setAnimateHeart] = useState(false)

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited)
        if (!isFavorited) {
            setAnimateHeart(true)
            setTimeout(() => setAnimateHeart(false), 400)
        }
    }

    //       {
    //     "title": "Celestial Heights Villa",
    //     "price": 4250000,
    //     "location": "Palm Jumeirah, Dubai",
    //     "beds": 5,
    //     "baths": 6,
    //     "sqft": 8400,
    //     "imageSrc": "https://lh3.googleusercontent.com/aida-public/AB6AXuDbkn9-GpDB0Rcvyh-qH6I3p2XXsPzP8eWJAt5IdpBR1005a-EMuIMlBXe01qcxzA9C5s_4gTERfEDdhVJenh5vGhjgI3BdWGs7ssREn4X7GQaEyLKWDuCN1JzaVycnOQLJ1Iu2zSrQkzT1_XF5nzqM3ByQ4LUOy-4FhBmAQzxRknLi7oOjwb-_ch-kN-oXIKvBoEtBXet7HUEzyyrpgDZKYBHKpMrzNluGCuoP81JCkfCYGJxuvGWDmul7uzVeBwfzR0CRm3hnu5E",
    //     "badge": "FEATURED",
    //     "listingType": "sale",
    //     "shortAbout": "A breathtaking waterfront villa offering panoramic ocean views, private beach access, and world-class architecture on the iconic Palm Jumeirah.",
    //     "description": "Celestial Heights Villa redefines luxury waterfront living. Spread across 8,400 sqft, this five-bedroom masterpiece blends contemporary design with timeless elegance. Floor-to-ceiling windows frame uninterrupted views of the Arabian Gulf, while the private beach and infinity pool create a resort-like retreat just steps from your door. Every detail, from imported Italian marble to bespoke joinery, has been curated for discerning homeowners.",
    //     "images": [
    //       "https://lh3.googleusercontent.com/aida-public/AB6AXuDbkn9-GpDB0Rcvyh-qH6I3p2XXsPzP8eWJAt5IdpBR1005a-EMuIMlBXe01qcxzA9C5s_4gTERfEDdhVJenh5vGhjgI3BdWGs7ssREn4X7GQaEyLKWDuCN1JzaVycnOQLJ1Iu2zSrQkzT1_XF5nzqM3ByQ4LUOy-4FhBmAQzxRknLi7oOjwb-_ch-kN-oXIKvBoEtBXet7HUEzyyrpgDZKYBHKpMrzNluGCuoP81JCkfCYGJxuvGWDmul7uzVeBwfzR0CRm3hnu5E"
    //     ],
    //     "premiumAmenities": [
    //       "Private Beach Access",
    //       "Infinity Pool",
    //       "Smart Home Automation",
    //       "Home Theater",
    //       "Wine Cellar",
    //       "24/7 Concierge Service",
    //       "Rooftop Terrace",
    //       "Underground Parking (4 cars)"
    //     ],
    //     "yearBuilt": 2022,
    //     "propertyType": "Villa",
    //     "furnishing": "Fully Furnished",
    //     "host": {
    //       "name": "Ahmed Al-Rashid",
    //       "email": "ahmed.rashid@rentify.com",
    //       "phone": "+971-50-123-4567",
    //       "avatar": "https://i.pravatar.cc/150?img=11",
    //       "isVerified": true,
    //       "responseTime": "Within 1 hour",
    //       "memberSince": "2021"
    //     },
    //     "reviews": {
    //       "averageRating": 4.9,
    //       "totalReviews": 24
    //     },
    //     "status": "available"
    //   },

    return (
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-1 bg-[#ffb77e]/10 border border-[#ffb77e]/20 rounded-lg text-[#ffb77e] text-[12px] font-bold uppercase tracking-wider">
                        {property?.badge || "FEATURED"}
                    </span>
                    <div className="flex items-center gap-1 text-[#ffb77e]">
                        <Icon name="star_filled" size={16} />
                        <span className="font-bold text-[14px]">{property?.reviews.averageRating || "4.98"}</span>
                        <span className="text-[#d9c2b3] font-normal text-[14px] ml-1">
                            ({property?.reviews.totalReviews || 124} reviews)
                        </span>
                    </div>
                </div>
                <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.2] md:leading-[1.1] tracking-[-0.01em] md:tracking-[-0.02em] text-white mb-1">
                    {property?.title || "Celestial Heights Villa"}
                </h2>
                <div className="flex items-center gap-1 text-[#d9c2b3]">
                    <Icon name="location_on" size={20} className="text-[#ffb77e]" />
                    <span className="text-[16px]">{property?.location}</span>
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

