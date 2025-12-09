"use client";

import { useTranslations } from "next-intl";
import { MessageSquare } from "lucide-react";

export default function Interviews() {
    const t = useTranslations("dashboard");

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6">{t("interviews")}</h3>
            <div className="flex items-center justify-center h-32 text-gray-400">
                <MessageSquare className="w-12 h-12 opacity-20" />
            </div>
        </div>
    );
}
