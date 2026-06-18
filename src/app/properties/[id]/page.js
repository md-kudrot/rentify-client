"use client"

import React from "react"
// import Navbar from "@/components/Navbar"
// import Footer from "@/components/Footer"
// import BottomNavBar from '@/components/BottomNavBar';
import ImageGallery from "@/components/details/ImageGallery"
import PropertyHeader from "@/components/details/PropertyHeader"
import FeaturesRibbon from "@/components/details/FeaturesRibbon"
import AboutSection from "@/components/details/AboutSection"
import AmenitiesSection from "@/components/details/AmenitiesSection"
import HostCard from "@/components/details/HostCard"
import ReviewsSection from "@/components/details/ReviewsSection"
import BookingCard from "@/components/details/BookingCard"

export default function PropertyDetailsPage() {
    return (
        <div className="overflow-x-hidden min-h-screen pb-20 md:pb-0">
            {/* <Navbar /> */}

            <main className="pt-24 pb-20 px-6 max-w-[1280px] mx-auto space-y-10">
                {/* Image Bento Gallery */}
                <ImageGallery />

                {/* Main Content Layout: Details + Booking card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Details column */}
                    <div className="lg:col-span-8 space-y-10">
                        <PropertyHeader />
                        <FeaturesRibbon />
                        <AboutSection />
                        <AmenitiesSection />
                        <HostCard />
                        <ReviewsSection />
                    </div>

                    {/* Sticky Booking column */}
                    <div className="lg:col-span-4 relative">
                        <BookingCard />
                    </div>
                </div>
            </main>

            {/* <Footer />
            <BottomNavBar /> */}
        </div>
    )
}

