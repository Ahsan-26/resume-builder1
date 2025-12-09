"use client";

import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";

export default function DashboardHeader() {
    const { user } = useAuth();
    const t = useTranslations("dashboard");

    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t("welcome", { name: user?.first_name || user?.email?.split("@")[0] || "User" })}
            </h1>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <span className="text-lg">⚡</span> Upgrade Now
            </button>
        </div>
    );
}
