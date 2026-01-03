"use client";

import React from "react";
import { User, FileText, LayoutTemplate, Home, Files, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import Link from "next/link";

export type CoverLetterSectionType = "personal" | "recipient" | "content" | "templates";

interface CoverLetterBuilderSidebarProps {
    activeSection: CoverLetterSectionType;
    onSectionChange: (section: CoverLetterSectionType) => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

const mainNav = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    { id: "documents", label: "Cover Letters", icon: Files, href: "/dashboard/cover-letters" },
];

const editSections: { id: CoverLetterSectionType; label: string; icon: React.ElementType }[] = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "recipient", label: "Recipient", icon: Mail },
    { id: "content", label: "Letter Content", icon: FileText },
    { id: "templates", label: "Templates", icon: LayoutTemplate },
];

export const CoverLetterBuilderSidebar: React.FC<CoverLetterBuilderSidebarProps> = ({
    activeSection,
    onSectionChange,
    isCollapsed,
    onToggleCollapse
}) => {
    return (
        <aside className={`${isCollapsed ? "w-16" : "w-full"} h-full bg-white flex flex-col overflow-y-auto border-r border-gray-100 transition-all duration-300 relative group/sidebar`}>
            {/* Collapse Toggle */}
            <button
                onClick={onToggleCollapse}
                className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm z-30 opacity-0 group-hover/sidebar:opacity-100 transition-opacity hover:bg-gray-50"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <div className={`p-6 flex items-center gap-3 border-b border-gray-50 ${isCollapsed ? "justify-center px-0" : ""}`}>
                <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold shadow-md">
                    CL
                </div>
                {!isCollapsed && (
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">
                            Cover Letter Builder
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Beta</p>
                    </div>
                )}
            </div>

            <div className="flex-1 px-3 py-4 space-y-6">
                {/* Edit Sections */}
                <div className="space-y-1">
                    {!isCollapsed && <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Editor Sections</p>}
                    {editSections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;
                        return (
                            <div key={section.id} className="space-y-1">
                                <button
                                    onClick={() => onSectionChange(section.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isCollapsed ? "justify-center px-0" : ""} ${isActive
                                        ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                    title={isCollapsed ? section.label : ""}
                                >
                                    <Icon size={18} className={`shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
                                    {!isCollapsed && <span className="flex-1 text-left font-semibold">{section.label}</span>}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};
