import FeaturedProperties from "@/components/FeaturedProperties"
import Hero from "@/components/Hero"
import Navbar from "@/components/NavBar"
import Statistics from "@/components/Statistics"
import WhyChooseUs from "@/components/WhyChooseUs"

export default function Home() {
    return (
        <div>
            <Navbar></Navbar>
            <Hero></Hero>
            <FeaturedProperties></FeaturedProperties>
            <Statistics></Statistics>
            <WhyChooseUs></WhyChooseUs>
        </div>
    )
}

