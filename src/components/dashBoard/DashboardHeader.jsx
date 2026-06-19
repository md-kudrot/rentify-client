// import Icon from "../Icon";

export default function DashboardHeader({ role }) {
    const titles = {
        owner: "Owner Dashboard",
        tenant: "Tenant Dashboard",
        admin: "Admin Dashboard"
    }

    return (
        <header className="h-16 sticky top-0 bg-surface/80 backdrop-blur-xl z-50 border-b border-outline-variant/10 px-lg flex items-center justify-between">
            <div className="flex items-center gap-md">
                <button className="lg:hidden text-primary">{/* <Icon name="menu" size={24} /> */}</button>
                <h1 className="font-headline-md text-on-surface hidden md:block">{titles[role] || "Dashboard"}</h1>
            </div>
            <div className="flex items-center gap-lg">
                <div className="relative hidden sm:block">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        {/* <Icon name="search" size={18} /> */}
                    </div>
                    <input
                        className="bg-surface-container-low border border-outline-variant/20 rounded-full pl-10 pr-4 py-2 text-sm focus:border-primary outline-none transition-all w-64"
                        placeholder="Search data..."
                        type="text"
                    />
                </div>
                <div className="flex items-center gap-md">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all">
                        {/* <Icon name="notifications" size={24} /> */}
                    </button>
                    <div className="w-10 h-10 rounded-full copper-gradient p-[2px]">
                        <div className="w-full h-full rounded-full bg-surface-container overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                alt="User Avatar"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADGQ3gmdPStVwLldv7oCz6pQKsHjQPdQwv73Np7PmadDJtcQVWMFNfOmCMZRqlq3MMftmDVpYaV9WKUKWtkGlrZuXIK6obTn9Zn3Tfc1uUmA1x08BUtp8igmI1v1ThfKu_v_anVclVt2YkWsX9bhUfOMwpHZjhN1d2ZEfUrVSQhp4tznFuAhp9nZRn9TrT39bRAUaFwjJ91BaQyWqx-Ca5GeRZdjPI_LLq2BVYOeP3ZECsXM73XB2v82xWUh48BVSN1bAhNG18CVU"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

