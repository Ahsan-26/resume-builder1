"use client";

import { useTranslations } from "next-intl";

interface ProfileHeaderProps {
    activeTab: "profile" | "account";
    onTabChange: (tab: "profile" | "account") => void;
}

export default function ProfileHeader({ activeTab, onTabChange }: ProfileHeaderProps) {
    const t = useTranslations("profile");

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6">
                    <h1 className="text-3xl font-bold text-[var(--color-brand-primary)] heading-font">
                        {t("pageTitle")}
                    </h1>
                </div>

                <div className="flex gap-8 -mb-px">
                    <button
                        onClick={() => onTabChange("profile")}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "profile"
                                ? "border-[var(--color-brand-primary)] text-[var(--color-brand-primary)]"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        {t("profileTab")}
                    </button>
                    <button
                        onClick={() => onTabChange("account")}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "account"
                                ? "border-[var(--color-brand-primary)] text-[var(--color-brand-primary)]"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        {t("accountTab")}
                    </button>
                </div>
            </div>
        </div>
    );
}
