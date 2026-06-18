"use client"

import React, { useState } from "react"
// import Icon from '../Icon';

export default function BookingCard() {
    const [guests, setGuests] = useState(2)
    const [isReserved, setIsReserved] = useState(false)

    const pricePerNight = 1250
    const nightsCount = 4
    const serviceFee = 240
    const cleaningFee = 150
    const total = pricePerNight * nightsCount + serviceFee + cleaningFee

    return (
        <div className="sticky top-24 glass-panel bg-gradient-to-b from-[#0B1120] to-[#1a202c] p-10 rounded-[24px] shadow-2xl space-y-6">
            <div className="flex justify-between items-baseline">
                <div className="flex flex-col">
                    <span className="text-[#d9c2b3] text-[14px] line-through">$1,850</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-[32px] font-bold leading-[1.3] text-[#ffb77e]">
                            ${pricePerNight.toLocaleString()}
                        </span>
                        <span className="text-[#d9c2b3] text-[16px]">/ night</span>
                    </div>
                </div>
                <div className="flex items-center gap-1 bg-[#ffb77e]/10 px-2 py-1 rounded-lg">
                    {/* <Icon name="star_filled" size={16} className="text-[#ffb77e]" /> */}
                    <span className="text-[#ffb77e] font-bold text-[14px]">4.98</span>
                </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
                <label className="text-[14px] text-[#d9c2b3] uppercase font-bold tracking-widest block">
                    Select Dates
                </label>
                <div className="grid grid-cols-2 bg-[#0B1120] border border-[#534438]/30 rounded-xl overflow-hidden divide-x divide-[#534438]/30">
                    <div className="p-4 cursor-pointer hover:bg-[#211a15] transition-colors">
                        <p className="text-[10px] text-[#ffb77e] font-extrabold uppercase">Check-in</p>
                        <p className="font-bold text-white text-sm">Feb 24, 2024</p>
                    </div>
                    <div className="p-4 cursor-pointer hover:bg-[#211a15] transition-colors">
                        <p className="text-[10px] text-[#ffb77e] font-extrabold uppercase">Check-out</p>
                        <p className="font-bold text-white text-sm">Feb 28, 2024</p>
                    </div>
                </div>
                <div className="bg-[#0B1120] border border-[#534438]/30 rounded-xl p-4 flex justify-between items-center hover:bg-[#211a15] transition-colors">
                    <div>
                        <p className="text-[10px] text-[#ffb77e] font-extrabold uppercase">Guests</p>
                        <p className="font-bold text-white text-sm">{guests} Guests</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                            className="w-6 h-6 rounded bg-[#211a15] border border-[#534438]/30 text-white flex items-center justify-center font-bold hover:border-[#ffb77e] transition-all"
                        >
                            -
                        </button>
                        <button
                            onClick={() => setGuests(guests + 1)}
                            className="w-6 h-6 rounded bg-[#211a15] border border-[#534438]/30 text-white flex items-center justify-center font-bold hover:border-[#ffb77e] transition-all"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4 border-t border-[#534438]/10 pt-4">
                <div className="flex justify-between text-[#d9c2b3] text-[16px]">
                    <span>
                        ${pricePerNight.toLocaleString()} x {nightsCount} nights
                    </span>
                    <span>${(pricePerNight * nightsCount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#d9c2b3] text-[16px]">
                    <span>Service fee</span>
                    <span>${serviceFee}</span>
                </div>
                <div className="flex justify-between text-[#d9c2b3] text-[16px]">
                    <span>Cleaning fee</span>
                    <span>${cleaningFee}</span>
                </div>
                <div className="flex justify-between text-[20px] font-semibold text-white pt-4 border-t border-[#534438]/10">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                </div>
            </div>

            <button
                onClick={() => {
                    setIsReserved(true)
                    setTimeout(() => setIsReserved(false), 2000)
                }}
                className="w-full copper-gradient bg-gradient-to-r from-[#ffb77e] to-[#ff8c42] py-4 rounded-xl text-white font-bold text-[20px] copper-glow transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
                <span>{isReserved ? "Booking Confirmed!" : "Reserve Estate"}</span>
                {/* <Icon name="bolt" size={20} /> */}
            </button>
            <p className="text-center text-[#d9c2b3]/60 text-[14px]">You won't be charged yet</p>
            <div className="flex items-center gap-2 justify-center pt-2 border-t border-[#534438]/10">
                {/* <Icon name="shield_lock" size={20} className="text-[#ffb77e]" /> */}
                <span className="text-[14px] text-[#d9c2b3]">Rentora Secure Booking Protection</span>
            </div>
        </div>
    )
}

