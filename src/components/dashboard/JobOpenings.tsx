"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function JobOpenings() {
    const t = useTranslations("dashboard");

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white">{t("jobOpenings")}</h3>
                <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                </button>
            </div>
            <div className="space-y-4">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold">T</div>
                    <div>
                        <p className="text-xs text-gray-500">The United States Secret Service</p>
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">Special Agent, $40,000 Rec...</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center font-bold">C</div>
                    <div>
                        <p className="text-xs text-gray-500">Childrens Hospital Of The Kings D...</p>
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">X-Ray Technologist</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
