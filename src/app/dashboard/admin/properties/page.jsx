"use client"

import { useState, useEffect } from "react"
import Icon from "@/components/Icon"
import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import { PencilToSquare, SquareXmark, Xmark } from "@gravity-ui/icons"

export default function AdminPropertiesPage() {
    const { data: session } = authClient.useSession()
    const token = session?.session?.token
    const adminEmail = session?.user?.email

    // ── State ─────────────────────────────────────────────
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // ── Filter State ──────────────────────────────────────
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("")

    // ── Reject Modal ──────────────────────────────────────
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [feedbackText, setFeedbackText] = useState("")
    const [rejectLoading, setRejectLoading] = useState(false)
    const [rejectError, setRejectError] = useState("")

    // ── Edit Modal ────────────────────────────────────────
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editProperty, setEditProperty] = useState(null)
    const [editForm, setEditForm] = useState({})
    const [editLoading, setEditLoading] = useState(false)
    const [editError, setEditError] = useState("")

    // ── Delete ────────────────────────────────────────────
    const [deleteConfirmId, setDeleteConfirmId] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(false)

    // ── Approve loading ───────────────────────────────────
    const [approveLoadingId, setApproveLoadingId] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalProperties, setTotalProperties] = useState(0)

    // ── Fetch ─────────────────────────────────────────────
    const fetchProperties = async () => {
        if (!token) return
        setLoading(true)
        setError("")
        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties?page=${currentPage}`, {
                headers: { Authorization: `Bearer ${tokenData.token}` }
            })
            if (!res.ok) throw new Error("Failed to fetch properties")
            const data = await res.json()
            setProperties(data.properties)
            setTotalProperties(data.pagination.totalProperties)
            setTotalPages(data.pagination.totalPages)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProperties()
    }, [token, currentPage])

    // ── Filter Logic ──────────────────────────────────────
    const filteredProperties = properties.filter((p) => {
        const matchSearch =
            p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.ownerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.location?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchStatus = statusFilter ? p.status === statusFilter : true
        return matchSearch && matchStatus
    })

    const getPageNumbers = (current, total) => {
        if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
        if (current <= 4) return [1, 2, 3, 4, 5, "...", total]
        if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total]
        return [1, "...", current - 1, current, current + 1, "...", total]
    }

    // ── Approve ───────────────────────────────────────────
    const handleApprove = async (id) => {
        setApproveLoadingId(id)
        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${id}/approve`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${tokenData.token}` }
            })
            if (!res.ok) throw new Error("Approve failed")
            setProperties((prev) => prev.map((p) => (p._id === id ? { ...p, status: "approved", feedback: null } : p)))
        } catch (err) {
            console.error(err.message)
        } finally {
            setApproveLoadingId(null)
        }
    }

    // ── Reject ────────────────────────────────────────────
    const openRejectModal = (property) => {
        setSelectedProperty(property)
        setFeedbackText("")
        setRejectError("")
        setIsRejectModalOpen(true)
    }

    const handleReject = async () => {
        if (!feedbackText.trim()) {
            setRejectError("Feedback দেওয়া আবশ্যক।")
            return
        }
        setRejectLoading(true)
        setRejectError("")
        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${selectedProperty._id}/reject`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenData.token}`
                    },
                    body: JSON.stringify({
                        feedback: feedbackText.trim(),
                        rejectedBy: adminEmail
                    })
                }
            )
            if (!res.ok) throw new Error("Reject failed")
            setProperties((prev) =>
                prev.map((p) =>
                    p._id === selectedProperty._id ? { ...p, status: "rejected", feedback: feedbackText.trim() } : p
                )
            )
            setIsRejectModalOpen(false)
        } catch (err) {
            setRejectError(err.message)
        } finally {
            setRejectLoading(false)
        }
    }

    // ── Edit ──────────────────────────────────────────────
    const openEditModal = (property) => {
        setEditProperty(property)
        setEditForm({
            title: property.title || "",
            propertyType: property.propertyType || "Villa",
            location: property.location || "",
            price: property.price || "",
            rentType: property.rentType || "Monthly",
            status: property.status || "pending"
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${editProperty._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData.token}`
                },
                body: JSON.stringify(editForm)
            })
            if (!res.ok) throw new Error("Update failed")
            setProperties((prev) => prev.map((p) => (p._id === editProperty._id ? { ...p, ...editForm } : p)))
            setIsEditModalOpen(false)
        } catch (err) {
            setEditError(err.message)
        } finally {
            setEditLoading(false)
        }
    }

    // ── Delete ────────────────────────────────────────────
    const handleDelete = async (id) => {
        setDeleteLoading(true)
        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${tokenData.token}` }
            })
            if (!res.ok) throw new Error("Delete failed")
            setProperties((prev) => prev.filter((p) => p._id !== id))
            setDeleteConfirmId(null)
        } catch (err) {
            console.error(err.message)
        } finally {
            setDeleteLoading(false)
        }
    }

    // ── Status Badge ──────────────────────────────────────
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

    // ── Render ────────────────────────────────────────────
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-[#efe0d7]">All Properties</h2>
                <p className="text-[#d9c2b3] text-sm mt-1">Review and manage property listings across the platform.</p>
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
                            placeholder="Search by title, owner, location..."
                            className="w-full bg-[#19120d] border border-[#534438]/50 rounded-xl pl-12 pr-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#19120d] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none w-full md:w-auto"
                    >
                        <option value="">All Statuses</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                        <option value="draft">Draft</option>
                    </select>
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
                                    <th className="px-6 py-4">Owner</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#534438]/20">
                                {filteredProperties.map((property) => (
                                    <tr key={property._id} className="hover:bg-[#302823]/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-[#534438]/30">
                                                    <Image
                                                        height={48}
                                                        width={48}
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
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-[#d9c2b3]">{property.host?.name || "—"}</div>
                                            <div className="text-[10px] text-[#534438]">{property.ownerEmail}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#d9c2b3]">{property.location}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-[#ffb77e]">
                                                ${property.price?.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-start gap-1">
                                                {getStatusBadge(property.status)}
                                                {/* Rejected feedback preview */}
                                                {property.status === "rejected" && property.feedback && (
                                                    <span className="text-[10px] text-red-400/70 max-w-[160px] truncate">
                                                        {property.feedback}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Approve — শুধু pending এ */}
                                                {property.status === "pending" && (
                                                    <button
                                                        onClick={() => handleApprove(property._id)}
                                                        disabled={approveLoadingId === property._id}
                                                        className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition-colors disabled:opacity-50"
                                                        title="Approve"
                                                    >
                                                        <Icon name="check" size={16} />
                                                    </button>
                                                )}
                                                {/* Reject — শুধু pending এ */}
                                                {property.status === "pending" && (
                                                    <button
                                                        onClick={() => openRejectModal(property)}
                                                        className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors"
                                                        title="Reject"
                                                    >
                                                        <Xmark size={16} />
                                                    </button>
                                                )}
                                                {/* Edit */}
                                                <button
                                                    onClick={() => openEditModal(property)}
                                                    className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] flex items-center justify-center hover:bg-[#64d6eb]/20 hover:text-[#64d6eb] transition-colors"
                                                    title="Edit"
                                                >
                                                    <PencilToSquare size={16} />
                                                </button>
                                                {/* Delete */}
                                                <button
                                                    onClick={() => setDeleteConfirmId(property._id)}
                                                    className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <SquareXmark size={16} />
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

            {/* ── Reject Modal ── */}
            {isRejectModalOpen && selectedProperty && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
                    <div className="bg-[#19120d] border border-red-500/30 rounded-3xl w-1/3  overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-[#534438]/20 flex justify-between items-center bg-[#211a15]">
                            <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                                <Icon name="warning" size={24} /> Reject Property
                            </h3>
                            <button
                                onClick={() => setIsRejectModalOpen(false)}
                                className="text-[#d9c2b3] hover:text-[#ffb77e] p-2 rounded-full hover:bg-[#302823] transition-colors"
                            >
                                <Icon name="close" size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-[#211a15] rounded-xl">
                                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                        height={40}
                                        width={40}
                                        src={selectedProperty.imageSrc || selectedProperty.images?.[0]}
                                        alt={selectedProperty.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-[#efe0d7]">{selectedProperty.title}</div>
                                    <div className="text-[10px] text-[#d9c2b3]">{selectedProperty.ownerEmail}</div>
                                </div>
                            </div>

                            {rejectError && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                                    {rejectError}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#d9c2b3]">
                                    Rejection Feedback <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    placeholder="e.g., The provided images are blurry. Please upload high-resolution images..."
                                    className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-red-400 transition-colors resize-none"
                                />
                            </div>

                            <div className="pt-2 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsRejectModalOpen(false)}
                                    className="px-6 py-2.5 bg-[#302823] text-[#efe0d7] rounded-xl font-bold hover:bg-[#534438]/50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReject}
                                    disabled={rejectLoading}
                                    className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
                                >
                                    {rejectLoading ? "Submitting..." : "Submit Rejection"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Confirm Modal ── */}
            {deleteConfirmId && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
                    <div className="bg-[#19120d] border border-red-500/30 rounded-3xl w-1/3  overflow-hidden shadow-2xl">
                        <div className="p-6 text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
                                <Icon name="delete" size={28} className="text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-[#efe0d7]">Delete Property?</h3>
                            <p className="text-[#d9c2b3] text-sm">This property will be permanently deleted.</p>
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
            {isEditModalOpen && editProperty && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#19120d] border border-[#534438]/30 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
                        <div className="p-6 border-b border-[#534438]/20 flex justify-between items-center bg-[#211a15]">
                            <h3 className="text-xl font-bold text-[#efe0d7] flex items-center gap-2">
                                <PencilToSquare size={24} className="text-[#ffb77e]" /> Edit Property
                            </h3>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-[#d9c2b3] hover:text-[#ffb77e] p-2 rounded-full hover:bg-[#302823] transition-colors"
                            >
                                <SquareXmark />
                            </button>
                        </div>

                        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto custom-scrollbar">
                            {editError && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                                    {editError}
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: "Property Title", name: "title", type: "text" },
                                    { label: "Location", name: "location", type: "text" },
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

                                {/* Admin শুধু status ও change করতে পারবে */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-[#d9c2b3]">Status</label>
                                    <select
                                        name="status"
                                        value={editForm.status}
                                        onChange={handleEditChange}
                                        className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none"
                                    >
                                        {["approved", "pending", "rejected", "draft"].map((s) => (
                                            <option key={s} value={s} className="capitalize">
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-[#534438]/20 bg-[#211a15]/50 flex-wrap gap-3">
                    <span className="text-xs text-[#d9c2b3]">
                        Showing {(currentPage - 1) * 10 + 1}–{Math.min(currentPage * 10, totalProperties)} of{" "}
                        {totalProperties} properties
                    </span>

                    <div className="flex items-center gap-1.5">
                        {/* Prev */}
                        <button
                            onClick={() => setCurrentPage((p) => p - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 px-3 h-8 rounded-lg border border-[#534438]/50 text-xs text-[#d9c2b3] hover:bg-[#302823] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            ← Prev
                        </button>

                        {/* Page numbers */}
                        {getPageNumbers(currentPage, totalPages).map((p, i) =>
                            p === "..." ? (
                                <span
                                    key={`dot-${i}`}
                                    className="w-8 h-8 flex items-center justify-center text-xs text-[#534438]"
                                >
                                    …
                                </span>
                            ) : (
                                <button
                                    key={p}
                                    onClick={() => setCurrentPage(p)}
                                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors border ${
                                        currentPage === p
                                            ? "bg-gradient-to-br from-[#C97B36] to-[#F4A261] text-white border-transparent"
                                            : "border-[#534438]/50 text-[#d9c2b3] hover:bg-[#302823]"
                                    }`}
                                >
                                    {p}
                                </button>
                            )
                        )}

                        {/* Next */}
                        <button
                            onClick={() => setCurrentPage((p) => p + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1 px-3 h-8 rounded-lg border border-[#534438]/50 text-xs text-[#d9c2b3] hover:bg-[#302823] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            Next →
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

