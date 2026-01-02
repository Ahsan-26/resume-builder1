"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import { BuilderSidebar, SectionType } from "@/components/builder/BuilderSidebar";
import { BuilderForm } from "@/components/builder/BuilderForm";
import { BuilderPreview } from "@/components/builder/BuilderPreview";
// MobileEditView was unused
import { RearrangeModal } from "@/components/builder/RearrangeModal";
import { ArrowLeft, Save, Download, Layout, Eye, EyeOff, Files, Share2, Sparkles, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ResumeEditPage() {
    const params = useParams();
    const id = params.id as string;
    const { fetchResume, isSaving, isAutosaving, lastSaved, resume, saveResume, autosaveResume, updateTitle, isPreviewMode, setIsPreviewMode, downloadResume } = useResumeStore();
    const [activeSection, setActiveSection] = useState<SectionType>("personal");
    const [isRearrangeOpen, setIsRearrangeOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Initial hydration fix
    const [mounted, setMounted] = useState(false);
    const [showPreview, setShowPreview] = useState(true);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            if (window.innerWidth < 1280 && window.innerWidth >= 1024) {
                setIsSidebarCollapsed(true);
            } else if (window.innerWidth >= 1280) {
                setIsSidebarCollapsed(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Derived state for rendering
    // Default to desktop view during SSR to prevent layout shift/flashing
    const isSmall = mounted ? window.innerWidth < 1024 : false;
    const isMedium = mounted ? (window.innerWidth >= 1024 && window.innerWidth < 1280) : false;
    const isDesktop = mounted ? window.innerWidth >= 1280 : true;

    useEffect(() => {
        if (id) {
            fetchResume(id);
        }
    }, [id, fetchResume]);

    useEffect(() => {
        if (id) {
            fetchResume(id);
        }
    }, [id, fetchResume]);

    const formatLastSaved = (date: Date | null) => {
        if (!date) return "";
        return `Last saved at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden font-sans">
            {/* Top Bar */}
            <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 z-20 shrink-0">
                <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                    <Link href="/dashboard/resumes" className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden">
                        <ArrowLeft size={18} className="text-gray-600" />
                    </Link>
                    <div className="flex items-center gap-2 text-gray-400 overflow-hidden">
                        <Files size={16} className="hidden md:block shrink-0" />
                        <span className="text-xs font-medium hidden md:block shrink-0">My Documents</span>
                        <span className="text-gray-300 hidden md:block shrink-0">/</span>
                        <span className="text-xs font-bold text-gray-900 truncate">{resume?.title || "Untitled Resume"}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-6">
                    <div className="hidden sm:flex items-center gap-2 text-emerald-500">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Saved</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        {isSmall && (
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className={`p-2 rounded-lg transition-all ${showPreview ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
                                title={showPreview ? "Show Editor" : "Show Preview"}
                            >
                                <Eye size={18} />
                            </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all hidden sm:block">
                            <Share2 size={18} />
                        </button>
                        <button
                            onClick={() => saveResume()}
                            className="px-3 md:px-4 py-1.5 bg-blue-600 text-white text-[10px] md:text-xs font-bold rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 whitespace-nowrap"
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </header>

            <RearrangeModal isOpen={isRearrangeOpen} onClose={() => setIsRearrangeOpen(false)} />

            {/* Main Content */}
            <div className="flex flex-1 relative overflow-hidden bg-[#F8FAFC]">
                {/* Sidebar - Hidden on small, collapsible on medium/desktop */}
                <div className={`
                    ${isSmall ? "fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out" : "relative"}
                    ${isSmall && !isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"}
                    ${isSidebarCollapsed ? "w-16" : "w-60"} 
                    shrink-0 border-r border-gray-200 bg-white flex flex-col transition-all duration-300
                `}>
                    <BuilderSidebar
                        activeSection={activeSection}
                        onSectionChange={(s) => {
                            setActiveSection(s);
                            if (isSmall) setIsSidebarCollapsed(true);
                        }}
                        onRearrange={() => setIsRearrangeOpen(true)}
                        isCollapsed={isSidebarCollapsed}
                        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    />
                </div>

                {/* Overlay for mobile sidebar */}
                {isSmall && !isSidebarCollapsed && (
                    <div
                        className="fixed inset-0 bg-black/20 z-30 backdrop-blur-sm"
                        onClick={() => setIsSidebarCollapsed(true)}
                    />
                )}

                {/* Editor Area - Narrowed width */}
                <div className={`
                    flex-1 flex flex-col overflow-hidden transition-all duration-300
                    ${isSmall && showPreview ? "hidden" : "flex"}
                    ${isMedium && showPreview ? "w-[360px] md:w-[400px] shrink-0" : ""}
                    ${isDesktop ? "w-[360px] md:w-[400px] shrink-0" : ""}
                `}>
                    <div className="flex-1 overflow-y-auto border-r border-gray-200 bg-white">
                        <BuilderForm activeSection={activeSection} />
                    </div>
                </div>

                {/* Preview Area */}
                <div className={`
                    flex-1 bg-[#F1F5F9] h-full overflow-hidden flex flex-col transition-all duration-300
                    ${isSmall && !showPreview ? "hidden" : "flex"}
                    ${isMedium && !showPreview ? "hidden" : "flex"}
                `}>
                    {/* Preview Header */}
                    <div className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 shrink-0">
                        <div className="flex bg-gray-100 rounded-full p-1">
                            <button
                                onClick={() => setIsPreviewModalOpen(true)}
                                className="px-3 md:px-4 py-1 text-[10px] md:text-xs font-bold rounded-full bg-white text-blue-600 shadow-sm flex items-center gap-2 hover:bg-blue-50 transition-colors"
                            >
                                <Eye size={14} /> Preview
                            </button>
                            <button
                                onClick={() => downloadResume()}
                                className="px-3 md:px-4 py-1 text-[10px] md:text-xs font-bold text-gray-500 flex items-center gap-2 hover:text-gray-900 transition-colors"
                            >
                                <Download size={14} /> Download
                            </button>
                        </div>

                        {(isMedium || isSmall) && (
                            <button
                                onClick={() => setShowPreview(false)}
                                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                            >
                                <Layout size={18} />
                            </button>
                        )}
                    </div>

                    <div className="flex-1 relative overflow-hidden flex">
                        {/* Resume Container - Centered and Full Width */}
                        <div className="flex-1 overflow-y-auto flex justify-center p-0 scrollbar-hide">
                            <div className="w-full max-w-5xl flex justify-center">
                                <BuilderPreview isEditable={!isPreviewMode} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Toggle for Mobile Sidebar */}
                {isSmall && isSidebarCollapsed && (
                    <button
                        onClick={() => setIsSidebarCollapsed(false)}
                        className="fixed bottom-6 left-6 w-12 h-12 bg-gray-900 text-white rounded-full shadow-2xl flex items-center justify-center z-50 active:scale-95 transition-transform"
                    >
                        <Layout size={20} />
                    </button>
                )}

                {/* Full Screen Preview Modal */}
                {isPreviewModalOpen && (
                    <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm flex flex-col animate-in fade-in duration-200">
                        <div className="h-16 flex items-center justify-between px-6 shrink-0">
                            <h2 className="text-white font-bold text-lg">Resume Preview</h2>
                            <button
                                onClick={() => setIsPreviewModalOpen(false)}
                                className="p-2 bg-white/10 text-white hover:bg-white/20 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 flex justify-center">
                            <div className="w-full max-w-5xl flex justify-center">
                                <BuilderPreview isEditable={false} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

