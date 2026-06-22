"use client"

import React, { useState, useEffect } from "react"
import Icon from "../Icon"
import { authClient } from "@/lib/auth-client"

export default function PropertyHeader({ property }) {
    const [isFavorited, setIsFavorited] = useState(property?.isFavorite || false)
    const [animateHeart, setAnimateHeart] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Initialize from property data
    useEffect(() => {
        if (property?.isFavorite !== undefined) {
            setIsFavorited(property?.isFavorite)
        }
    }, [property])

    const toggleFavorite = async () => {
        try {
            setIsLoading(true)
            const newState = !isFavorited

            // Get auth token before making the request
            const { data: tokenData } = await authClient.token()

            if (!tokenData?.token) {
                console.error("No auth token found — user not logged in")
                alert("Please log in to save favorites")
                return
            }

            // Call PATCH endpoint to update isFavorite in database
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${property._id}/favorite`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData.token}`
                },
                body: JSON.stringify({ isFavorite: newState })
            })

            if (!res.ok) {
                console.error("Failed to update favorite:", res.statusText)
                return
            }

            // Success - update UI
            setIsFavorited(newState)

            // Animation only on add
            if (newState) {
                setAnimateHeart(true)
                setTimeout(() => setAnimateHeart(false), 400)
            }

            console.log(`Property ${newState ? "added to" : "removed from"} favorites:`, property?.title)
        } catch (error) {
            console.error("Error toggling favorite:", error)
        } finally {
            setIsLoading(false)
        }
    }

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
                    disabled={isLoading}
                    className="w-12 h-12 rounded-full border border-[#534438]/30 flex items-center justify-center text-[#ffb77e] hover:bg-[#ffb77e]/5 transition-all group active:scale-90 relative disabled:opacity-50 disabled:cursor-not-allowed"
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

