"use client";

import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";

export default function DashboardHeader() {
    const { user } = useAuth();
    const t = useTranslations("dashboard");

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-[#00004d] to-[#192bc2] p-8 rounded-3xl shadow-2xl text-white overflow-hidden relative">
            <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
                    {t("welcome", { name: user?.first_name || user?.email?.split("@")[0] || "User" })}
                </h1>
                <p className="text-blue-100 text-lg font-medium opacity-90">
                    Ready to build your next career-defining resume?
                </p>
            </div>
            <button className="relative z-10 bg-[#FFF4BC] hover:bg-[#ffe880] text-[#00004d] px-8 py-3 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-xl shadow-black/20">
                <span className="text-xl">⚡</span> Upgrade to Pro
            </button>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full -ml-16 -mb-16 blur-2xl" />
        </div>
    );
}
