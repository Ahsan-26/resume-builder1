"use client";

import React from "react";
import { User, Briefcase, GraduationCap, Wrench, FileText, Layers, LayoutTemplate, Plus, Home, Files, Sparkles, Languages, Share2, Search, Map, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useResumeStore } from "@/store/useResumeStore";
import { WorkExperience, Education, SkillCategory, Strength, Hobby, CustomSection } from "@/types/resume";
import Link from "next/link";

export type SectionType = "templates" | "personal" | "experience" | "education" | "skills" | "strengths" | "hobbies" | "custom";

interface BuilderSidebarProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
    onRearrange?: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

const mainNav = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    { id: "documents", label: "My Documents", icon: Files, href: "/dashboard/resumes" },
];

const editSections: { id: SectionType; label: string; icon: React.ElementType; hasAdd?: boolean }[] = [
    { id: "personal", label: "Fill In", icon: User },
    { id: "templates", label: "Design", icon: LayoutTemplate },
    { id: "experience", label: "Experience", icon: Briefcase, hasAdd: true },
    { id: "education", label: "Education", icon: GraduationCap, hasAdd: true },
    { id: "skills", label: "Skills", icon: Wrench, hasAdd: true },
    { id: "strengths", label: "Strengths", icon: FileText, hasAdd: true },
    { id: "hobbies", label: "Hobbies", icon: User, hasAdd: true },
    { id: "custom", label: "Custom Sections", icon: Layers, hasAdd: true },
];

const aiTools = [
    { id: "improve", label: "Improve", icon: Sparkles },
    { id: "proofread", label: "Proofread & Translate", icon: Languages },
    { id: "share", label: "Download & Share", icon: Share2 },
];

const footerNav = [
    { id: "career", label: "Career Map", icon: Map },
    { id: "interviews", label: "Job Interviews", icon: MessageSquare },
    { id: "jobs", label: "Find Jobs", icon: Search },
];

