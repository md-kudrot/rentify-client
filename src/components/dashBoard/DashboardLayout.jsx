"use client";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout({ children, role = "owner" }) {
  return (
    <div className="h-screen w-full relative flex flex-col md:flex-row bg-background font-body-md overflow-x-hidden">
        <div className="absolute md:relative z-30 h-full md:h-auto">
            <DashboardSidebar role={role} />
        </div>

      <main className="flex-1 ml-0 p-4 lg:p-lg overflow-y-auto min-h-screen relative pt-20 md:pt-4">
        {/* We add extra top padding on mobile (pt-20) to account for the fixed menu button */}
        <DashboardHeader role={role} />
        
        <div className="max-w-container-max mx-auto space-y-xl mt-4">
          {children}
        </div>

        <footer className="mt-xxl border-t border-outline-variant/10 bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-lg py-md text-center">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
              © {new Date().getFullYear()} Rentora Luxury Estates. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
