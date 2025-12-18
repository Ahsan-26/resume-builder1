"use client";

import React from "react";
import { User, Briefcase, GraduationCap, Wrench, FileText, Layers, LayoutTemplate } from "lucide-react";
import { motion } from "framer-motion";

export type SectionType = "templates" | "personal" | "experience" | "education" | "skills" | "strengths" | "hobbies" | "custom";

interface BuilderSidebarProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
}

const sections: { id: SectionType; label: string; icon: React.ElementType }[] = [
    { id: "templates", label: "Templates", icon: LayoutTemplate },
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "strengths", label: "Strengths", icon: FileText },
    { id: "hobbies", label: "Hobbies", icon: User },
    { id: "custom", label: "Custom Sections", icon: Layers },
];

export const BuilderSidebar: React.FC<BuilderSidebarProps> = ({ activeSection, onSectionChange }) => {
    return (

        <aside className="w-full md:w-20 lg:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible no-scrollbar">
            <div className="hidden md:block p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 lg:block hidden">Builder</h2>
                <h2 className="text-xl font-bold text-gray-800 lg:hidden block text-center">B</h2>
            </div>
            <nav className="flex-1 flex md:flex-col p-2 md:p-4 space-x-2 md:space-x-0 md:space-y-2 min-w-max md:min-w-0">
                {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                        <button
                            key={section.id}
                            onClick={() => onSectionChange(section.id)}
                            className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${isActive
                                ? "bg-blue-50 text-blue-600 font-medium shadow-sm"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <Icon size={20} className={isActive ? "text-blue-600" : "text-gray-400"} />
                            <span className="md:hidden lg:inline">{section.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 hidden lg:block"
                                />
                            )}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );

};
