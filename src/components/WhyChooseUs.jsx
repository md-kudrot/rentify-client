import React from "react"
import { SealCheck, Headphones, ShieldCheck, FaceRobot } from "@gravity-ui/icons"

export default function WhyChooseUs() {
    const advantages = [
        {
            icon: SealCheck,
            title: "Verified Listings",
            desc: "Every property undergoes a 50-point inspection before listing."
        },
        {
            icon: Headphones,
            title: "24/7 Concierge",
            desc: "Personal lifestyle managers available for all tenants anytime."
        },
        {
            icon: ShieldCheck,
            title: "Secure Payment",
            desc: "Encrypted blockchain-based rental transactions and escrow."
        },
        {
            icon: FaceRobot,
            title: "Smart Homes",
            desc: "Our properties feature fully integrated IoT ecosystems."
        }
    ]

    return (
        <section className="py-20 max-w-[1280px] mx-auto px-6 bg-[#211a15] rounded-[32px] my-10">
            <div className="text-center mb-10">
                <p className="text-[#ffb77e] text-[14px] font-medium tracking-[0.05em] tracking-widest uppercase mb-2">
                    The Rentora Advantage
                </p>
                <h3 className="text-[32px] font-semibold leading-[1.3] text-white">Elevated Property Management</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {advantages.map((adv, i) => {
                    const IconComponent = adv.icon
                    return (
                        <div
                            key={i}
                            className="p-6 bg-[#261e19] rounded-xl border border-[#534438]/10 hover:border-[#ffb77e]/30 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-lg copper-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <span className="text-white flex items-center justify-center">
                                    <IconComponent width={24} height={24} />
                                </span>
                            </div>
                            <h5 className="text-[20px] font-semibold text-white mb-2">{adv.title}</h5>
                            <p className="text-[#d9c2b3] text-[16px] leading-[1.6]">{adv.desc}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

