"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FileText, File, User, LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const t = useTranslations("dashboard.sidebar");
    const pathname = usePathname();
    const { logout } = useAuth();
    const router = useRouter();

    const menuItems = [
        { name: t("resumes"), icon: FileText, href: "/dashboard/resumes" },
        { name: t("coverLetters"), icon: File, href: "/dashboard/cover-letters" },
        { name: "Templates", icon: File, href: "/dashboard/templates" }, // TODO: Add translation
        { name: t("myAccount"), icon: User, href: "/profile" },
    ];

    const handleLogout = async () => {
        await logout();
        router.push("/auth/login");
    };

    const sidebarContent = (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 lg:hidden">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Menu</span>
                <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-2 py-6">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? "bg-[#00004d]/5 dark:bg-[#FFF4BC]/10 text-[#00004d] dark:text-[#FFF4BC]"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 w-1.5 h-8 bg-[#00004d] dark:bg-[#FFF4BC] rounded-r-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                            )}
                            <item.icon className={`w-5 h-5 ${isActive ? "text-[#00004d] dark:text-[#FFF4BC]" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"}`} />
                            <span className={`font-bold ${isActive ? "text-[#00004d] dark:text-[#FFF4BC]" : ""}`}>{item.name}</span>
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
                    <span className="font-medium">{t("logout")}</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col fixed inset-y-0 z-30">
                {sidebarContent}
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 z-50 lg:hidden shadow-xl"
                        >
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
