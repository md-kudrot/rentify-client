import React from "react"
import { StarFill } from "@gravity-ui/icons"

export default function CustomerReviews() {
    const reviews = [
        {
            quote: "Rentora redefined what a luxury rental experience should be. From the initial viewing to the 24/7 concierge support, everything was flawless.",
            name: "Sarah Jenkins",
            role: "CEO, TechFlow",
            imageSrc:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBy0O-aYeIA82gzNcOz0wogKeXZLyM3HLPxJYAdpcJ71PwppJXOqg8H47qCV-G122Jl2wARKIbQBd4cmFPbYaX4JMJXo_YsGx4Stjfq9SrmIqNKU3ChyPhbDQkDD5PJDaUBM1bzUj0Ch8fh6tkBhb3cKJ49QnjODtvZoc23o5vNRmhbW0tin3zTLddOWj6_a4mSsCMzUeaD3lWj7UaXpkDT7LTcEHI_KvdmoJ0jC9mtAsG4LPkHqrYflBxg63b3Ktr2X9W9v2WLXS0"
        },
        {
            quote: "The property verification process gave me such peace of mind. The villa was exactly as pictured, if not better. Truly a world-class service.",
            name: "Marcus Sterling",
            role: "Venture Capitalist",
            imageSrc:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDEqtQhaI6M3UrMndODhzpzfCMHaHUxtrF0uCp2e1LSxctvWBd2_C0B9CdrPR2Wbm3AHatT66CvUBpMZt5peXAR09ip4_amlwHWt4NhTzCWuGMY5ENPSUuzytgLcmtyIPGe8a4ujF-3d8ajJZhEV9KRXnkeGz2KbdCpHSQu0fjrGmeuEDFZOdA2Y1n09-rLv0UVHyGFL95-Qcx991ssnQIoJfSAe-roIKDjm-QPl8Epa4IYFbqRj9wzlGX67vHEudMk326owphgoWc"
        },
        {
            quote: "Incredible attention to detail. The integration of smart home features made our stay effortless. Rentora is now my only choice for property search.",
            name: "Elena Rodriguez",
            role: "Interior Architect",
            imageSrc:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuATpVyy4zjJK2fki76ufmFudmP06g6mI9zfO67eZzbcn2XQRqEZ4U8StuuwQyF8Ij2xlV4vQ0WJUOHyrjTf8D_uEEYTI9TC1Q6MbiaX3oPuzZK4G2KL-HRlP8NhbqD22P1cOXObG2c_sSLxOQepyXegtzWvNpkVgDH-SZRj-QGSfk--yeuLOk1AAhZn-eZ-fLF-eCSjocVGHi6I8wgwkcPy6F1qfAVDZLLf7CTGBFje95bTvkw6lbWX1jqbiJEOGgaOUWuZIOxJaEY"
        }
    ]

    return (
        <section className="py-20 max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {reviews.map((rev, idx) => (
                    <div key={idx} className="glass-panel p-10 rounded-[32px] space-y-4">
                        <div className="flex text-[#ffb77e]">
                            {[...Array(5)].map((_, i) => (
                                <StarFill key={i} width={18} height={18} />
                            ))}
                        </div>
                        <p className="text-[18px] leading-[1.6] italic text-[#efe0d7]">"{rev.quote}"</p>
                        <div className="flex items-center gap-4 pt-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#ffb77e]/30">
                                <img className="w-full h-full object-cover" alt={rev.name} src={rev.imageSrc} />
                            </div>
                            <div>
                                <p className="text-[18px] font-semibold text-white">{rev.name}</p>
                                <p className="text-[#d9c2b3] text-sm">{rev.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

