import React from "react"
import { StarFill } from "@gravity-ui/icons"

async function getTopReviews() {
    try {
        const res = await fetch(`${process.env.Server_URL}/api/reviews/top`, { cache: "no-store" })
        const data = await res.json()
        return data.reviews || []
    } catch {
        return []
    }
}

export default async function CustomerReviews() {
    const reviews = await getTopReviews()

    if (reviews.length === 0) return null

    return (
        <section className="py-20 max-w-[1280px] mx-auto px-6">
            <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.2] md:leading-[1.1] tracking-[-0.01em] md:tracking-[-0.02em] text-white mb-10 text-center">
                What Our Customers Say
            </h2>
            <p className="text-[#d9c2b3] text-[18px] leading-[1.6] max-w-3xl mx-auto mb-16 text-center">
                Hear from our satisfied customers who have experienced the comfort and luxury of our properties. Their
                stories reflect the quality and service we strive to provide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {reviews.map((rev) => (
                    <div key={rev._id} className="glass-panel p-10 rounded-[32px] space-y-4">
                        <div className="flex text-[#ffb77e]">
                            {[...Array(5)].map((_, i) => (
                                <StarFill
                                    key={i}
                                    width={18}
                                    height={18}
                                    className={i < rev.rating ? "text-[#ffb77e]" : "text-[#534438]/40"}
                                />
                            ))}
                        </div>
                        <p className="text-[18px] leading-[1.6] italic text-[#efe0d7]">"{rev.comment}"</p>
                        <div className="flex items-center gap-4 pt-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#ffb77e]/30 bg-[#ffb77e]/20 flex items-center justify-center">
                                <span className="text-[#ffb77e] font-bold text-[18px]">
                                    {rev.userName?.charAt(0).toUpperCase() || "?"}
                                </span>
                            </div>
                            <div>
                                <p className="text-[18px] font-semibold text-white">{rev.userName}</p>
                                <p className="text-[#d9c2b3] text-sm">{rev.userEmail}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

