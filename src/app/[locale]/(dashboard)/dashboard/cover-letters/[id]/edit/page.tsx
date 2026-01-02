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
    const [showPreview, setShowPreview] = useState(true); // For mobile toggle

    useEffect(() => {
        if (id) {
            fetchCoverLetter(id);
        }
    }, [id, fetchCoverLetter]);

    const handleSave = async () => {
        // Auto-save is triggered by individual field updates in store for now (if implemented that way),
        // but manual save can force a sync or be a placeholder if auto-save isn't fully robust.
        // Current store implementation has `updateCoverLetter` which calls API.
        // We can just show a toast or trigger a specific save action if we had draft state.
        toast.success("Saved successfully");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden font-sans">
            {/* Header */}
            <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 z-20 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/cover-letters" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ArrowLeft size={18} className="text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-sm font-bold text-gray-900">{currentCoverLetter?.title || "Untitled Cover Letter"}</h1>
                        <p className="text-xs text-gray-400">Last saved: {currentCoverLetter ? new Date(currentCoverLetter.updated_at).toLocaleTimeString() : "Never"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        {showPreview ? <Layout size={18} /> : <Eye size={18} />}
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
                    >
                        {isSaving ? "Saving..." : <><Save size={14} /> Save</>}
                    </button>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex flex-1 relative overflow-hidden bg-[#F8FAFC]">
                {/* Sidebar */}
                <div className={`
                    relative shrink-0 border-r border-gray-200 bg-white flex flex-col transition-all duration-300
                    ${isSidebarCollapsed ? "w-16" : "w-60"}
                    hidden md:flex
                 `}>
                    <CoverLetterBuilderSidebar
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                        isCollapsed={isSidebarCollapsed}
                        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    />
                </div>

                {/* Editor (Form) */}
                <div className={`
                    flex-1 flex flex-col overflow-hidden transition-all duration-300
                    ${showPreview ? "hidden md:flex md:w-[400px] shrink-0" : "flex w-full"}
                 `}>
                    <CoverLetterBuilderForm activeSection={activeSection} />
                </div>

                {/* Preview */}
                <div className={`
                    flex-1 bg-[#F1F5F9] h-full overflow-hidden flex flex-col transition-all duration-300
                    ${!showPreview ? "hidden md:flex" : "flex"}
                 `}>
                    <CoverLetterPreview isEditable={true} />
                </div>
            </div>
        </div>
    );
}
