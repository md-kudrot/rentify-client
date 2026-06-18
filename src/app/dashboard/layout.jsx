import { DashBoardSidebar } from "../../components/dashBoard/DashBoardSidebar"

export default function DashboardLayout({ children }) {
    return (
        <div className="h-screen w-full relative flex flex-col md:flex-row">
            <div className="absolute md:relative z-30 h-full md:h-auto">
                <DashBoardSidebar />
            </div>

            <main className="flex-1 ml-0  p-4 overflow-y-auto">{children}</main>
        </div>
    )
}
