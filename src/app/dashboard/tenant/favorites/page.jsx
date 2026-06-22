"use client"
import { useState, useEffect } from "react"
import Icon from "@/components/Icon"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchFavorites()
    }, [])

    const fetchFavorites = async () => {
        try {
            setLoading(true)
            setError(null)

            const { data: tokenData } = await authClient.token()

            if (!tokenData?.token) {
                throw new Error("No auth token found — are you logged in?")
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/favorites/all`, {
                headers: {
                    Authorization: `Bearer ${tokenData.token}`
                }
            })

            if (!res.ok) {
                throw new Error("Failed to fetch favorites")
            }

            const data = await res.json()
            setFavorites(data.data || [])
        } catch (err) {
            console.error("Error fetching favorites:", err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = async (propertyId) => {
        try {
            const { data: tokenData } = await authClient.token()

            if (!tokenData?.token) {
                throw new Error("No auth token found — are you logged in?")
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${propertyId}/favorite`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData.token}`
                },
                body: JSON.stringify({ isFavorite: false })
            })

            if (!res.ok) {
                throw new Error("Failed to remove favorite")
            }

            setFavorites(favorites.filter((fav) => fav._id !== propertyId))
            console.log("Property removed from favorites")
        } catch (err) {
            console.error("Error removing favorite:", err)
            alert("Failed to remove from favorites")
        }
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-[#efe0d7]">Favorites</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">Properties you have saved for later.</p>
                </div>
                <div className="p-12 text-center text-[#d9c2b3]">
                    <div className="w-8 h-8 border-4 border-[#ffb77e]/20 border-t-[#ffb77e] rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4">Loading your favorites...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-[#efe0d7]">Favorites</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">Properties you have saved for later.</p>
                </div>
                <div className="p-12 text-center text-red-400">
                    <Icon name="error" size={32} className="mx-auto mb-4" />
                    <p>Error loading favorites: {error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-[#efe0d7]">Favorites</h2>
                <p className="text-[#d9c2b3] text-sm mt-1">Properties you have saved for later. ({favorites.length})</p>
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
                            {favorites.map((property) => (
                                <tr key={property._id} className="hover:bg-[#302823]/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    alt={property.title}
                                                    src={property.imageSrc || "https://via.placeholder.com/100x75"}
                                                    onError={(e) => {
                                                        e.target.src = "https://via.placeholder.com/100x75"
                                                    }}
                                                />
                                            </div>
                                            <div className="text-sm font-bold text-[#efe0d7]">{property.title}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#d9c2b3]">{property.location}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-[#ffb77e]">
                                        ${property.price?.toLocaleString() || "N/A"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#cd7e39]/20 text-[#ffb77e] border border-[#cd7e39]/20">
                                            {property.propertyType || "Property"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/properties/${property._id}`}>
                                                <button className="bg-transparent border border-[#ffb77e]/30 text-[#ffb77e] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#ffb77e]/10 transition-colors">
                                                    View Details
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleRemove(property._id)}
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
    )
}
