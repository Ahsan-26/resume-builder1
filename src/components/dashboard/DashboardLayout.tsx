"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Hide sidebar on resume editor page
    const isResumeEditor = pathname?.includes('/resumes/') && pathname?.includes('/edit');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {!isResumeEditor && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}

            <div className={`${!isResumeEditor ? 'lg:pl-64' : ''} flex flex-col min-h-screen transition-all duration-300`}>
                {/* Mobile Header - Only show when not in editor */}
                {!isResumeEditor && (
                    <header className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className="font-bold text-lg text-gray-900 dark:text-white">SkyResume</span>
                        <div className="w-8" /> {/* Spacer for centering if needed */}
                    </header>
                )}

                <main className={`flex-1 ${!isResumeEditor ? 'p-4 lg:p-8' : ''}`}>
                    {!isResumeEditor ? (
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    ) : (
                        children
                    )}
                </main>
            </div>
        </div>
    );
}
