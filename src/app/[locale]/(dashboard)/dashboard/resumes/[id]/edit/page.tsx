"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import { BuilderSidebar, SectionType } from "@/components/builder/BuilderSidebar";
import { BuilderForm } from "@/components/builder/BuilderForm";
import { BuilderPreview } from "@/components/builder/BuilderPreview";
import { MobileEditView } from "@/components/builder/MobileEditView";
import { RearrangeModal } from "@/components/builder/RearrangeModal";
import { ArrowLeft, Save, Download, Layout, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function ResumeEditPage() {
    const params = useParams();
    const id = params.id as string;
    const { fetchResume, isSaving, isAutosaving, lastSaved, resume, saveResume, autosaveResume, updateTitle, isPreviewMode, setIsPreviewMode } = useResumeStore();
    const [activeSection, setActiveSection] = useState<SectionType>("personal");
    const [isRearrangeOpen, setIsRearrangeOpen] = useState(false);

    const [isMobilePreview, setIsMobilePreview] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (id) {
            fetchResume(id);
        }
    }, [id, fetchResume]);

    /* 
    // Debounced Autosave
    useEffect(() => {
        if (!resume) return;

        const timer = setTimeout(() => {
            autosaveResume();
        }, 10000); // Autosave after 10 seconds of inactivity

        return () => clearTimeout(timer);
    }, [resume, autosaveResume]);
    */

    const formatLastSaved = (date: Date | null) => {
        if (!date) return "";
        return `Last saved at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
            {/* Top Bar - Hide on Mobile */}
            {!isMobile && (
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-20 shrink-0 shadow-sm">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="hidden md:block">
                            <input
                                type="text"
                                value={resume?.title || ""}
                                onChange={(e) => updateTitle(e.target.value)}
                                onBlur={() => saveResume()}
                                className="text-base font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0 placeholder-gray-300 w-full max-w-md"
                                placeholder="Untitled Resume"
                            />
                            <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${isSaving || isAutosaving ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                                    {isSaving || isAutosaving ? "Saving changes..." : formatLastSaved(lastSaved) || "Syncing to cloud"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Mobile Toggle */}
                        <div className="md:hidden flex bg-gray-100 rounded-lg p-1 mr-2">
                            <button
                                onClick={() => setIsMobilePreview(false)}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${!isMobilePreview ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setIsMobilePreview(true)}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${isMobilePreview ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
                            >
                                Preview
                            </button>
                        </div>

                        <div className="hidden md:flex items-center gap-1">
                            <button
                                onClick={() => setIsRearrangeOpen(true)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                            >
                                <Layout size={18} /> Rearrange
                            </button>
                            <button
                                onClick={() => setIsPreviewMode(!isPreviewMode)}
                                className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl transition-all ${isPreviewMode
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                {isPreviewMode ? <EyeOff size={18} /> : <Eye size={18} />}
                                {isPreviewMode ? "Edit Mode" : "Preview"}
                            </button>
                            <div className="w-px h-6 bg-gray-200 mx-2" />
                        </div>

                        <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                            <Download size={18} /> Export
                        </button>
                        <button
                            onClick={() => saveResume()}
                            disabled={isSaving || isAutosaving}
                            className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            style={{
                                backgroundColor: resume?.template?.definition?.style?.accent_color || '#2563EB',
                                boxShadow: `0 10px 25px -5px ${resume?.template?.definition?.style?.accent_color || '#2563EB'}40`
                            }}
                            onMouseEnter={(e) => {
                                if (!isSaving && !isAutosaving) {
                                    const color = resume?.template?.definition?.style?.accent_color || '#2563EB';
                                    e.currentTarget.style.filter = 'brightness(0.9)';
                                }
                            }}
                            onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
                        >
                            <Save size={18} /> <span className="hidden md:inline">{isSaving ? "Saving..." : "Save"}</span>
                        </button>
                    </div>
                </header>
            )}

            <RearrangeModal isOpen={isRearrangeOpen} onClose={() => setIsRearrangeOpen(false)} />

            {/* Main Content */}
            <div className="flex flex-1 relative overflow-hidden">
                {/* Desktop: Sidebar + Preview */}
                {!isMobile && (
                    <>
                        {/* Sidebar - Desktop Only */}
                        <div className="flex flex-col w-64 bg-white border-r border-gray-200 overflow-hidden">
                            <BuilderSidebar
                                activeSection={activeSection}
                                onSectionChange={(section) => {
                                    setActiveSection(section);
                                }}
                            />
                        </div>

                        {/* Preview Area - Full Width on Desktop */}
                        <div className="flex-1 bg-gray-100/50 h-full overflow-hidden relative">
                            <div className="absolute inset-0 overflow-y-auto flex justify-center p-4 md:p-8">
                                <BuilderPreview isEditable={!isPreviewMode} />
                            </div>
                        </div>
                    </>
                )}

                {/* Mobile: Show MobileEditView */}
                {isMobile && <MobileEditView />}
            </div>
        </div>
    );
}
