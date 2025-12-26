"use client";

import { useTranslations } from "next-intl";
import type { AccountSettings as AccountSettingsType } from "@/types/profile";

interface AccountSettingsProps {
    settings: AccountSettingsType;
    onChange: (settings: AccountSettingsType) => void;
    userEmail: string;
}

export default function AccountSettings({ settings, onChange, userEmail }: AccountSettingsProps) {
    const t = useTranslations("profile");

    const handleToggle = (field: keyof AccountSettingsType) => {
        onChange({ ...settings, [field]: !settings[field] });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Email Settings */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-xl font-bold text-[var(--color-brand-primary)] mb-6 heading-font">
                    {t("accountEmail")}
                </h2>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("emailAddress")}
                    </label>
                    <input
                        type="email"
                        value={userEmail}
                        disabled
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed transition-all duration-200 outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Email cannot be changed. Contact support if you need to update it.
                    </p>
                </div>
            </div>

            {/* Password Settings */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-xl font-bold text-[var(--color-brand-primary)] mb-6 heading-font">
                    {t("password")}
                </h2>

                <button className="px-6 py-2.5 bg-[var(--color-brand-primary)] text-white rounded-lg hover:bg-[var(--color-brand-hover)] transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    {t("changePassword")}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                    Password change functionality will be available in a future update.
                </p>
            </div>

            {/* Notification Settings */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-xl font-bold text-[var(--color-brand-primary)] mb-6 heading-font">
                    {t("notifications")}
                </h2>

                <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition-all duration-200">
                        <input
                            type="checkbox"
                            checked={settings.marketing_emails}
                            onChange={() => handleToggle("marketing_emails")}
                            className="w-5 h-5 text-[var(--color-brand-primary)] border-gray-300 rounded focus:ring-[var(--color-brand-primary)] cursor-pointer"
                        />
                        <div className="flex-1">
                            <span className="block text-sm font-medium text-gray-900">
                                {t("marketingEmails")}
                            </span>
                            <span className="block text-xs text-gray-500 mt-1">
                                Receive promotional emails about new features and offers
                            </span>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition-all duration-200">
                        <input
                            type="checkbox"
                            checked={settings.product_updates}
                            onChange={() => handleToggle("product_updates")}
                            className="w-5 h-5 text-[var(--color-brand-primary)] border-gray-300 rounded focus:ring-[var(--color-brand-primary)] cursor-pointer"
                        />
                        <div className="flex-1">
                            <span className="block text-sm font-medium text-gray-900">
                                {t("productUpdates")}
                            </span>
                            <span className="block text-xs text-gray-500 mt-1">
                                Receive updates about product improvements and new features
                            </span>
                        </div>
                    </label>
                </div>

                {/* Info about localStorage storage */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Notification preferences are currently stored locally on your device.
                        They will be synced to your account in a future update.
                    </p>
                </div>
            </div>
        </div>
    );
}
