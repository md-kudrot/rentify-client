"use client"

import { useState } from "react"
// import DashboardLayout from "@/components/dashboard/DashboardLayout"
import Icon from "@/components/Icon"

export default function AddPropertyPage() {
    const [amenities, setAmenities] = useState(["Private Beach Access", "Infinity Pool", "Smart Home Automation"])
    const [newAmenity, setNewAmenity] = useState("")

    const [features, setFeatures] = useState([
        "Wine Cellar",
        "Concierge Service",
        "Rooftop Terrace",
        "Underground Parking"
    ])
    const [newFeature, setNewFeature] = useState("")

    const handleAddTag = (e, type) => {
        if (e.key === "Enter") {
            e.preventDefault()
            if (type === "amenity" && newAmenity.trim()) {
                if (!amenities.includes(newAmenity.trim())) {
                    setAmenities([...amenities, newAmenity.trim()])
                }
                setNewAmenity("")
            } else if (type === "feature" && newFeature.trim()) {
                if (!features.includes(newFeature.trim())) {
                    setFeatures([...features, newFeature.trim()])
                }
                setNewFeature("")
            }
        }
    }

    const removeTag = (index, type) => {
        if (type === "amenity") {
            setAmenities(amenities.filter((_, i) => i !== index))
        } else {
            setFeatures(features.filter((_, i) => i !== index))
        }
    }

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-[#efe0d7]">Add New Property</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">List a new luxury property to your portfolio.</p>
                </div>

                <form className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Main Content Column */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Section 1: Property Information */}
                        <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 lg:p-8 space-y-6">
                            <div className="flex items-center gap-3 border-b border-[#534438]/20 pb-4">
                                <div className="w-8 h-8 rounded-full bg-[#cd7e39]/20 flex items-center justify-center text-[#ffb77e]">
                                    <Icon name="info" size={18} />
                                </div>
                                <h3 className="text-xl font-bold text-[#efe0d7]">Property Information</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-[#d9c2b3] block mb-2">
                                        Property Title
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Celestial Heights Villa"
                                        className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-[#d9c2b3] block mb-2">Description</label>
                                    <textarea
                                        rows="4"
                                        defaultValue="Luxury waterfront villa with panoramic ocean views."
                                        className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors resize-none custom-scrollbar"
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-bold text-[#d9c2b3] block mb-2">Location</label>
                                        <input
                                            type="text"
                                            defaultValue="Palm Jumeirah, Dubai"
                                            className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-[#d9c2b3] block mb-2">
                                            Property Type
                                        </label>
                                        <select className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none cursor-pointer">
                                            <option>Villa</option>
                                            <option>Mansion</option>
                                            <option>Penthouse</option>
                                            <option>Estate</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-bold text-[#d9c2b3] block mb-2">
                                            Rent Price ($)
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue="5000"
                                            className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-[#d9c2b3] block mb-2">Rent Type</label>
                                        <select
                                            defaultValue="Monthly"
                                            className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none cursor-pointer"
                                        >
                                            <option>Daily</option>
                                            <option>Weekly</option>
                                            <option>Monthly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Property Specifications */}
                        <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 lg:p-8 space-y-6">
                            <div className="flex items-center gap-3 border-b border-[#534438]/20 pb-4">
                                <div className="w-8 h-8 rounded-full bg-[#bec6e0]/20 flex items-center justify-center text-[#bec6e0]">
                                    <Icon name="straighten" size={18} />
                                </div>
                                <h3 className="text-xl font-bold text-[#efe0d7]">Property Specifications</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-[#d9c2b3] block mb-2">Bedrooms</label>
                                    <input
                                        type="number"
                                        defaultValue="5"
                                        className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-[#d9c2b3] block mb-2">Bathrooms</label>
                                    <input
                                        type="number"
                                        defaultValue="6"
                                        className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-[#d9c2b3] block mb-2">
                                        Property Size (sqft)
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue="8400"
                                        className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 4: Images */}
                        <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 lg:p-8 space-y-6">
                            <div className="flex items-center gap-3 border-b border-[#534438]/20 pb-4">
                                <div className="w-8 h-8 rounded-full bg-[#64d6eb]/20 flex items-center justify-center text-[#64d6eb]">
                                    <Icon name="image" size={18} />
                                </div>
                                <h3 className="text-xl font-bold text-[#efe0d7]">Images</h3>
                            </div>

                            <div className="border-2 border-dashed border-[#534438]/50 rounded-2xl p-8 text-center hover:bg-[#302823]/50 transition-colors cursor-pointer">
                                <div className="w-16 h-16 rounded-full bg-[#211a15] flex items-center justify-center mx-auto mb-4 border border-[#534438]/30">
                                    <Icon name="cloud_upload" size={28} className="text-[#ffb77e]" />
                                </div>
                                <h4 className="font-bold text-[#efe0d7] mb-1">Click to upload or drag and drop</h4>
                                <p className="text-sm text-[#d9c2b3]">SVG, PNG, JPG or GIF (max. 10MB)</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                <div className="aspect-square rounded-xl overflow-hidden relative group">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKbwOYKgGW6fz5B4Wh6j3RaPTVWNng8TkQbOQb7hyT85yNd4MAHOsf36Bk9-WguRNUHeLCzZ-0qSatOYuCpbmk4ou9B-3GEm7-QHX-xYKC7oyQOzAT7nnML4yjOtwCAGmn25gtpAQheOn2SEDmxLHp65HD5EC53fLYzOD-V_ahDLAG6DEVtj9iosJRP12ZGTUVjNn6Bt-rDyi-oBhwz7qi4L2rSErOTWWcS3w3mV0NSp6SnWrRNvAVHPQI0_w1WyE2RDBHD-NiS58"
                                        alt="Preview 1"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Icon name="delete" size={16} />
                                    </button>
                                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white font-bold uppercase">
                                        Cover
                                    </div>
                                </div>
                                <div className="aspect-square rounded-xl overflow-hidden relative group">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPxA4Ln7tAUSX6hQzIkgHmqYNSpMnCYVyHNe2mnj2Ki7UpeYWrbs0rrJXdkKXlYfV18lrABNjJgXKKUbj0jSVw0E0JloSyiBMrCQQE5LtGZRmgt18BUUdMreAyoRpDPLF4LVylbcJtDgERT1KKBzTWhDyxNMo3dL9akEnKh_RvjBW0tm7Paa17AQT7tDOqHCgbGzcGjGLN6G06wwLOzVTv46hk6oc21MD0G4_xMJJfF31pLv9Nxn1GNecRyLaQrUrUVE-f-LW8Mc4"
                                        alt="Preview 2"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Icon name="delete" size={16} />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        {/* Section 3: Amenities */}
                        <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 space-y-4">
                            <div className="flex items-center gap-3 border-b border-[#534438]/20 pb-4">
                                <div className="w-8 h-8 rounded-full bg-[#ffb4ab]/20 flex items-center justify-center text-[#ffb4ab]">
                                    <Icon name="spa" size={18} />
                                </div>
                                <h3 className="text-xl font-bold text-[#efe0d7]">Amenities</h3>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    value={newAmenity}
                                    onChange={(e) => setNewAmenity(e.target.value)}
                                    onKeyDown={(e) => handleAddTag(e, "amenity")}
                                    placeholder="Type and press Enter..."
                                    className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors mb-4"
                                />
                                <div className="flex flex-wrap gap-2">
                                    {amenities.map((item, index) => (
                                        <span
                                            key={index}
                                            className="flex items-center gap-1 bg-[#302823] border border-[#534438]/30 px-3 py-1.5 rounded-lg text-sm text-[#d9c2b3]"
                                        >
                                            {item}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index, "amenity")}
                                                className="text-[#d9c2b3] hover:text-red-400"
                                            >
                                                <Icon name="close" size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Section 5: Extra Features */}
                        <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 space-y-4">
                            <div className="flex items-center gap-3 border-b border-[#534438]/20 pb-4">
                                <div className="w-8 h-8 rounded-full bg-[#cd7e39]/20 flex items-center justify-center text-[#ffb77e]">
                                    <Icon name="star" size={18} />
                                </div>
                                <h3 className="text-xl font-bold text-[#efe0d7]">Extra Features</h3>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    onKeyDown={(e) => handleAddTag(e, "feature")}
                                    placeholder="Type and press Enter..."
                                    className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors mb-4"
                                />
                                <div className="flex flex-wrap gap-2">
                                    {features.map((item, index) => (
                                        <span
                                            key={index}
                                            className="flex items-center gap-1 bg-[#302823] border border-[#534438]/30 px-3 py-1.5 rounded-lg text-sm text-[#d9c2b3]"
                                        >
                                            {item}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index, "feature")}
                                                className="text-[#d9c2b3] hover:text-red-400"
                                            >
                                                <Icon name="close" size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Section 6: Owner Information */}
                        <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 space-y-4">
                            <div className="flex items-center gap-3 border-b border-[#534438]/20 pb-4">
                                <div className="w-8 h-8 rounded-full bg-[#64d6eb]/20 flex items-center justify-center text-[#64d6eb]">
                                    <Icon name="person" size={18} />
                                </div>
                                <h3 className="text-xl font-bold text-[#efe0d7]">Owner Info</h3>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#ffb77e]/20">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXBwJ-6EwPcYjGexq9gWyuAhdh5VDLBJxewEIletxToB-g734JKUGj2mVC4leTufiHMAkUpNS9p2YMv6NUL-jx__NvaKtueCwMGm_oolKaF03TwKWldRPl872aLYiT20zdJl7lV4-Kz_VItGQRwND0H9Wb0STTkCfyxSECF_1IA9xhnPv5vxGZ8hcPVhc2gfcI58v1uM-bmW9PPeKJzcnNOMwJS8-iEyOdBh1YCQLLQ_EC3JRc7huLW4gzC-pyxOkmeMcwRcbPTNc"
                                        alt="Owner Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-bold text-[#efe0d7] flex items-center gap-1">
                                        Ahmed Al-Rashid <Icon name="verified" size={16} className="text-[#ffb77e]" />
                                    </div>
                                    <div className="text-sm text-[#d9c2b3]">Member since 2024</div>
                                </div>
                            </div>
                            <div className="space-y-2 mt-4 text-sm">
                                <div className="flex items-center gap-2 text-[#d9c2b3]">
                                    <Icon name="mail" size={16} /> ahmed.alrashid@example.com
                                </div>
                                <div className="flex items-center gap-2 text-[#d9c2b3]">
                                    <Icon name="phone" size={16} /> +971 50 123 4567
                                </div>
                                <div className="flex items-center gap-2 text-[#d9c2b3]">
                                    <Icon name="schedule" size={16} /> Response time: ~1 hour
                                </div>
                            </div>
                        </section>

                        {/* Section 7: Status & Actions */}
                        <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 space-y-6">
                            <div>
                                <label className="text-sm font-bold text-[#d9c2b3] block mb-2">Status</label>
                                <div className="px-4 py-3 bg-[#211a15] border border-[#534438]/50 rounded-xl text-yellow-400 font-bold flex items-center gap-2">
                                    <Icon name="pending" size={20} /> Pending
                                </div>
                                <p className="text-xs text-[#d9c2b3] mt-2">
                                    Status will be updated upon admin approval.
                                </p>
                            </div>

                            <div className="pt-4 border-t border-[#534438]/20 flex flex-col gap-3">
                                <button
                                    type="button"
                                    className="w-full py-3 rounded-xl border border-[#534438]/50 text-[#efe0d7] font-bold hover:bg-[#302823] transition-colors"
                                >
                                    Save as Draft
                                </button>
                                <button
                                    type="button"
                                    className="w-full bg-gradient-to-br from-[#C97B36] to-[#F4A261] py-3 rounded-xl text-white font-bold hover:shadow-[0_0_25px_rgba(201,123,54,0.25)] transition-all"
                                >
                                    Submit Property
                                </button>
                            </div>
                        </section>
                    </div>
                </form>
            </div>
        </>
    )
}

