import FeaturedProperties from "@/components/FeaturedProperties"
import Hero from "@/components/Hero"
import Navbar from "@/components/NavBar"

export default function Home() {
    return (
        <div>
            <Navbar></Navbar>
            <Hero></Hero>
            <FeaturedProperties></FeaturedProperties>
        </div>
    )
}

