"use client"

import { useState, useEffect } from "react"
import Icon from "@/components/Icon"
import { CircleXmark, Eye, PencilToSquare, TrashBin } from "@gravity-ui/icons"
import { authClient } from "@/lib/auth-client"

export default function MyPropertiesPage() {
    const { data: session } = authClient.useSession()
    const user = session?.user
    const token = session?.session?.token

    // ── Data State ──────────────────────────────────────────
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // ── Filter State ────────────────────────────────────────
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [typeFilter, setTypeFilter] = useState("")

    // ── Modal State ─────────────────────────────────────────
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedFeedback, setSelectedFeedback] = useState("")

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [editForm, setEditForm] = useState({})
    const [editLoading, setEditLoading] = useState(false)
    const [editError, setEditError] = useState("")

    const [deleteConfirmId, setDeleteConfirmId] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(false)

    // ── Fetch Properties ────────────────────────────────────
    const fetchProperties = async () => {
        if (!user?.email || !token) return
        setLoading(true)
        setError("")
        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/owner/${user.email}`, {
                headers: { Authorization: `Bearer ${tokenData?.token}` }
            })
            if (!res.ok) throw new Error("Failed to fetch properties")
            const data = await res.json()
            setProperties(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProperties()
    }, [user?.email, token])

    // ── Filter Logic ────────────────────────────────────────
    const filteredProperties = properties.filter((p) => {
        const matchSearch =
            p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.location?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchStatus = statusFilter ? p.status === statusFilter : true
        const matchType = typeFilter ? p.propertyType === typeFilter : true
        return matchSearch && matchStatus && matchType
    })

    // ── Edit Handlers ────────────────────────────────────────
    const openEditModal = (property) => {
        setSelectedProperty(property)
        setEditForm({
            title: property.title || "",
            propertyType: property.propertyType || "Villa",
            location: property.location || "",
            beds: property.beds || "",
            baths: property.baths || "",
            price: property.price || "",
            rentType: property.rentType || "Monthly",
            description: property.description || ""
        })
        setEditError("")
        setIsEditModalOpen(true)
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target
        setEditForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleEditSave = async () => {
        if (!editForm.title?.trim()) {
            setEditError("Property Title আবশ্যক।")
            return
        }
        setEditLoading(true)
        setEditError("")
        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${selectedProperty._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(editForm)
            })
            if (!res.ok) throw new Error("Update failed")
            await fetchProperties() // ✅ list refresh
            setIsEditModalOpen(false)
        } catch (err) {
            setEditError(err.message)
        } finally {
            setEditLoading(false)
        }
    }

    // ── Delete Handlers ──────────────────────────────────────
    const handleDelete = async (id) => {
        setDeleteLoading(true)
        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${tokenData?.token}` }
            })
            if (!res.ok) throw new Error("Delete failed")
            setProperties((prev) => prev.filter((p) => p._id !== id)) // ✅ local remove
            setDeleteConfirmId(null)
        } catch (err) {
            console.error(err.message)
        } finally {
            setDeleteLoading(false)
        }
    }

    // ── Status Badge ─────────────────────────────────────────
    const getStatusBadge = (status) => {
        const map = {
            approved: "bg-green-500/20 text-green-400 border-green-500/20",
            pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
            rejected: "bg-red-500/20 text-red-400 border-red-500/20",
            draft: "bg-slate-500/20 text-slate-400 border-slate-500/20"
        }
        const key = status?.toLowerCase()
        return (
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border capitalize ${map[key] || map.draft}`}>
                {status}
            </span>
        )
    }

    // ── Unique Types for Filter ──────────────────────────────
    const uniqueTypes = [...new Set(properties.map((p) => p.propertyType).filter(Boolean))]

    // ────────────────────────────────────────────────────────
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-[#efe0d7]">My Properties</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">Manage and track your luxury portfolio.</p>
                </div>
                <button className="bg-gradient-to-br from-[#C97B36] to-[#F4A261] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-[0_0_25px_rgba(201,123,54,0.25)] transition-all flex items-center justify-center gap-2">
                    <Icon name="add" size={20} /> Add Property
                </button>
            </div>

            <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl overflow-hidden">
                {/* Filters */}
                <div className="p-6 border-b border-[#534438]/20 flex flex-col md:flex-row gap-4 items-center justify-between bg-[#211a15]/50">
                    <div className="relative w-full md:w-96">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d9c2b3]">
                            <Icon name="search" size={20} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search properties..."
                            className="w-full bg-[#19120d] border border-[#534438]/50 rounded-xl pl-12 pr-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                        />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-[#19120d] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none flex-1 md:flex-none"
                        >
                            <option value="">All Statuses</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                            <option value="draft">Draft</option>
                        </select>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="bg-[#19120d] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none flex-1 md:flex-none"
                        >
                            <option value="">All Types</option>
                            {uniqueTypes.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="p-12 text-center text-[#d9c2b3]">Loading properties...</div>
                ) : error ? (
                    <div className="p-12 text-center text-red-400">{error}</div>
                ) : filteredProperties.length === 0 ? (
                    <div className="p-12 text-center text-[#d9c2b3]">No properties found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-[#211a15] text-[10px] uppercase tracking-widest text-[#d9c2b3] font-bold">
                                <tr>
                                    <th className="px-6 py-4">Property</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Price / mo</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Created</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#534438]/20">
                                {filteredProperties.map((property) => (
                                    <tr key={property._id} className="hover:bg-[#302823]/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-[#534438]/30">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        alt={property.title}
                                                        src={
                                                            property.imageSrc ||
                                                            property.images?.[0] ||
                                                            "https://via.placeholder.com/150"
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-[#efe0d7]">
                                                        {property.title}
                                                    </div>
                                                    <div className="text-[10px] text-[#d9c2b3]">
                                                        {property._id?.toString().slice(-6).toUpperCase()}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#d9c2b3]">{property.location}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#302823] text-[#d9c2b3] border border-[#534438]/30">
                                                {property.propertyType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#ffb77e]">
                                            ${property.price?.toLocaleString()}
                                            <span className="text-[10px] text-[#d9c2b3] font-normal ml-1">
                                                /{property.rentType?.toLowerCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-start gap-1">
                                                {getStatusBadge(property.status)}
                                                {/* Rejected হলে Feedback button */}
                                                {property.status === "rejected" && property.feedback && (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedFeedback(property.feedback)
                                                            setIsModalOpen(true)
                                                        }}
                                                        className="text-[10px] text-red-400 hover:underline mt-0.5"
                                                    >
                                                        View Feedback
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#d9c2b3]">
                                            {property.createdAt
                                                ? new Date(property.createdAt).toLocaleDateString("en-US", {
                                                      month: "short",
                                                      day: "numeric",
                                                      year: "numeric"
                                                  })
                                                : "—"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] flex items-center justify-center hover:bg-[#ffb77e]/20 hover:text-[#ffb77e] transition-colors"
                                                    title="View"
                                                >
                                                    <Eye width={16} height={16} />
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(property)}
                                                    className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] flex items-center justify-center hover:bg-[#64d6eb]/20 hover:text-[#64d6eb] transition-colors"
                                                    title="Edit"
                                                >
                                                    <PencilToSquare width={16} height={16} />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirmId(property._id)}
                                                    className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <TrashBin width={16} height={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {/* ── Feedback Modal ── */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-[#19120d] border border-red-500/30 rounded-3xl w-1/3 overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-[#534438]/20 flex justify-between items-center bg-[#211a15]">
                            <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                                <Icon name="warning" size={24} /> Rejection Feedback
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-[#d9c2b3] hover:text-[#ffb77e] p-2 rounded-full hover:bg-[#302823] transition-colors"
                            >
                                <Icon name="close" size={24} />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-[#efe0d7] leading-relaxed">{selectedFeedback}</p>
                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2.5 bg-[#302823] text-[#efe0d7] rounded-xl font-bold hover:bg-[#534438]/50 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Confirm Modal ── */}
            {deleteConfirmId && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-[#19120d] border border-red-500/30 rounded-3xl w-1/3  overflow-hidden shadow-2xl">
                        <div className="p-6 text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
                                <TrashBin width={28} height={28} className="text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-[#efe0d7]">Delete Property?</h3>
                            <p className="text-[#d9c2b3] text-sm">
                                This action cannot be undone. Are you sure you want to delete this property listing?
                            </p>
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="flex-1 py-2.5 bg-[#302823] text-[#efe0d7] rounded-xl font-bold hover:bg-[#534438]/50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirmId)}
                                    disabled={deleteLoading}
                                    className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
                                >
                                    {deleteLoading ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Edit Modal ── */}
            {isEditModalOpen && selectedProperty && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#19120d] border border-[#534438]/30 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
                        <div className="p-6 border-b border-[#534438]/20 flex justify-between items-center bg-[#211a15]">
                            <h3 className="text-xl font-bold text-[#efe0d7] flex items-center gap-2">
                                <Icon name="edit" size={24} className="text-[#ffb77e]" /> Edit Property
                            </h3>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-[#d9c2b3] hover:text-[#ffb77e] p-2 rounded-full hover:bg-[#302823] transition-colors"
                            >
                                <CircleXmark width={24} height={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto custom-scrollbar">
                            {editError && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                                    {editError}
                                </div>
                            )}

                            {/* Image Preview */}
                            <div className="w-full h-40 rounded-xl overflow-hidden">
                                <img
                                    src={selectedProperty.imageSrc || selectedProperty.images?.[0]}
                                    alt="Property"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: "Property Title", name: "title", type: "text" },
                                    { label: "Location", name: "location", type: "text" },
                                    { label: "Bedrooms", name: "beds", type: "number" },
                                    { label: "Bathrooms", name: "baths", type: "number" },
                                    { label: "Price", name: "price", type: "number" }
                                ].map(({ label, name, type }) => (
                                    <div key={name} className="space-y-2">
                                        <label className="text-sm font-medium text-[#d9c2b3]">{label}</label>
                                        <input
                                            type={type}
                                            name={name}
                                            value={editForm[name]}
                                            onChange={handleEditChange}
                                            className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                                        />
                                    </div>
                                ))}

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#d9c2b3]">Property Type</label>
                                    <select
                                        name="propertyType"
                                        value={editForm.propertyType}
                                        onChange={handleEditChange}
                                        className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none"
                                    >
                                        {["Villa", "Mansion", "Cabin", "Apartment", "Penthouse", "Estate"].map((t) => (
                                            <option key={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#d9c2b3]">Rent Type</label>
                                    <select
                                        name="rentType"
                                        value={editForm.rentType}
                                        onChange={handleEditChange}
                                        className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none"
                                    >
                                        {["Daily", "Weekly", "Monthly"].map((t) => (
                                            <option key={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#d9c2b3]">Description</label>
                                <textarea
                                    name="description"
                                    value={editForm.description}
                                    onChange={handleEditChange}
                                    rows={3}
                                    className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors resize-none"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-[#534438]/20 bg-[#211a15] flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-6 py-2.5 bg-[#302823] text-[#efe0d7] rounded-xl font-bold hover:bg-[#534438]/50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSave}
                                disabled={editLoading}
                                className="px-6 py-2.5 bg-gradient-to-br from-[#C97B36] to-[#F4A261] text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(201,123,54,0.3)] transition-all disabled:opacity-50"
                            >
                                {editLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

