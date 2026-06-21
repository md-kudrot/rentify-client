// app/properties/[id]/page.jsx

import ImageGallery from "@/components/details/ImageGallery"
import PropertyHeader from "@/components/details/PropertyHeader"
import FeaturesRibbon from "@/components/details/FeaturesRibbon"
import AboutSection from "@/components/details/AboutSection"
import AmenitiesSection from "@/components/details/AmenitiesSection"
import HostCard from "@/components/details/HostCard"
import ReviewsSection from "@/components/details/ReviewsSection"
import BookingCard from "@/components/details/BookingCard"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function PropertyDetailsPage({ params }) {
    const { id } = await params

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(`${process.env.SERVER_URL}/api/properties/${id}`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        return (
            <div className="py-20 max-w-[1280px]  mx-auto px-6">
                <h2 className="text-[32px] font-semibold leading-[1.3] text-white">Failed to load property details</h2>
                <p className="text-[#d9c2b3] mt-4">Please try again later.</p>
            </div>
        )
    }

    const property = await res.json()
    console.log("Fetched property details:", property)
    return (
        <div className="overflow-x-hidden min-h-screen pb-20 md:pb-0">
            <main className="pt-24 pb-20 px-6 max-w-[1280px] mx-auto space-y-10">
                <ImageGallery image={property} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-10">
                        <PropertyHeader property={property} />
                        <FeaturesRibbon property={property} />
                        <AboutSection property={property} />
                        <AmenitiesSection property={property} />
                        <HostCard host={property?.host} />
                        <ReviewsSection reviews={property?.reviews} />
                    </div>

                    <div className="lg:col-span-4 relative">
                        <BookingCard property={property} />
                    </div>
                </div>
            </main>
        </div>
    )
}

