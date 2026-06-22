"use client"

import React, { useState } from "react"
import Icon from "../Icon"
import { authClient } from "@/lib/auth-client"

export default function BookingCard({ property }) {
    const [nights, setNights] = useState(2)

    const total = property?.price * nights

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

    // console.log(session?.user)
    const user = session?.user
    const userRole = user?.role

    return (
        <div className="sticky top-24 glass-panel bg-gradient-to-b from-[#0B1120] to-[#1a202c] p-10 rounded-[24px] shadow-2xl space-y-6">
            <div className="flex justify-between items-baseline">
                <div className="flex items-baseline gap-1">
                    <span className="text-[32px] font-bold leading-[1.3] text-[#ffb77e]">${property?.price}</span>
                    <span className="text-[#d9c2b3] text-[16px]">/ night</span>
                </div>
                <div className="flex items-center gap-1 bg-[#ffb77e]/10 px-2 py-1 rounded-lg">
                    <Icon name="star_filled" size={16} className="text-[#ffb77e]" />
                    <span className="text-[#ffb77e] font-bold text-[14px]">
                        {property?.reviews?.averageRating || "N/A"}
                    </span>
                </div>
            </div>

            {/* Nights Selector */}
            <div className="space-y-2">
                <label className="text-[14px] text-[#d9c2b3] uppercase font-bold tracking-widest block">
                    How many nights?
                </label>
                <div className="bg-[#0B1120] border border-[#534438]/30 rounded-xl p-4 flex justify-between items-center">
                    <div>
                        <p className="text-[10px] text-[#ffb77e] font-extrabold uppercase">Nights</p>
                        <p className="font-bold text-white text-sm">{nights} Nights</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setNights(Math.max(1, nights - 1))}
                            className="w-6 h-6 rounded bg-[#211a15] border border-[#534438]/30 text-white flex items-center justify-center font-bold hover:border-[#ffb77e] transition-all"
                        >
                            -
                        </button>
                        <button
                            onClick={() => setNights(nights + 1)}
                            className="w-6 h-6 rounded bg-[#211a15] border border-[#534438]/30 text-white flex items-center justify-center font-bold hover:border-[#ffb77e] transition-all"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-[#534438]/10 pt-4">
                <div className="flex justify-between text-[#d9c2b3] text-[15px]">
                    <span>
                        ${property?.price} × {nights} nights
                    </span>
                    <span>${(property?.price * nights).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[20px] font-semibold text-white pt-3 border-t border-[#534438]/10">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                </div>
            </div>

            {/* ✅ form এ hidden input দিয়ে data পাঠাচ্ছি */}
            {userRole === "tenant" ? (
                <form action="/api/subscription" method="POST">
                    <input type="hidden" name="price" value={property?.price * nights} />
                    <input type="hidden" name="nights" value={nights} />
                    <input type="hidden" name="title" value={property?.title} />
                    <input type="hidden" name="productId" value={property?._id} />
                    <input type="hidden" name="role" value={"tenant"} />

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#ffb77e] text-[#0B1120] font-bold rounded-lg hover:bg-[#ffb77e]/90 transition-colors"
                    >
                        Book Now
                    </button>
                </form>
            ) : (
                <div className="h-20 flex items-center justify-center bg-[#0B1120] rounded-lg">
                    <p className="text-[#d9c2b3] text-center">
                        Only tenants can book properties. Please sign in with a tenant account to proceed.
                    </p>
                </div>
            )}

            <p className="text-center text-[#d9c2b3]/60 text-[14px]">You won't be charged yet</p>
        </div>
    )
}

