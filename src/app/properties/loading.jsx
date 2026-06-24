export default function Loading() {
    return (
        <div className="bg-[#0B1120] text-white min-h-screen pt-20 overflow-x-hidden">
            <main className="pt-24 pb-20 px-6 max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-6">
                {/* Sidebar Skeleton */}
                <aside className="hidden lg:block w-72 shrink-0">
                    <div className="sticky top-24 space-y-6 animate-pulse">
                        <div className="h-6 w-20 bg-[#ffffff10] rounded-lg" />
                        <div className="h-8 w-32 bg-[#ffffff10] rounded-lg" />
                        <div className="h-10 w-full bg-[#ffffff10] rounded-xl" />
                        <div className="flex flex-wrap gap-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-8 w-20 bg-[#ffffff10] rounded-full" />
                            ))}
                        </div>
                        <div className="h-10 w-full bg-[#ffffff10] rounded-xl" />
                        <div className="h-12 w-full bg-[#ffffff15] rounded-xl mt-10" />
                    </div>
                </aside>

                {/* Main Content Skeleton */}
                <div className="flex-1 space-y-6">
                    {/* Header */}
                    <div className="animate-pulse space-y-2">
                        <div className="h-9 w-56 bg-[#ffffff10] rounded-lg" />
                        <div className="h-5 w-72 bg-[#ffffff08] rounded-lg" />
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {[...Array(9)].map((_, i) => (
                            <CardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

function CardSkeleton() {
    return (
        <div className="animate-pulse bg-[#ffffff06] border border-[#534438]/20 rounded-2xl overflow-hidden">
            {/* Image placeholder */}
            <div className="h-52 bg-[#ffffff10]" />
            {/* Content */}
            <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 bg-[#ffffff10] rounded-md" />
                <div className="h-4 w-1/2 bg-[#ffffff08] rounded-md" />
                <div className="flex justify-between items-center pt-2">
                    <div className="h-6 w-24 bg-[#ffffff10] rounded-md" />
                    <div className="h-8 w-20 bg-[#ffffff10] rounded-xl" />
                </div>
            </div>
        </div>
    )
}
