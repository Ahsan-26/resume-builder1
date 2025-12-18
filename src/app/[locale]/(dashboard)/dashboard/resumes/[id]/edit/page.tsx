"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import { BuilderSidebar, SectionType } from "@/components/builder/BuilderSidebar";
import { BuilderForm } from "@/components/builder/BuilderForm";
import { BuilderPreview } from "@/components/builder/BuilderPreview"; // Correct import
import { ArrowLeft, Save, Download } from "lucide-react";
import Link from "next/link";

export default function ResumeEditPage() {
    const params = useParams();
    const id = params.id as string;
    const { fetchResume, isSaving, resume, saveResume, updateTitle } = useResumeStore();
    const [activeSection, setActiveSection] = useState<SectionType>("personal");

    const [isMobilePreview, setIsMobilePreview] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(true);

    useEffect(() => {
        if (id) {
            fetchResume(id);
        }
    }, [id, fetchResume]);

    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
            {/* Top Bar */}
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-20 shrink-0">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="hidden md:block">
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
                    {/* Mobile Toggle */}
                    <div className="md:hidden flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setIsMobilePreview(false)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${!isMobilePreview ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setIsMobilePreview(true)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${isMobilePreview ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
                        >
                            Preview
                        </button>
                    </div>

                    <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download size={16} /> Download PDF
                    </button>
                    <button
                        onClick={() => saveResume()}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={16} /> <span className="hidden md:inline">{isSaving ? "Saving..." : "Save"}</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 relative overflow-hidden">
                {/* Sidebar - Desktop (Vertical) / Mobile (Horizontal Bottom/Top - handled in component) */}
                <div className={`
                    ${isMobilePreview ? 'hidden' : 'flex'} 
                    md:flex flex-col md:flex-row h-full w-full md:w-auto z-10
                `}>
                    <BuilderSidebar
                        activeSection={activeSection}
                        onSectionChange={(section) => {
                            setActiveSection(section);
                            setIsFormOpen(true);
                            if (window.innerWidth < 768) setIsMobilePreview(false);
                        }}
                    />
                </div>

                {/* Form Area - Desktop (Floating/Drawer) / Mobile (Full) */}
                <div className={`
                    ${isMobilePreview ? 'hidden' : 'flex'}
                    md:absolute md:left-20 md:top-4 md:bottom-4 md:w-[450px] md:z-30
                    md:transition-transform md:duration-300 md:ease-in-out
                    ${isFormOpen ? 'md:translate-x-0' : 'md:-translate-x-[150%]'}
                    w-full bg-white md:rounded-xl md:shadow-2xl border-r md:border border-gray-200 flex flex-col
                `}>
                    <div className="hidden md:flex items-center justify-between p-4 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Editor</h3>
                        <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">
                            &times;
                        </button>
                    </div>
                    <BuilderForm activeSection={activeSection} />
                </div>

                {/* Preview Area - Desktop (Full Centered) / Mobile (Full when toggled) */}
                <div className={`
                    ${isMobilePreview ? 'flex' : 'hidden md:flex'}
                    flex-1 bg-gray-100/50 h-full overflow-hidden relative
                `}>
                    <div className="absolute inset-0 overflow-y-auto flex justify-center p-4 md:p-8">
                        <BuilderPreview />
                    </div>

                    {/* Desktop: Re-open Form Button */}
                    {!isFormOpen && (
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="hidden md:flex absolute left-4 top-4 bg-white p-3 rounded-full shadow-lg border border-gray-200 text-blue-600 hover:bg-blue-50 transition-all z-20"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
