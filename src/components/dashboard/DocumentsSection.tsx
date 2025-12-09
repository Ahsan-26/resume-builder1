"use client";

import { useTranslations } from "next-intl";
import { Plus, ArrowRight, FileText } from "lucide-react";
import { useState } from "react";

export default function DocumentsSection() {
    const t = useTranslations("dashboard");
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

    // Mock data for documents - in a real app, this would come from an API
    const documents = [
        { id: 1, name: "Ahsan Habib Resume", type: "Resume", date: "2 days ago", thumbnail: "/resume-thumb-1.png" },
        { id: 2, name: "Ahsan Habib Resume", type: "Resume", date: "5 days ago", thumbnail: "/resume-thumb-2.png" },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t("documents")}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("lastEdited")}</p>
                </div>
                <div className="relative">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            {t("createNew")}
                        </button>
                        <button className="p-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-600 dark:text-gray-300 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Dropdown Menu */}
                    {isCreateMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-10">
                            {["resume", "coverLetter", "website", "resignationLetter"].map((item) => (
                                <button
                                    key={item}
                                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {t(`menu.${item}`)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <div key={doc.id} className="group cursor-pointer">
                        <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 border-2 border-transparent group-hover:border-blue-500 transition-all relative overflow-hidden">
                            {/* Placeholder for thumbnail */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <FileText className="w-12 h-12" />
                            </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {doc.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{doc.type}</p>
                    </div>
                ))}

                {/* Add New Placeholder */}
                <button className="aspect-[3/4] border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-2 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-medium">{t("createNew")}</span>
                </button>
            </div>
        </div>
    );
}