export const BuilderSidebar: React.FC<BuilderSidebarProps> = ({ activeSection, onSectionChange, onRearrange, isCollapsed, onToggleCollapse }) => {
    const { addExperience, addEducation, updateSkillCategories, updateStrengths, updateHobbies, updateCustomSections, resume } = useResumeStore();

    const handleAddItem = (sectionId: SectionType) => {
        // ... (keep existing handleAddItem logic)
        switch (sectionId) {
            case "experience":
                const newExp: WorkExperience = {
                    id: crypto.randomUUID(),
                    position_title: "New Position",
                    company_name: "Company Name",
                    city: "",
                    country: "",
                    start_date: "01/2024",
                    end_date: "Present",
                    is_current: true,
                    description: "Click to edit your job description and responsibilities here.",
                    bullets: [],
                    order: resume?.work_experiences?.length || 0,
                };
                addExperience(newExp);
                break;
            case "education":
                const newEdu: Education = {
                    id: crypto.randomUUID(),
                    degree: "Bachelor's Degree",
                    field_of_study: "Field of Study",
                    school_name: "University Name",
                    city: "",
                    country: "",
                    start_date: "2020",
                    end_date: "2024",
                    is_current: false,
                    description: "",
                    order: resume?.educations?.length || 0,
                };
                addEducation(newEdu);
                break;
            case "skills":
                const existingCategories = resume?.skill_categories || [];
                // If no categories exist, create a default one
                if (existingCategories.length === 0) {
                    const newCategory: SkillCategory = {
                        id: crypto.randomUUID(),
                        name: "Skills",
                        order: 0,
                        items: [{
                            id: crypto.randomUUID(),
                            name: "New Skill",
                            level: "expert",
                            order: 0,
                        }],
                    };
                    updateSkillCategories([newCategory]);
                } else {
                    // Add to the first category for now, or maybe create a new category?
                    // Let's add a new category from the sidebar "+" button to be safe/clear
                    const newCategory: SkillCategory = {
                        id: crypto.randomUUID(),
                        name: "New Category",
                        order: existingCategories.length,
                        items: [],
                    };
                    updateSkillCategories([...existingCategories, newCategory]);
                }
                break;
            case "strengths":
                const newStrength: Strength = {
                    id: crypto.randomUUID(),
                    label: "New Strength",
                    order: resume?.strengths?.length || 0,
                };
                updateStrengths([...(resume?.strengths || []), newStrength]);
                break;
            case "hobbies":
                const newHobby: Hobby = {
                    id: crypto.randomUUID(),
                    label: "New Hobby",
                    order: resume?.hobbies?.length || 0,
                };
                updateHobbies([...(resume?.hobbies || []), newHobby]);
                break;
            case "custom":
                const newSection: CustomSection = {
                    id: crypto.randomUUID(),
                    type: "custom",
                    title: "Projects",
                    order: resume?.custom_sections?.length || 0,
                    items: [
                        {
                            id: crypto.randomUUID(),
                            title: "Sample Project",
                            subtitle: "Personal Project",
                            meta: "2024",
                            description: "Click to edit project description.",
                            start_date: "",
                            end_date: "",
                            is_current: false,
                            order: 0,
                        }
                    ],
                };
                updateCustomSections([...(resume?.custom_sections || []), newSection]);
                break;
        }
    };

    return (
        <aside className={`${isCollapsed ? "w-16" : "w-full"} h-full bg-white flex flex-col overflow-y-auto border-r border-gray-100 transition-all duration-300 relative group/sidebar`}>
            {/* Collapse Toggle */}
            <button
                onClick={onToggleCollapse}
                className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm z-30 opacity-0 group-hover/sidebar:opacity-100 transition-opacity hover:bg-gray-50"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
            {/* User Profile Section */}
            <div className={`p-6 flex items-center gap-3 border-b border-gray-50 ${isCollapsed ? "justify-center px-0" : ""}`}>
                <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                    {resume?.personal_info?.first_name?.[0] || "U"}
                </div>
                {!isCollapsed && (
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">
                            {resume?.personal_info?.first_name} {resume?.personal_info?.last_name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Free Plan</p>
                    </div>
                )}
            </div>

            <div className="flex-1 px-3 py-4 space-y-6">
                {/* Global Navigation */}
                <nav className="space-y-1">
                    {mainNav.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all ${isCollapsed ? "justify-center px-0" : ""}`}
                            title={isCollapsed ? item.label : ""}
                        >
                            <item.icon size={18} className="text-gray-400 shrink-0" />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* Edit Sections */}
                <div className="space-y-1">
                    {!isCollapsed && <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Editor</p>}
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
                                    {!isCollapsed && isActive && section.hasAdd && (
                                        <Plus
                                            size={16}
                                            className="text-gray-400 hover:text-white transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddItem(section.id);
                                            }}
                                        />
                                    )}
                                </button>
                            </div>
                        );
                    })}

                    {/* Rearrange Button */}
                    {onRearrange && (
                        <div className={`pt-2 ${isCollapsed ? "px-0 flex justify-center" : "px-3"}`}>
                            <button
                                onClick={onRearrange}
                                className={`flex items-center gap-3 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-all group shadow-sm ${isCollapsed ? "p-2.5" : "w-full px-4 py-3"}`}
                                title={isCollapsed ? "Rearrange Sections" : ""}
                            >
                                <Layers size={18} className="text-indigo-500 group-hover:scale-110 transition-transform shrink-0" />
                                {!isCollapsed && <span className="font-bold text-sm">Rearrange Sections</span>}
                            </button>
                        </div>
                    )}
                </div>

                {/* AI Tools */}
                <div className="space-y-1">
                    {!isCollapsed && <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">AI Tools</p>}
                    {aiTools.map((item) => (
                        <button
                            key={item.id}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all ${isCollapsed ? "justify-center px-0" : ""}`}
                            title={isCollapsed ? item.label : ""}
                        >
                            <item.icon size={18} className="text-gray-400 shrink-0" />
                            {!isCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className={`p-4 bg-gray-50/50 border-t border-gray-100 space-y-1 ${isCollapsed ? "px-0" : ""}`}>
                {footerNav.map((item) => (
                    <button
                        key={item.id}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-900 transition-all ${isCollapsed ? "justify-center px-0" : ""}`}
                        title={isCollapsed ? item.label : ""}
                    >
                        <item.icon size={16} className="shrink-0" />
                        {!isCollapsed && <span>{item.label}</span>}
                    </button>
                ))}
            </div>
        </aside>
    );
};
