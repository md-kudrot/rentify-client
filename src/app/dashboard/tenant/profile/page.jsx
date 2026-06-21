"use client"
import { useState } from "react"
import Icon from "@/components/Icon"
import { authClient } from "@/lib/auth-client"
import Image from "next/image"

export default function ProfilePage() {
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

    const user = session?.user

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const image = e.target.image.value

        await authClient.updateUser({
            name,
            image
        })

        await refetch()
        setIsModalOpen(false)
    }

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-[#efe0d7]">Profile Details</h2>
                        <p className="text-[#d9c2b3] text-sm mt-1">Manage your personal information and preferences.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-br from-[#C97B36] to-[#F4A261] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-[0_0_25px_rgba(201,123,54,0.25)] transition-all flex items-center gap-2"
                    >
                        <Icon name="edit" size={18} /> Edit Profile
                    </button>
                </div>

                <section className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl overflow-hidden p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-32 h-32 rounded-full border-4 border-[#302823] overflow-hidden bg-[#211a15] relative group cursor-pointer">
                                <Image
                                    height={128}
                                    width={128}
                                    src={user?.image || "/default-avatar.png"}
                                    alt={user?.name || "User Avatar"}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Icon name="photo_camera" size={24} className="text-white" />
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#cd7e39]/20 text-[#ffb77e] border border-[#cd7e39]/20 uppercase tracking-wider">
                                    {user?.role || "Tenant"} Account
                                </span>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 w-full space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs text-[#d9c2b3] uppercase tracking-wider font-bold mb-1 block">
                                        Full Name
                                    </label>
                                    <p className="text-lg text-[#efe0d7] font-medium">{user?.name}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-[#d9c2b3] uppercase tracking-wider font-bold mb-1 block">
                                        Email Address
                                    </label>
                                    <p className="text-lg text-[#efe0d7] font-medium">{user?.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-[#d9c2b3] uppercase tracking-wider font-bold mb-1 block">
                                        Email Verified
                                    </label>
                                    <p className="text-lg text-[#efe0d7] font-medium">
                                        {user?.emailVerified ? "Yes" : "No"}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs text-[#d9c2b3] uppercase tracking-wider font-bold mb-1 block">
                                        Created At
                                    </label>
                                    <p className="text-lg text-[#efe0d7] font-medium">
                                        {user?.createdAt &&
                                            new Date(user.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-[#19120d] border border-[#534438]/30 rounded-3xl w-full max-w-2xl overflow-hidden animate-fade-in shadow-2xl">
                            <div className="p-6 border-b border-[#534438]/20 flex justify-between items-center bg-[#211a15]">
                                <h3 className="text-xl font-bold text-[#efe0d7]">Edit Profile</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-[#d9c2b3] hover:text-[#ffb77e] p-2 rounded-full hover:bg-[#302823] transition-colors"
                                >
                                    <Icon name="close" size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#d9c2b3]">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={user?.name}
                                            className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#d9c2b3]">Update Image URL</label>
                                        <input
                                            type="text"
                                            name="image"
                                            defaultValue={user?.image}
                                            className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-3 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-3 border-t border-[#534438]/20">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-[#d9c2b3] hover:bg-[#302823] transition-colors border border-transparent"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-br from-[#C97B36] to-[#F4A261] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-[0_0_25px_rgba(201,123,54,0.25)] transition-all"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

