"use client"

import { useState, useEffect } from "react"
import Icon from "@/components/Icon"
import { authClient } from "@/lib/auth-client"

export default function AdminUsersPage() {
    const { data: session } = authClient.useSession()
    const token = session?.session?.token

    // ── State ────────────────────────────────────────────────
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // ── Filter State ─────────────────────────────────────────
    const [searchQuery, setSearchQuery] = useState("")
    const [roleFilter, setRoleFilter] = useState("")

    // ── Modal State ──────────────────────────────────────────
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [newRole, setNewRole] = useState("")
    const [roleUpdateLoading, setRoleUpdateLoading] = useState(false)
    const [roleUpdateError, setRoleUpdateError] = useState("")

    // ── Fetch Users ──────────────────────────────────────────
    const fetchUsers = async () => {
        if (!token) return
        setLoading(true)
        setError("")
        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
                headers: { Authorization: `Bearer ${tokenData?.token}` }
            })
            if (!res.ok) throw new Error("Failed to fetch users")
            const data = await res.json()
            setUsers(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [token])

    // ── Filter Logic ─────────────────────────────────────────
    const filteredUsers = users.filter((u) => {
        const matchSearch =
            u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchRole = roleFilter ? u.role === roleFilter : true
        return matchSearch && matchRole
    })

    // ── Open Modal ───────────────────────────────────────────
    const openRoleModal = (user) => {
        setSelectedUser(user)
        setNewRole(user.role || "Tenant")
        setRoleUpdateError("")
        setIsRoleModalOpen(true)
    }

    // ── Change Role ──────────────────────────────────────────
    const handleRoleUpdate = async () => {
        if (!selectedUser || !newRole) return
        setRoleUpdateLoading(true)
        setRoleUpdateError("")
        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${selectedUser._id}/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify({ role: newRole })
            })
            if (!res.ok) throw new Error("Role update failed")

            //  Local state update — refetch ছাড়াই UI update
            setUsers((prev) => prev.map((u) => (u._id === selectedUser._id ? { ...u, role: newRole } : u)))
            setIsRoleModalOpen(false)
        } catch (err) {
            setRoleUpdateError(err.message)
        } finally {
            setRoleUpdateLoading(false)
        }
    }

    // ── Badges ───────────────────────────────────────────────
    const getRoleBadge = (role) => {
        const map = {
            admin: "bg-purple-500/20 text-purple-400 border-purple-500/20",
            owner: "bg-blue-500/20 text-blue-400 border-blue-500/20",
            tenant: "bg-green-500/20 text-green-400 border-green-500/20"
        }
        const key = role?.toLowerCase()
        return (
            <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold border capitalize ${map[key] || "bg-slate-500/20 text-slate-400 border-slate-500/20"}`}
            >
                {role}
            </span>
        )
    }

    // ── Render ───────────────────────────────────────────────
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-[#efe0d7]">All Users</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">Manage user accounts and roles across the platform.</p>
                </div>
                {/* Total count */}
                <div className="px-4 py-2 bg-[#211a15] border border-[#534438]/50 rounded-xl text-sm text-[#d9c2b3]">
                    Total: <span className="text-[#ffb77e] font-bold">{users.length}</span> users
                </div>
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
                            placeholder="Search by name or email..."
                            className="w-full bg-[#19120d] border border-[#534438]/50 rounded-xl pl-12 pr-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors"
                        />
                    </div>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="bg-[#19120d] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none w-full md:w-auto"
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="owner">Owner</option>
                        <option value="tenant">Tenant</option>
                    </select>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="p-12 text-center text-[#d9c2b3]">Loading users...</div>
                ) : error ? (
                    <div className="p-12 text-center text-red-400">{error}</div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-12 text-center text-[#d9c2b3]">No users found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-[#211a15] text-[10px] uppercase tracking-widest text-[#d9c2b3] font-bold">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Joined Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#534438]/20">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-[#302823]/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#302823] flex items-center justify-center text-[#ffb77e] font-bold flex-shrink-0">
                                                    {user.image && user.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-[#efe0d7]">{user.name}</div>
                                                    <div className="text-[10px] text-[#d9c2b3]">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                                        <td className="px-6 py-4 text-sm text-[#d9c2b3]">
                                            {user.createdAt
                                                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                                                      month: "short",
                                                      day: "numeric",
                                                      year: "numeric"
                                                  })
                                                : "—"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => openRoleModal(user)}
                                                className="px-4 py-1.5 rounded-lg bg-[#302823] text-[#d9c2b3] text-xs font-bold hover:bg-[#ffb77e]/20 hover:text-[#ffb77e] transition-colors"
                                            >
                                                Change Role
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {/* ── Change Role Modal ── */}
            {isRoleModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
                    <div className="bg-[#19120d] border border-[#534438]/30 rounded-3xl w-1/3  overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-[#534438]/20 flex justify-between items-center bg-[#211a15]">
                            <h3 className="text-xl font-bold text-[#efe0d7] flex items-center gap-2">
                                <Icon name="manage_accounts" size={24} className="text-[#ffb77e]" />
                                Change User Role
                            </h3>
                            <button
                                onClick={() => setIsRoleModalOpen(false)}
                                className="text-[#d9c2b3] hover:text-[#ffb77e] p-2 rounded-full hover:bg-[#302823] transition-colors"
                            >
                                <Icon name="close" size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* User Info */}
                            <div className="flex items-center gap-4 p-4 bg-[#211a15] rounded-2xl">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#302823] flex items-center justify-center text-[#ffb77e] font-bold flex-shrink-0">
                                    {selectedUser.image && selectedUser.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="font-bold text-[#efe0d7]">{selectedUser.name}</div>
                                    <div className="text-xs text-[#d9c2b3]">{selectedUser.email}</div>
                                    <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                                </div>
                            </div>

                            {roleUpdateError && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                                    {roleUpdateError}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#d9c2b3]">Select New Role</label>
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className="w-full bg-[#211a15] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none focus:border-[#ffb77e] transition-colors appearance-none"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="owner">Owner</option>
                                    <option value="tenant">Tenant</option>
                                </select>
                            </div>

                            <div className="pt-2 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsRoleModalOpen(false)}
                                    className="px-6 py-2.5 bg-[#302823] text-[#efe0d7] rounded-xl font-bold hover:bg-[#534438]/50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRoleUpdate}
                                    disabled={roleUpdateLoading || newRole === selectedUser.role}
                                    className="px-6 py-2.5 bg-gradient-to-br from-[#C97B36] to-[#F4A261] text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(201,123,54,0.3)] transition-all disabled:opacity-50"
                                >
                                    {roleUpdateLoading ? "Updating..." : "Update Role"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

