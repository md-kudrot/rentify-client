"use client"
import DashboardLayout from "@/../src/app/dashboard/layout"
import { useState } from "react"
// import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Icon from "@/components/Icon"

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([
        {
            id: "PROP-001",
            property: "The Zenith Heights",
            location: "Manhattan, NY",
            price: "$4,200/month",
            type: "Apartment",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKbwOYKgGW6fz5B4Wh6j3RaPTVWNng8TkQbOQb7hyT85yNd4MAHOsf36Bk9-WguRNUHeLCzZ-0qSatOYuCpbmk4ou9B-3GEm7-QHX-xYKC7oyQOzAT7nnML4yjOtwCAGmn25gtpAQheOn2SEDmxLHp65HD5EC53fLYzOD-V_ahDLAG6DEVtj9iosJRP12ZGTUVjNn6Bt-rDyi-oBhwz7qi4L2rSErOTWWcS3w3mV0NSp6SnWrRNvAVHPQI0_w1WyE2RDBHD-NiS58"
        },
        {
            id: "PROP-002",
            property: "Azure Bay Villa",
            location: "Miami, FL",
            price: "$5,600/month",
            type: "Villa",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPxA4Ln7tAUSX6hQzIkgHmqYNSpMnCYVyHNe2mnj2Ki7UpeYWrbs0rrJXdkKXlYfV18lrABNjJgXKKUbj0jSVw0E0JloSyiBMrCQQE5LtGZRmgt18BUUdMreAyoRpDPLF4LVylbcJtDgERT1KKBzTWhDyxNMo3dL9akEnKh_RvjBW0tm7Paa17AQT7tDOqHCgbGzcGjGLN6G06wwLOzVTv46hk6oc21MD0G4_xMJJfF31pLv9Nxn1GNecRyLaQrUrUVE-f-LW8Mc4"
        }
    ])

    const handleRemove = (id) => {
        // Optimistic UI update
        setFavorites(favorites.filter((fav) => fav.id !== id))
        // TODO: Call DELETE API here
        // fetch(`/api/favorites/${id}`, { method: 'DELETE' })
    }

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-[#efe0d7]">Favorites</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">Properties you have saved for later.</p>
                </div>

                <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-[#211a15] text-[10px] uppercase tracking-widest text-[#d9c2b3] font-bold">
                                <tr>
                                    <th className="px-6 py-4">Property</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#534438]/20">
                                {favorites.map((fav) => (
                                    <tr key={fav.id} className="hover:bg-[#302823]/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        alt={fav.property}
                                                        src={fav.image}
                                                    />
                                                </div>
                                                <div className="text-sm font-bold text-[#efe0d7]">{fav.property}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#d9c2b3]">{fav.location}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#ffb77e]">{fav.price}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#cd7e39]/20 text-[#ffb77e] border border-[#cd7e39]/20">
                                                {fav.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="bg-transparent border border-[#ffb77e]/30 text-[#ffb77e] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#ffb77e]/10 transition-colors">
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={() => handleRemove(fav.id)}
                                                    className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-500/20 transition-colors flex items-center gap-1"
                                                >
                                                    <Icon name="delete" size={16} /> Remove
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {favorites.length === 0 && (
                            <div className="p-12 text-center text-[#d9c2b3]">
                                <div className="w-16 h-16 rounded-full bg-[#302823] flex items-center justify-center mx-auto mb-4">
                                    <Icon name="favorite_border" size={32} className="text-[#534438]" />
                                </div>
                                <h3 className="text-lg font-bold text-[#efe0d7] mb-2">No favorites yet</h3>
                                <p>You haven't saved any properties to your favorites.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    )
}

