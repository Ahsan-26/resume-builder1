"use client";

import { useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ResumeProfile from "@/components/profile/ResumeProfile";
import JobPreferences from "@/components/profile/JobPreferences";
import AccountSettings from "@/components/profile/AccountSettings";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<"profile" | "account">("profile");
    const t = useTranslations("profile");

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <ProfileHeader activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === "profile" ? (
                    <div className="space-y-8 animate-fadeInUp">
                        <ResumeProfile />
                        <JobPreferences />

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button className="px-8 py-3 bg-[var(--color-brand-primary)] text-white rounded-lg hover:bg-[var(--color-brand-hover)] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base">
                                {t("saveChanges")}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fadeInUp">
                        <AccountSettings />
                    </div>
                )}
            </div>
        </div>
    );
}
