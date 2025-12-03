"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function JobPreferences() {
    const t = useTranslations("profile");
    const [seniority, setSeniority] = useState("mid");
    const [employmentTypes, setEmploymentTypes] = useState<string[]>(["fullTime"]);

    const toggleEmploymentType = (type: string) => {
        setEmploymentTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
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
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none bg-white">
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
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${seniority === level
                                        ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white shadow-md"
                                        : "border-gray-300 bg-white text-gray-700 hover:border-[var(--color-brand-primary)] hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="seniority"
                                    value={level}
                                    checked={seniority === level}
                                    onChange={(e) => setSeniority(e.target.value)}
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
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${employmentTypes.includes(type)
                                        ? "border-[var(--color-brand-primary)] bg-blue-50 shadow-sm"
                                        : "border-gray-300 bg-white hover:border-[var(--color-brand-primary)] hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={employmentTypes.includes(type)}
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
                            placeholder="0"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none pr-32"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                            {t("usdPerYear")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
