"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    FileText,
    Mail,
    Users,
    CreditCard,
    Settings,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming a utils file exists, otherwise I'll inline or check

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Resumes",
        href: "/admin/resumes",
        icon: FileText,
    },
    {
        title: "Cover Letters",
        href: "/admin/cover-letters",
        icon: Mail,
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users,
    },
    {
        title: "Pricing",
        href: "/admin/pricing",
        icon: CreditCard,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];


export default function AdminSidebar() {
    const { logout } = useAuth();
    const router = useRouter();
    const handleLogout = async () => {
        await logout();
        router.push("/auth/login");
    };
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-[#00004d] text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-50">
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold tracking-wider text-[#FFF4BC]">
                    Admin<span className="text-white">Panel</span>
                </h1>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {sidebarItems.map((item) => {
                    // Simple active check: exact match or starts with href + "/"
                    // But for /admin, we want exact match usually, or handle sub-routes carefully.
                    // For now, let's do a simple includes check for sub-routes, but strict for root.
                    const isActive = item.href === "/admin"
                        ? pathname === "/admin" || pathname?.endsWith("/admin")
                        : pathname?.includes(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-[#FFF4BC] text-[#00004d] font-semibold shadow-md"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-[#00004d]" : "text-gray-400 group-hover:text-white")} />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
                >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">logout</span>
                </button>
            </div>
        </aside>
    );
}
