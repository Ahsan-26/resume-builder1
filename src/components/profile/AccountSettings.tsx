"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AccountSettings() {
    const t = useTranslations("profile");
    const [marketingEmails, setMarketingEmails] = useState(false);
    const [productUpdates, setProductUpdates] = useState(true);

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
                        placeholder="ahsan7habib@gmail.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
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
                            checked={marketingEmails}
                            onChange={(e) => setMarketingEmails(e.target.checked)}
                            className="w-5 h-5 text-[var(--color-brand-primary)] border-gray-300 rounded focus:ring-[var(--color-brand-primary)] cursor-pointer"
                        />
                        <div className="flex-1">
                            <span className="block text-sm font-medium text-gray-900">
                                {t("marketingEmails")}
                            </span>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition-all duration-200">
                        <input
                            type="checkbox"
                            checked={productUpdates}
                            onChange={(e) => setProductUpdates(e.target.checked)}
                            className="w-5 h-5 text-[var(--color-brand-primary)] border-gray-300 rounded focus:ring-[var(--color-brand-primary)] cursor-pointer"
                        />
                        <div className="flex-1">
                            <span className="block text-sm font-medium text-gray-900">
                                {t("productUpdates")}
                            </span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="px-8 py-3 bg-[var(--color-brand-primary)] text-white rounded-lg hover:bg-[var(--color-brand-hover)] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base">
                    {t("saveChanges")}
                </button>
            </div>
        </div>
    );
}
