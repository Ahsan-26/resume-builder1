"use client";

import { useTranslations } from "next-intl";
import type { JobPreferences as JobPreferencesType } from "@/types/profile";

interface JobPreferencesProps {
    preferences: JobPreferencesType;
    onChange: (preferences: JobPreferencesType) => void;
}

export default function JobPreferences({ preferences, onChange }: JobPreferencesProps) {
    const t = useTranslations("profile");

    const handleSeniorityChange = (seniority: string) => {
        onChange({
            ...preferences,
            seniority: seniority as JobPreferencesType["seniority"],
        });
    };

    const toggleEmploymentType = (type: string) => {
        const currentTypes = preferences.employment_types || [];
        const newTypes = currentTypes.includes(type)
            ? currentTypes.filter((t) => t !== type)
            : [...currentTypes, type];

        onChange({ ...preferences, employment_types: newTypes });
    };

    const handleInputChange = (field: keyof JobPreferencesType, value: string | number) => {
        onChange({ ...preferences, [field]: value });
    };

    return (
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-bold text-[var(--color-brand-primary)] mb-6 heading-font">
                {t("jobPreferences")}
            </h2>

            <div className="space-y-6">
                {/* Industry */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("industry")}
                    </label>
                    <select
                        value={preferences.industry || ""}
                        onChange={(e) => handleInputChange("industry", e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none bg-white"
                    >
                        <option value="">{t("selectIndustry")}</option>
                        <option value="tech">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="marketing">Marketing</option>
                        <option value="sales">Sales</option>
                        <option value="design">Design</option>
                        <option value="engineering">Engineering</option>
                    </select>
                </div>

                {/* Seniority */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        {t("seniority")}
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {["internship", "junior", "mid", "senior", "lead"].map((level) => (
                            <label
                                key={level}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${preferences.seniority === level
                                        ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white shadow-md"
                                        : "border-gray-300 bg-white text-gray-700 hover:border-[var(--color-brand-primary)] hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="seniority"
                                    value={level}
                                    checked={preferences.seniority === level}
                                    onChange={(e) => handleSeniorityChange(e.target.value)}
                                    className="hidden"
                                />
                                <span className="text-sm font-medium">{t(level)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Area of Residence */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("areaOfResidence")}
                    </label>
                    <input
                        type="text"
                        value={preferences.area_of_residence || ""}
                        onChange={(e) => handleInputChange("area_of_residence", e.target.value)}
                        placeholder="e.g., San Francisco Bay Area"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                {/* Employment Type */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        {t("employmentType")}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {["fullTime", "partTime", "freelance", "internship"].map((type) => (
                            <label
                                key={type}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${preferences.employment_types?.includes(type)
                                        ? "border-[var(--color-brand-primary)] bg-blue-50 shadow-sm"
                                        : "border-gray-300 bg-white hover:border-[var(--color-brand-primary)] hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={preferences.employment_types?.includes(type) || false}
                                    onChange={() => toggleEmploymentType(type)}
                                    className="w-4 h-4 text-[var(--color-brand-primary)] border-gray-300 rounded focus:ring-[var(--color-brand-primary)] cursor-pointer"
                                />
                                <span className="text-sm font-medium text-gray-700">{t(type)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Minimum Salary */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("minimumSalary")}
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={preferences.minimum_salary || ""}
                            onChange={(e) => handleInputChange("minimum_salary", parseInt(e.target.value) || 0)}
                            placeholder="0"
                            min="0"
                            step="1000"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none pr-32"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                            {t("usdPerYear")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Info about localStorage storage */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Job preferences are currently stored locally on your device.
                    They will be synced to your account in a future update.
                </p>
            </div>
        </div>
    );
}
