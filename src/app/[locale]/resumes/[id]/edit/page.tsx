"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useResumeStore } from "../../../../../store/useResumeStore";
import { BuilderSidebar, SectionType } from "../../../../../components/builder/BuilderSidebar";
import { BuilderForm } from "../../../../../components/builder/BuilderForm";
import { BuilderPreview } from "../../../../../components/builder/BuilderPreview";
import { ArrowLeft, Save, Download } from "lucide-react";
import Link from "next/link";

export default function ResumeEditPage() {
    const params = useParams();
    const id = params.id as string;
    const { fetchResume, isSaving, resume, saveResume, updateTitle } = useResumeStore();
    const [activeSection, setActiveSection] = useState<SectionType>("personal");

    useEffect(() => {
        if (id) {
            fetchResume(id);
        }
    }, [id, fetchResume]);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Top Bar */}
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <input
                            type="text"
                            value={resume?.title || ""}
                            onChange={(e) => updateTitle(e.target.value)}
                            onBlur={() => saveResume()}
                            className="text-lg font-semibold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-colors w-full max-w-md"
                            placeholder="Untitled Resume"
                        />
                        <p className="text-xs text-gray-500">
                            {isSaving ? "Saving..." : "All changes saved"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download size={16} /> Download PDF
                    </button>
                    <button
                        onClick={() => saveResume()}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={16} /> {isSaving ? "Saving..." : "Save"}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <BuilderSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

                {/* Form Area */}
                <div className="w-[500px] border-r border-gray-200 bg-gray-50 flex flex-col">
                    <BuilderForm activeSection={activeSection} />
                </div>

                {/* Preview Area */}
                <BuilderPreview />
            </div>
        </div>
    );
}
