"use client"

import { useState } from "react"
// import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Icon from "@/components/Icon"

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState([
        {
            id: "PRP-101",
            name: "Celestial Heights Villa",
            location: "Palm Jumeirah, Dubai",
            owner: "Alexander Hunt",
            type: "Villa",
            price: "$5,000",
            status: "Approved",
            date: "Oct 12, 2026",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKbwOYKgGW6fz5B4Wh6j3RaPTVWNng8TkQbOQb7hyT85yNd4MAHOsf36Bk9-WguRNUHeLCzZ-0qSatOYuCpbmk4ou9B-3GEm7-QHX-xYKC7oyQOzAT7nnML4yjOtwCAGmn25gtpAQheOn2SEDmxLHp65HD5EC53fLYzOD-V_ahDLAG6DEVtj9iosJRP12ZGTUVjNn6Bt-rDyi-oBhwz7qi4L2rSErOTWWcS3w3mV0NSp6SnWrRNvAVHPQI0_w1WyE2RDBHD-NiS58"
        },
        {
            id: "PRP-102",
            name: "Azure Bay Villa",
            location: "Miami, FL",
            owner: "Sarah Jenkins",
            type: "Mansion",
            price: "$18,500",
            status: "Pending",
            date: "Nov 05, 2026",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPxA4Ln7tAUSX6hQzIkgHmqYNSpMnCYVyHNe2mnj2Ki7UpeYWrbs0rrJXdkKXlYfV18lrABNjJgXKKUbj0jSVw0E0JloSyiBMrCQQE5LtGZRmgt18BUUdMreAyoRpDPLF4LVylbcJtDgERT1KKBzTWhDyxNMo3dL9akEnKh_RvjBW0tm7Paa17AQT7tDOqHCgbGzcGjGLN6G06wwLOzVTv46hk6oc21MD0G4_xMJJfF31pLv9Nxn1GNecRyLaQrUrUVE-f-LW8Mc4"
        },
        {
            id: "PRP-103",
            name: "Lakeside Cabin",
            location: "Lake Tahoe, CA",
            owner: "Alexander Hunt",
            type: "Cabin",
            price: "$8,800",
            status: "Rejected",
            date: "Dec 20, 2026",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXBwJ-6EwPcYjGexq9gWyuAhdh5VDLBJxewEIletxToB-g734JKUGj2mVC4leTufiHMAkUpNS9p2YMv6NUL-jx__NvaKtueCwMGm_oolKaF03TwKWldRPl872aLYiT20zdJl7lV4-Kz_VItGQRwND0H9Wb0STTkCfyxSECF_1IA9xhnPv5vxGZ8hcPVhc2gfcI58v1uM-bmW9PPeKJzcnNOMwJS8-iEyOdBh1YCQLLQ_EC3JRc7huLW4gzC-pyxOkmeMcwRcbPTNc"
        }
    ])

    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState(null)

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editProperty, setEditProperty] = useState(null)

    const getStatusBadge = (status) => {
        switch (status) {
            case "Approved":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/20">
                        {status}
                    </span>
                )
            case "Pending":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">
                        {status}
                    </span>
                )
            case "Rejected":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/20">
                        {status}
                    </span>
                )
            default:
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-500/20 text-slate-400 border border-slate-500/20">
                        {status}
                    </span>
                )
        }
    }

    const openRejectModal = (property) => {
        setSelectedProperty(property)
        setIsRejectModalOpen(true)
    }

    const openEditModal = (property) => {
        setEditProperty(property)
        setIsEditModalOpen(true)
    }

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-[#efe0d7]">All Properties</h2>
                        <p className="text-[#d9c2b3] text-sm mt-1">
                            Review and manage property listings across the platform.
                        </p>
                    </div>
                </div>

                <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl overflow-hidden">
                    {/* Filters Area */}
                    <div className="p-6 border-b border-[#534438]/20 flex flex-col md:flex-row gap-4 items-center justify-between bg-[#211a15]/50">
                        <div className="relative w-full md:w-96">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d9c2b3]">
                                <Icon name="search" size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search properties or owners..."
                                className="w-full bg-[#19120d] border border-[#534438]/50 rounded-xl pl-12 pr-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                            />
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <select className="bg-[#19120d] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none flex-1 md:flex-none">
                                <option value="">All Statuses</option>
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

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
                                {properties.map((property) => (
                                    <tr key={property.id} className="hover:bg-[#302823]/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-[#534438]/30">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        alt={property.name}
                                                        src={property.image}
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-[#efe0d7]">
                                                        {property.name}
                                                    </div>
                                                    <div className="text-[10px] text-[#d9c2b3]">ID: {property.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#d9c2b3]">{property.owner}</td>
                                        <td className="px-6 py-4 text-sm text-[#d9c2b3]">{property.location}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#ffb77e]">{property.price}</td>
                                        <td className="px-6 py-4">{getStatusBadge(property.status)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {property.status === "Pending" && (
                                                    <>
                                                        <button
                                                            className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition-colors"
                                                            title="Approve"
                                                        >
                                                            <Icon name="check" size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => openRejectModal(property)}
                                                            className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors"
                                                            title="Reject"
                                                        >
                                                            <Icon name="close" size={16} />
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => openEditModal(property)}
                                                    className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] flex items-center justify-center hover:bg-[#64d6eb]/20 hover:text-[#64d6eb] transition-colors"
                                                    title="Update"
                                                >
                                                    <Icon name="edit" size={16} />
                                                </button>
                                                <button
                                                    className="w-8 h-8 rounded-lg bg-[#302823] text-[#d9c2b3] flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Icon name="delete" size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Reject Property Modal */}
                {isRejectModalOpen && selectedProperty && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-[#19120d] border border-red-500/30 rounded-3xl w-full max-w-md overflow-hidden animate-fade-in shadow-2xl">
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
                                <p className="text-[#efe0d7] text-sm">
                                    You are rejecting the property{" "}
                                    <strong className="text-white">{selectedProperty.name}</strong>. Please provide
                                    feedback for the owner so they can correct the issues.
                                </p>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#d9c2b3]">
                                        Rejection Feedback (Required)
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="e.g., The provided images are blurry. Please upload high-resolution images..."
                                        className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-red-400 transition-colors resize-none custom-scrollbar"
                                    ></textarea>
                                </div>
                                <div className="pt-4 flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsRejectModalOpen(false)}
                                        className="px-6 py-2.5 bg-[#302823] text-[#efe0d7] rounded-xl font-bold hover:bg-[#534438]/50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => setIsRejectModalOpen(false)}
                                        className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors"
                                    >
                                        Submit Rejection
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Property Modal (Similar to Owner's, but admin context) */}
                {isEditModalOpen && editProperty && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-[#19120d] border border-[#534438]/30 rounded-3xl w-full max-w-2xl overflow-hidden animate-fade-in shadow-2xl my-8">
                            <div className="p-6 border-b border-[#534438]/20 flex justify-between items-center bg-[#211a15]">
                                <h3 className="text-xl font-bold text-[#efe0d7] flex items-center gap-2">
                                    <Icon name="edit" size={24} className="text-[#ffb77e]" /> Edit Property Data
                                </h3>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="text-[#d9c2b3] hover:text-[#ffb77e] p-2 rounded-full hover:bg-[#302823] transition-colors"
                                >
                                    <Icon name="close" size={24} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#d9c2b3]">Property Name</label>
                                        <input
                                            type="text"
                                            defaultValue={editProperty.name}
                                            className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#d9c2b3]">Property Type</label>
                                        <select
                                            defaultValue={editProperty.type}
                                            className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none"
                                        >
                                            <option value="Villa">Villa</option>
                                            <option value="Mansion">Mansion</option>
                                            <option value="Cabin">Cabin</option>
                                            <option value="Apartment">Apartment</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#d9c2b3]">Location</label>
                                        <input
                                            type="text"
                                            defaultValue={editProperty.location}
                                            className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#d9c2b3]">Price (per month)</label>
                                        <input
                                            type="text"
                                            defaultValue={editProperty.price}
                                            className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-[#d9c2b3]">Status</label>
                                        <select
                                            defaultValue={editProperty.status}
                                            className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none"
                                        >
                                            <option value="Approved">Approved</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Rejected">Rejected</option>
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
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-2.5 bg-gradient-to-br from-[#C97B36] to-[#F4A261] text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(201,123,54,0.3)] transition-all"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

