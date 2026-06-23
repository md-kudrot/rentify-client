"use client"

// import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Icon from "@/components/Icon"

export default function OwnerProfilePage() {
    return (
        <>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-[#efe0d7]">Owner Profile</h2>
                    <p className="text-[#d9c2b3] text-sm mt-1">
                        Manage your professional identity and business information.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Profile Card & Business Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Header Card */}
                        <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-8 flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#ffb77e]/20 mb-4 relative group">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1Wh8d2SI_AXllKIdoqLHBvzUPoX-azJP9MgI6QptWE3PTeAG3KAVT2-z6psWKvea7NCG6No20x1pprNBPab3PTypX7TcScmvD4uWSb9-i2o9fPLheIIVwceypdpVQC52cBwdN-t7P2ZFeZKEfn5a_-mGBO9cGXrGTRtoU9yglPThpHikJ9PPlr-eAKHpybtAyTZ8axzCEGVVwnEoyv38PUdJok_ESL8oQXSzxX6M6_eFGoCy5m8XQPw_YxJzLHalsyEkQJ0aOxOE"
                                    alt="Owner"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Icon name="photo_camera" size={24} className="text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-[#efe0d7]">Alexander Hunt</h3>
                            <p className="text-[#d9c2b3] mb-4">alexander.hunt@rentora.com</p>

                            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-bold border border-green-500/20 mb-6">
                                <Icon name="verified" size={18} /> Identity Verified
                            </div>

                            <button className="w-full bg-[#302823] border border-[#534438]/50 text-[#efe0d7] py-2.5 rounded-xl font-bold hover:bg-[#534438]/50 transition-colors">
                                Edit Profile
                            </button>
                        </div>

                        {/* Business Information Card */}
                        <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6">
                            <h4 className="font-bold text-lg text-[#efe0d7] mb-4 flex items-center gap-2">
                                <Icon name="business" className="text-[#ffb77e]" size={20} /> Business Info
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-[#d9c2b3] uppercase tracking-wider font-bold">Company</p>
                                    <p className="text-[#efe0d7] font-medium">Hunt Luxury Estates LLC</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[#d9c2b3] uppercase tracking-wider font-bold">Phone</p>
                                    <p className="text-[#efe0d7] font-medium">+1 (555) 987-6543</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[#d9c2b3] uppercase tracking-wider font-bold">Address</p>
                                    <p className="text-[#efe0d7] font-medium">100 Park Avenue, NY 10017</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[#d9c2b3] uppercase tracking-wider font-bold">
                                        Tax ID / VAT
                                    </p>
                                    <p className="text-[#efe0d7] font-medium">US-987654321</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Stats & Timeline */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Statistics Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 flex flex-col justify-center">
                                <div className="w-10 h-10 rounded-xl bg-[#ffb77e]/10 text-[#ffb77e] flex items-center justify-center mb-3">
                                    <Icon name="domain" size={20} />
                                </div>
                                <h3 className="text-3xl font-bold text-[#efe0d7]">18</h3>
                                <p className="text-sm text-[#d9c2b3] font-bold">Total Properties</p>
                            </div>
                            <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 flex flex-col justify-center">
                                <div className="w-10 h-10 rounded-xl bg-[#64d6eb]/10 text-[#64d6eb] flex items-center justify-center mb-3">
                                    <Icon name="payments" size={20} />
                                </div>
                                <h3 className="text-3xl font-bold text-[#efe0d7]">$1.4M</h3>
                                <p className="text-sm text-[#d9c2b3] font-bold">Lifetime Earnings</p>
                            </div>
                            <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6 flex flex-col justify-center">
                                <div className="w-10 h-10 rounded-xl bg-[#bec6e0]/10 text-[#bec6e0] flex items-center justify-center mb-3">
                                    <Icon name="event_available" size={20} />
                                </div>
                                <h3 className="text-3xl font-bold text-[#efe0d7]">342</h3>
                                <p className="text-sm text-[#d9c2b3] font-bold">Total Bookings</p>
                            </div>
                        </div>

                        {/* Account Information */}
                        <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="font-bold text-lg text-[#efe0d7] flex items-center gap-2">
                                    <Icon name="manage_accounts" className="text-[#ffb77e]" size={20} /> Account Details
                                </h4>
                                <button className="text-[#ffb77e] text-sm font-bold hover:underline">Edit</button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs text-[#d9c2b3] uppercase tracking-wider font-bold block mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value="Alexander"
                                        className="w-full bg-[#19120d] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-[#d9c2b3] uppercase tracking-wider font-bold block mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value="Hunt"
                                        className="w-full bg-[#19120d] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-xs text-[#d9c2b3] uppercase tracking-wider font-bold block mb-1">
                                        Owner Bio
                                    </label>
                                    <textarea
                                        readOnly
                                        rows="3"
                                        className="w-full bg-[#19120d] border border-[#534438]/50 rounded-xl px-4 py-2.5 text-[#efe0d7] focus:outline-none resize-none custom-scrollbar"
                                        value="Premium luxury estate owner managing high-end waterfront and downtown properties globally. Committed to exceptional guest experiences."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Timeline */}
                        <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-3xl p-6">
                            <h4 className="font-bold text-lg text-[#efe0d7] mb-6 flex items-center gap-2">
                                <Icon name="history" className="text-[#ffb77e]" size={20} /> Recent Activity
                            </h4>

                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#534438]/50 before:to-transparent">
                                {/* Item 1 */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#19120d] bg-[#ffb77e]/20 text-[#ffb77e] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                        <Icon name="add_circle" size={16} />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#211a15] p-4 rounded-xl border border-[#534438]/30 shadow">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-[#efe0d7] text-sm">New Property Added</div>
                                            <time className="text-[10px] text-[#d9c2b3]">Today</time>
                                        </div>
                                        <div className="text-xs text-[#d9c2b3]">
                                            You added "Celestial Heights Villa" to your portfolio.
                                        </div>
                                    </div>
                                </div>

                                {/* Item 2 */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#19120d] bg-green-500/20 text-green-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                        <Icon name="check_circle" size={16} />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#211a15] p-4 rounded-xl border border-[#534438]/30 shadow">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-[#efe0d7] text-sm">Booking Approved</div>
                                            <time className="text-[10px] text-[#d9c2b3]">Yesterday</time>
                                        </div>
                                        <div className="text-xs text-[#d9c2b3]">
                                            Approved Marcus Sterling for Azure Bay Villa.
                                        </div>
                                    </div>
                                </div>

                                {/* Item 3 */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#19120d] bg-[#64d6eb]/20 text-[#64d6eb] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                        <Icon name="payments" size={16} />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#211a15] p-4 rounded-xl border border-[#534438]/30 shadow">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-[#efe0d7] text-sm">Payout Received</div>
                                            <time className="text-[10px] text-[#d9c2b3]">Oct 15</time>
                                        </div>
                                        <div className="text-xs text-[#d9c2b3]">
                                            $24,200 transferred to your bank account ending in 4921.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

