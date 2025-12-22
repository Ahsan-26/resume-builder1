"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import { BuilderSidebar, SectionType } from "@/components/builder/BuilderSidebar";
import { BuilderForm } from "@/components/builder/BuilderForm";
import { BuilderPreview } from "@/components/builder/BuilderPreview";
import { MobileEditView } from "@/components/builder/MobileEditView";
import { RearrangeModal } from "@/components/builder/RearrangeModal";
import { ArrowLeft, Save, Download, Layout, Eye, EyeOff, Files, Share2, Sparkles, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ResumeEditPage() {
    const params = useParams();
    const id = params.id as string;
    const { fetchResume, isSaving, isAutosaving, lastSaved, resume, saveResume, autosaveResume, updateTitle, isPreviewMode, setIsPreviewMode, downloadResume } = useResumeStore();
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
                <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-20 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-400">
                            <Files size={16} />
                            <span className="text-xs font-medium">My Documents</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-xs font-bold text-gray-900">{resume?.title || "Untitled Resume"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-emerald-500">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-xs font-bold uppercase tracking-wider">Saved</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                                <Share2 size={18} />
                            </button>
                            <button
                                onClick={() => saveResume()}
                                className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </header>
            )}

            <RearrangeModal isOpen={isRearrangeOpen} onClose={() => setIsRearrangeOpen(false)} />

            {/* Main Content */}
            <div className="flex flex-1 relative overflow-hidden bg-[#F8FAFC]">
                {/* Desktop View */}
                {!isMobile && (
                    <>
                        {/* Column 1: Global Navigation Sidebar */}
                        <div className="w-60 shrink-0 border-r border-gray-200 bg-white flex flex-col">
                            <BuilderSidebar
                                activeSection={activeSection}
                                onSectionChange={setActiveSection}
                            />
                        </div>

                        {/* Column 2: Editing Form */}
                        {!isPreviewMode && (
                            <div className="w-[400px] lg:w-[450px] xl:w-[600px] shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
                                <BuilderForm activeSection={activeSection} />
                            </div>
                        )}

                        {/* Column 3: Live Preview Area */}
                        <div className="flex-1 bg-[#F1F5F9] h-full overflow-hidden flex flex-col">
                            {/* Preview Header */}
                            <div className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
                                <div className="flex bg-gray-100 rounded-full p-1">
                                    <button className="px-4 py-1 text-xs font-bold rounded-full bg-white text-red-500 shadow-sm flex items-center gap-2">
                                        <Eye size={14} /> Preview
                                    </button>
                                    <button className="px-4 py-1 text-xs font-bold text-gray-500 flex items-center gap-2">
                                        <Sparkles size={14} /> Resume Tailoring <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded text-[8px]">Beta</span>
                                    </button>
                                </div>
                                <button className="text-xs font-bold text-gray-500 flex items-center gap-2 hover:text-gray-900 transition-colors">
                                    <MessageSquare size={14} /> Help Center
                                </button>
                            </div>

                            <div className="flex-1 relative overflow-hidden flex">
                                {/* Side Actions */}
                                <div className="w-16 flex flex-col items-center py-8 gap-4 border-r border-gray-100 bg-white/50">
                                    <button
                                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                                        className={`p-2 rounded-xl transition-all ${isPreviewMode ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white hover:text-gray-900 shadow-sm'}`}
                                    >
                                        <Eye size={20} />
                                    </button>
                                    <button
                                        onClick={() => downloadResume()}
                                        className="p-2 text-gray-400 hover:bg-white hover:text-gray-900 rounded-xl transition-all shadow-sm"
                                    >
                                        <Download size={20} />
                                    </button>
                                </div>

                                {/* Resume Container */}
                                <div className="flex-1 overflow-y-auto flex justify-center p-8 lg:p-12">
                                    <div className="w-full max-w-5xl">
                                        <BuilderPreview isEditable={!isPreviewMode} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Mobile View */}
                {isMobile && <MobileEditView />}
            </div>
        </div>
    );
}
