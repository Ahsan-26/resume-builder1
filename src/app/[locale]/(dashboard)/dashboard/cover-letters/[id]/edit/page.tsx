"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { CoverLetterBuilderSidebar, CoverLetterSectionType } from "@/components/cover-letter/editor/CoverLetterBuilderSidebar";
import { CoverLetterBuilderForm } from "@/components/cover-letter/editor/CoverLetterBuilderForm";
import { CoverLetterPreview } from "@/components/cover-letter/editor/CoverLetterPreview";
import { ArrowLeft, Save, Eye, Layout, Download } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function CoverLetterEditPage() {
    const params = useParams();
    const id = params.id as string;
    const { fetchCoverLetter, currentCoverLetter, isSaving, updateCoverLetter } = useCoverLetterStore();

    const [activeSection, setActiveSection] = useState<CoverLetterSectionType>("personal");
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showPreview, setShowPreview] = useState(false); // Default to false for mobile-first
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useEffect(() => {
        if (id) {
            fetchCoverLetter(id);
        }
    }, [id, fetchCoverLetter]);

    // Set showPreview based on screen size on mount
    useEffect(() => {
        const checkScreen = () => {
            if (window.innerWidth >= 768) {
                setShowPreview(true);
            } else {
                setShowPreview(false);
            }
        };
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    const handleSave = async () => {
        toast.success("Saved successfully");
    };

    return (
        <div className="flex flex-col h-screen bg-white md:bg-gray-50 overflow-hidden font-sans">
            {/* Header */}
            <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 z-30 shrink-0 shadow-sm">
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Open editor menu"
                    >
                        <Layout size={20} />
                    </button>
                    <Link href="/dashboard/cover-letters" className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Back to cover letters">
                        <ArrowLeft size={18} className="text-gray-600" />
                    </Link>
                    <div className="min-w-0 max-w-[150px] sm:max-w-[300px]">
                        <input
                            type="text"
                            value={currentCoverLetter?.title || ""}
                            onChange={(e) => updateCoverLetter(id, { title: e.target.value })}
                            className="text-sm font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0 w-full truncate"
                            placeholder="Untitled Cover Letter"
                            aria-label="Cover letter title"
                        />
                        <p className="hidden xs:block text-[10px] text-gray-400 truncate">Saved: {currentCoverLetter ? new Date(currentCoverLetter.updated_at).toLocaleTimeString() : "Never"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95 border border-gray-200 dark:border-gray-700"
                        aria-label={showPreview ? "Show Editor" : "Show Full Preview"}
                        title={showPreview ? "Show Editor" : "Show Full Preview"}
                    >
                        {showPreview ? <><Layout size={14} /> <span className="hidden sm:inline">Edit</span></> : <><Eye size={14} /> <span className="hidden sm:inline">Preview</span></>}
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95 shrink-0"
                        aria-label="Save cover letter"
                    >
                        {isSaving ? "Saving..." : <><Save size={14} /> <span className="hidden sm:inline">Save</span></>}
                    </button>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex flex-1 relative overflow-hidden bg-white">
                {/* Desktop Sidebar */}
                <aside
                    className={`
                        relative shrink-0 border-r border-gray-200 bg-white flex flex-col transition-all duration-300 z-20
                        ${isSidebarCollapsed ? "w-16" : "w-64"}
                        hidden md:flex
                    `}
                    aria-label="Editor navigation"
                >
                    <CoverLetterBuilderSidebar
                        activeSection={activeSection}
                        onSectionChange={(s) => {
                            setActiveSection(s);
                            if (window.innerWidth < 768) setShowPreview(false);
                        }}
                        isCollapsed={isSidebarCollapsed}
                        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    />
                </aside>

                {/* Mobile Sidebar Overlay */}
                {isMobileSidebarOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)} />
                        <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl animate-in slide-in-from-left duration-300">
                            <CoverLetterBuilderSidebar
                                activeSection={activeSection}
                                onSectionChange={(s) => {
                                    setActiveSection(s);
                                    setIsMobileSidebarOpen(false);
                                    setShowPreview(false);
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Editor Container */}
                <div className="flex flex-1 flex-col md:flex-row overflow-hidden relative">
                    {/* Form Section */}
                    <main
                        className={`
                            flex-1 flex flex-col overflow-y-auto bg-white transition-all duration-500 ease-in-out
                            ${showPreview ? "hidden md:flex md:w-[45%] lg:w-[40%] xl:w-[35%] shrink-0" : "w-full"}
                        `}
                        aria-label="Form editor"
                    >
                        <div className="max-w-3xl mx-auto w-full p-6 md:p-8 lg:p-12">
                            <CoverLetterBuilderForm activeSection={activeSection} />
                        </div>
                    </main>

                    {/* Preview Section */}
                    <section
                        className={`
                            flex-1 bg-gray-50 border-l border-gray-200 h-full overflow-hidden flex flex-col transition-all duration-500 ease-in-out py-4 md:py-8
                            ${!showPreview ? "hidden md:flex" : "flex"}
                        `}
                        aria-label="Document preview"
                    >
                        <div className="flex-1 overflow-auto px-4 md:px-8">
                            <div className="max-w-[210mm] mx-auto min-h-full flex items-center justify-center">
                                <CoverLetterPreview isEditable={true} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
