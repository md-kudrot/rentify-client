"use client"

import { useState } from "react"
import Icon from "@/components/Icon"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"

export default function AddPropertyPage() {
    const { data: session } = authClient.useSession()
    const user = session?.user

    // ─── Form State ───────────────────────────────────────────
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        propertyType: "Villa",
        price: "",
        rentType: "Monthly",
        beds: "",
        baths: "",
        sqft: "",
        status: "pending",
        badge: "",
        yearBuilt: "",
        furnishing: "Unfurnished"
    })

    // ─── Tags State ───────────────────────────────────────────
    const [amenities, setAmenities] = useState([])
    const [newAmenity, setNewAmenity] = useState("")
    const [features, setFeatures] = useState([])
    const [newFeature, setNewFeature] = useState("")

    // ─── Image State ──────────────────────────────────────────
    const [imageFiles, setImageFiles] = useState([]) // File objects (for preview)
    const [imageUrls, setImageUrls] = useState([]) // Final uploaded URLs
    const [uploading, setUploading] = useState(false)

    // ─── UI State ─────────────────────────────────────────────
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState("")
    const [submitSuccess, setSubmitSuccess] = useState(false)

    // ─── Handlers ─────────────────────────────────────────────
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddTag = (e, type) => {
        if (e.key === "Enter") {
            e.preventDefault()
            if (type === "amenity" && newAmenity.trim()) {
                if (!amenities.includes(newAmenity.trim())) {
                    setAmenities((prev) => [...prev, newAmenity.trim()])
                }
                setNewAmenity("")
            } else if (type === "feature" && newFeature.trim()) {
                if (!features.includes(newFeature.trim())) {
                    setFeatures((prev) => [...prev, newFeature.trim()])
                }
                setNewFeature("")
            }
        }
    }

    const removeTag = (index, type) => {
        if (type === "amenity") {
            setAmenities((prev) => prev.filter((_, i) => i !== index))
        } else {
            setFeatures((prev) => prev.filter((_, i) => i !== index))
        }
    }

    // ─── Image: Local Preview ─────────────────────────────────
    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files)
        setImageFiles((prev) => [...prev, ...files])
    }

    const removeImageFile = (index) => {
        setImageFiles((prev) => prev.filter((_, i) => i !== index))
    }

    // ─── Image: Upload to ImgBB ───────────────────────────────
    const uploadImagesToImgBB = async () => {
        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY
        const uploaded = []

        for (const file of imageFiles) {
            const data = new FormData()
            data.append("image", file)
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: data
            })
            const json = await res.json()
            if (json.success) {
                uploaded.push(json.data.url)
            }
        }
        return uploaded
    }

    const handleSubmit = async (isDraft = false) => {
        setSubmitError("")
        setSubmitSuccess(false)

        if (!isDraft) {
            const requiredFields = [
                { key: "title", label: "Property Title" },
                { key: "description", label: "Description" },
                { key: "location", label: "Location" },
                { key: "price", label: "Rent Price" },
                { key: "beds", label: "Bedrooms" },
                { key: "baths", label: "Bathrooms" },
                { key: "sqft", label: "Property Size" }
            ]

            for (const field of requiredFields) {
                if (!formData[field.key]?.toString().trim()) {
                    setSubmitError(`❌ "${field.label}" field must be filled.`)
                    return // এখানেই থামিয়ে দাও
                }
            }

            if (imageFiles.length === 0) {
                setSubmitError("❌ Please upload at least one image.")
                return
            }

            // if (amenities.length === 0) {
            //     setSubmitError("❌ Please add at least one amenity.")
            //     return
            // }
        } else {
            // Draft এর জন্য শুধু title
            if (!formData.title?.trim()) {
                setSubmitError("❌ Property Title field must be filled to save as draft.")
                return
            }
        }

        setSubmitting(true)

        try {
            setUploading(true)
            const uploadedUrls = imageFiles.length > 0 ? await uploadImagesToImgBB() : []
            setUploading(false)

            const propertyPayload = {
                title: formData.title,
                description: formData.description,
                shortAbout: formData.description.slice(0, 120) + "...",
                location: formData.location,
                propertyType: formData.propertyType,
                price: Number(formData.price),
                rentType: formData.rentType,
                listingType: "rent",
                beds: Number(formData.beds),
                baths: Number(formData.baths),
                sqft: Number(formData.sqft),
                yearBuilt: Number(formData.yearBuilt) || null,
                furnishing: formData.furnishing,
                premiumAmenities: amenities,
                extraFeatures: features,
                imageSrc: uploadedUrls[0] || "",
                images: uploadedUrls,
                badge: formData.badge || "NEW",
                status: isDraft ? "draft" : "pending",
                isFavourite: false,
                createdAt: new Date().toISOString(),
                host: {
                    name: user?.name || "",
                    email: user?.email || "",
                    avatar: user?.image || "",
                    isVerified: true,
                    responseTime: "Within 1 hour",
                    memberSince: new Date().getFullYear().toString()
                },
                ownerEmail: user?.email || "",
                reviews: {
                    averageRating: 0,
                    totalReviews: 0
                }
            }

            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(propertyPayload)
            })

            if (!res.ok) throw new Error("Server error. Please try again.")

            setSubmitSuccess(true)

            // ✅ Form Reset
            setFormData({
                title: "",
                description: "",
                location: "",
                propertyType: "Villa",
                price: "",
                rentType: "Monthly",
                beds: "",
                baths: "",
                sqft: "",
                status: "pending",
                badge: "",
                yearBuilt: "",
                furnishing: "Unfurnished"
            })
            setAmenities([])
            setFeatures([])
            setImageFiles([])
        } catch (err) {
            setSubmitError(err.message)
        } finally {
            setSubmitting(false)
            setUploading(false)
        }
    }
    // ─── Render ───────────────────────────────────────────────
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-[#efe0d7]">Add New Property</h2>
                <p className="text-[#d9c2b3] text-sm mt-1">List a new luxury property to your portfolio.</p>
            </div>

            {submitSuccess && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 text-green-400 font-medium flex items-center gap-2">
                    <Icon name="check_circle" size={18} />
                    Property submitted successfully!
                </div>
            )}
            {submitError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 font-medium">
                    {submitError}
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* ── Main Column ── */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Property Information */}
                    <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 lg:p-8 space-y-6">
                        <SectionHeader icon="info" color="#cd7e39" textColor="#ffb77e" title="Property Information" />

                        <div className="space-y-4">
                            <FormField label="Property Title">
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Celestial Heights Villa"
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Description">
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Describe the property..."
                                    className={`${inputClass} resize-none`}
                                />
                            </FormField>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Location">
                                    <input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Palm Jumeirah, Dubai"
                                        className={inputClass}
                                    />
                                </FormField>
                                <FormField label="Property Type">
                                    <select
                                        name="propertyType"
                                        value={formData.propertyType}
                                        onChange={handleChange}
                                        className={selectClass}
                                    >
                                        {["Villa", "Mansion", "Penthouse", "Estate", "Apartment"].map((t) => (
                                            <option key={t}>{t}</option>
                                        ))}
                                    </select>
                                </FormField>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Rent Price ($)">
                                    <input
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="5000"
                                        className={inputClass}
                                    />
                                </FormField>
                                <FormField label="Rent Type">
                                    <select
                                        name="rentType"
                                        value={formData.rentType}
                                        onChange={handleChange}
                                        className={selectClass}
                                    >
                                        {["Daily", "Weekly", "Monthly"].map((t) => (
                                            <option key={t}>{t}</option>
                                        ))}
                                    </select>
                                </FormField>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Furnishing">
                                    <select
                                        name="furnishing"
                                        value={formData.furnishing}
                                        onChange={handleChange}
                                        className={selectClass}
                                    >
                                        {["Fully Furnished", "Semi Furnished", "Unfurnished"].map((t) => (
                                            <option key={t}>{t}</option>
                                        ))}
                                    </select>
                                </FormField>
                                <FormField label="Badge (optional)">
                                    <select
                                        name="badge"
                                        value={formData.badge}
                                        onChange={handleChange}
                                        className={selectClass}
                                    >
                                        <option value="">None</option>
                                        {["NEW", "FEATURED", "HOT", "PREMIUM"].map((t) => (
                                            <option key={t}>{t}</option>
                                        ))}
                                    </select>
                                </FormField>
                            </div>
                        </div>
                    </section>

                    {/* Property Specifications */}
                    <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 lg:p-8 space-y-6">
                        <SectionHeader
                            icon="straighten"
                            color="#bec6e0"
                            textColor="#bec6e0"
                            title="Property Specifications"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField label="Bedrooms">
                                <input
                                    name="beds"
                                    type="number"
                                    value={formData.beds}
                                    onChange={handleChange}
                                    placeholder="5"
                                    className={inputClass}
                                />
                            </FormField>
                            <FormField label="Bathrooms">
                                <input
                                    name="baths"
                                    type="number"
                                    value={formData.baths}
                                    onChange={handleChange}
                                    placeholder="6"
                                    className={inputClass}
                                />
                            </FormField>
                            <FormField label="Property Size (sqft)">
                                <input
                                    name="sqft"
                                    type="number"
                                    value={formData.sqft}
                                    onChange={handleChange}
                                    placeholder="8400"
                                    className={inputClass}
                                />
                            </FormField>
                        </div>
                        <FormField label="Year Built (optional)">
                            <input
                                name="yearBuilt"
                                type="number"
                                value={formData.yearBuilt}
                                onChange={handleChange}
                                placeholder="2022"
                                className={`${inputClass} md:w-1/3`}
                            />
                        </FormField>
                    </section>

                    {/* Images */}
                    <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 lg:p-8 space-y-6">
                        <SectionHeader icon="image" color="#64d6eb" textColor="#64d6eb" title="Images" />

                        <label className="border-2 border-dashed border-[#534438]/50 rounded-2xl p-8 text-center hover:bg-[#302823]/50 transition-colors cursor-pointer block">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleImageSelect}
                            />
                            <div className="w-16 h-16 rounded-full bg-[#211a15] flex items-center justify-center mx-auto mb-4 border border-[#534438]/30">
                                <Icon name="cloud_upload" size={28} className="text-[#ffb77e]" />
                            </div>
                            <h4 className="font-bold text-[#efe0d7] mb-1">Click to upload or drag and drop</h4>
                            <p className="text-sm text-[#d9c2b3]">PNG, JPG or GIF (max. 10MB each)</p>
                        </label>

                        {imageFiles.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {imageFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square rounded-xl overflow-hidden relative group"
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImageFile(index)}
                                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Icon name="delete" size={16} />
                                        </button>
                                        {index === 0 && (
                                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white font-bold uppercase">
                                                Cover
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                {/* ── Sidebar ── */}
                <div className="space-y-6">
                    {/* Amenities */}
                    <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 space-y-4">
                        <SectionHeader icon="spa" color="#ffb4ab" textColor="#ffb4ab" title="Amenities" />
                        <input
                            type="text"
                            value={newAmenity}
                            onChange={(e) => setNewAmenity(e.target.value)}
                            onKeyDown={(e) => handleAddTag(e, "amenity")}
                            placeholder="Type and press Enter..."
                            className={`${inputClass} mb-4`}
                        />
                        <div className="flex flex-wrap gap-2">
                            {amenities.map((item, index) => (
                                <Tag key={index} label={item} onRemove={() => removeTag(index, "amenity")} />
                            ))}
                        </div>
                    </section>

                    {/* Extra Features */}
                    <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 space-y-4">
                        <SectionHeader icon="star" color="#cd7e39" textColor="#ffb77e" title="Extra Features" />
                        <input
                            type="text"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            onKeyDown={(e) => handleAddTag(e, "feature")}
                            placeholder="Type and press Enter..."
                            className={`${inputClass} mb-4`}
                        />
                        <div className="flex flex-wrap gap-2">
                            {features.map((item, index) => (
                                <Tag key={index} label={item} onRemove={() => removeTag(index, "feature")} />
                            ))}
                        </div>
                    </section>

                    {/* Owner Info */}
                    <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 space-y-4">
                        <SectionHeader icon="person" color="#64d6eb" textColor="#64d6eb" title="Owner Info" />
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#ffb77e]/20">
                                <Image
                                    height={56}
                                    width={56}
                                    src={user?.image || "https://via.placeholder.com/150"}
                                    alt="Owner Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-bold text-[#efe0d7] flex items-center gap-1">
                                    {user?.name} <Icon name="verified" size={16} className="text-[#ffb77e]" />
                                </div>
                                <div className="text-sm text-[#d9c2b3]">{user?.email}</div>
                            </div>
                        </div>
                    </section>

                    {/* Status & Actions */}
                    <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 space-y-6">
                        <div>
                            <label className="text-sm font-bold text-[#d9c2b3] block mb-2">Status</label>
                            <div className="px-4 py-3 bg-[#211a15] border border-[#534438]/50 rounded-xl text-yellow-400 font-bold flex items-center gap-2">
                                <Icon name="pending" size={20} /> Pending
                            </div>
                            <p className="text-xs text-[#d9c2b3] mt-2">Status will be updated upon admin approval.</p>
                        </div>

                        <div className="pt-4 border-t border-[#534438]/20 flex flex-col gap-3">
                            <button
                                type="button"
                                onClick={() => handleSubmit(false)}
                                disabled={submitting}
                                className="w-full bg-gradient-to-br from-[#C97B36] to-[#F4A261] py-3 rounded-xl text-white font-bold hover:shadow-[0_0_25px_rgba(201,123,54,0.25)] transition-all disabled:opacity-50"
                            >
                                {uploading ? "Uploading images..." : submitting ? "Submitting..." : "Submit Property"}
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// ─── Reusable Mini Components ──────────────────────────────────────────────────

const inputClass =
    "w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
const selectClass = `${inputClass} appearance-none cursor-pointer`

function FormField({ label, children }) {
    return (
        <div>
            <label className="text-sm font-bold text-[#d9c2b3] block mb-2">{label}</label>
            {children}
        </div>
    )
}

function SectionHeader({ icon, color, textColor, title }) {
    return (
        <div className="flex items-center gap-3 border-b border-[#534438]/20 pb-4">
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${color}30`, color: textColor }}
            >
                <Icon name={icon} size={18} />
            </div>
            <h3 className="text-xl font-bold text-[#efe0d7]">{title}</h3>
        </div>
    )
}

function Tag({ label, onRemove }) {
    return (
        <span className="flex items-center gap-1 bg-[#302823] border border-[#534438]/30 px-3 py-1.5 rounded-lg text-sm text-[#d9c2b3]">
            {label}
            <button type="button" onClick={onRemove} className="text-[#d9c2b3] hover:text-red-400">
                <Icon name="close" size={14} />
            </button>
        </span>
    )
}

