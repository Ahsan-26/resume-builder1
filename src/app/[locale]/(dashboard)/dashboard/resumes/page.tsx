"use client";

import React from "react";
import DocumentsSection from "@/components/dashboard/DocumentsSection";
import { useTranslations } from "next-intl";

export default function ResumesPage() {
    const t = useTranslations("dashboard");

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t("sidebar.resumes")}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Manage your resumes and create new ones.
                </p>
            </div>

            <DocumentsSection filter="resume" />
        </div>
    );
}
