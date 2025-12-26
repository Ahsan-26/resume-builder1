"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ResumeProfile from "@/components/profile/ResumeProfile";
import JobPreferences from "@/components/profile/JobPreferences";
import AccountSettings from "@/components/profile/AccountSettings";
import Toast from "@/components/ui/Toast";
import {
    fetchUserProfile,
    updateUserProfile,
    loadJobPreferences,
    saveJobPreferences,
    loadAccountSettings,
    saveAccountSettings,
} from "@/lib/api/profile";
import type {
    UserProfile,
    JobPreferences as JobPreferencesType,
    AccountSettings as AccountSettingsType,
} from "@/types/profile";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<"profile" | "account">("profile");
    const t = useTranslations("profile");

    // State management
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [jobPreferences, setJobPreferences] = useState<JobPreferencesType>({
        employment_types: [],
    });
    const [accountSettings, setAccountSettings] = useState<AccountSettingsType>({
        marketing_emails: false,
        product_updates: true,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    // Load profile data on mount
    useEffect(() => {
        loadProfileData();
    }, []);

    async function loadProfileData() {
        try {
            setLoading(true);
            setError(null);

            // Fetch user profile from backend
            const profile = await fetchUserProfile();
            setUserProfile(profile);

            // Load job preferences from localStorage
            const preferences = loadJobPreferences();
            setJobPreferences(preferences);

            // Load account settings from localStorage
            const settings = loadAccountSettings();
            setAccountSettings(settings);
        } catch (err) {
            console.error("Failed to load profile:", err);
            setError(err instanceof Error ? err.message : t("loadingError"));
        } finally {
            setLoading(false);
        }
    }

    // Handle profile save
    async function handleSaveProfile() {
        if (!userProfile) return;

        try {
            setSaving(true);
            setError(null);

            // Update user profile on backend
            const updated = await updateUserProfile({
                first_name: userProfile.first_name,
                last_name: userProfile.last_name,
                avatar_url: userProfile.avatar_url,
            });

            setUserProfile(updated);

            // Save job preferences to localStorage
            saveJobPreferences(jobPreferences);

            // Show success toast
            setToast({ message: t("updateSuccess"), type: "success" });
        } catch (err) {
            console.error("Failed to save profile:", err);
            setToast({
                message: err instanceof Error ? err.message : t("updateError"),
                type: "error",
            });
        } finally {
            setSaving(false);
        }
    }

    // Handle account settings save
    async function handleSaveAccountSettings() {
        try {
            setSaving(true);
            setError(null);

            // Save account settings to localStorage
            saveAccountSettings(accountSettings);

            // Show success toast
            setToast({ message: t("settingsSaved"), type: "success" });
        } catch (err) {
            console.error("Failed to save settings:", err);
            setToast({
                message: err instanceof Error ? err.message : t("updateError"),
                type: "error",
            });
        } finally {
            setSaving(false);
        }
    }

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <ProfileHeader activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-brand-primary)]"></div>
                            <p className="mt-4 text-gray-600">{t("loading")}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error && !userProfile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <ProfileHeader activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="text-red-500 text-lg font-medium mb-4">{error}</div>
                            <button
                                onClick={loadProfileData}
                                className="px-6 py-2 bg-[var(--color-brand-primary)] text-white rounded-lg hover:bg-[var(--color-brand-hover)] transition-all duration-300"
                            >
                                {t("retry")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <ProfileHeader activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === "profile" ? (
                    <div className="space-y-8 animate-fadeInUp">
                        <ResumeProfile
                            profile={userProfile}
                            onChange={setUserProfile}
                        />
                        <JobPreferences
                            preferences={jobPreferences}
                            onChange={setJobPreferences}
                        />

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="px-8 py-3 bg-[var(--color-brand-primary)] text-white rounded-lg hover:bg-[var(--color-brand-hover)] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {saving ? t("saving") : t("saveChanges")}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fadeInUp">
                        <AccountSettings
                            settings={accountSettings}
                            onChange={setAccountSettings}
                            userEmail={userProfile?.email || ""}
                        />

                        {/* Save Button */}
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleSaveAccountSettings}
                                disabled={saving}
                                className="px-8 py-3 bg-[var(--color-brand-primary)] text-white rounded-lg hover:bg-[var(--color-brand-hover)] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {saving ? t("saving") : t("saveChanges")}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Toast Notifications */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
