"use client";

import React from "react";
import { User, Briefcase, GraduationCap, Wrench, FileText, Layers, LayoutTemplate, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useResumeStore } from "@/store/useResumeStore";
import { WorkExperience, Education, SkillCategory, Strength, Hobby, CustomSection } from "@/types/resume";

export type SectionType = "templates" | "personal" | "experience" | "education" | "skills" | "strengths" | "hobbies" | "custom";

interface BuilderSidebarProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
}

const sections: { id: SectionType; label: string; icon: React.ElementType; hasAdd?: boolean }[] = [
    { id: "templates", label: "Templates", icon: LayoutTemplate },
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase, hasAdd: true },
    { id: "education", label: "Education", icon: GraduationCap, hasAdd: true },
    { id: "skills", label: "Skills", icon: Wrench, hasAdd: true },
    { id: "strengths", label: "Strengths", icon: FileText, hasAdd: true },
    { id: "hobbies", label: "Hobbies", icon: User, hasAdd: true },
    { id: "custom", label: "Custom Sections", icon: Layers, hasAdd: true },
];

export const BuilderSidebar: React.FC<BuilderSidebarProps> = ({ activeSection, onSectionChange }) => {
    const { addExperience, addEducation, updateSkillCategories, updateStrengths, updateHobbies, updateCustomSections, resume } = useResumeStore();

    const handleAddItem = (sectionId: SectionType) => {
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
                    bullets: "",
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
                // Add a single skill to a "Skills" category
                const existingCategories = resume?.skill_categories || [];
                let skillsCategory = existingCategories.find(cat => cat.name === "Skills");

                if (!skillsCategory) {
                    // Create new category if doesn't exist
                    skillsCategory = {
                        id: crypto.randomUUID(),
                        name: "Skills",
                        order: existingCategories.length,
                        items: [],
                    };
                    existingCategories.push(skillsCategory);
                }

                // Add new skill item
                skillsCategory.items.push({
                    id: crypto.randomUUID(),
                    name: "New Skill",
                    level: "intermediate",
                    order: skillsCategory.items.length,
                });

                updateSkillCategories([...existingCategories]);
                break;
            case "strengths":
                const newStrength: Strength = {
                    id: crypto.randomUUID(),
                    label: "Leadership",
                    order: resume?.strengths?.length || 0,
                };
                updateStrengths([...(resume?.strengths || []), newStrength]);
                break;
            case "hobbies":
                const newHobby: Hobby = {
                    id: crypto.randomUUID(),
                    label: "Reading",
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
                            description: "Click to edit project description. Add details about what you built, technologies used, and impact.",
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
        <aside className="w-full h-full bg-white flex flex-col">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Builder</h2>
            </div>
            <nav className="flex-1 flex flex-col p-4 space-y-2 overflow-y-auto">
                {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                        <div key={section.id} className="space-y-1">
                            <button
                                onClick={() => onSectionChange(section.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? "bg-blue-50 text-blue-600 font-medium shadow-sm"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <Icon size={20} className={isActive ? "text-blue-600" : "text-gray-400"} />
                                <span className="flex-1 text-left">{section.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="w-1.5 h-1.5 rounded-full bg-blue-600"
                                    />
                                )}
                            </button>
                            {section.hasAdd && isActive && (
                                <button
                                    onClick={() => handleAddItem(section.id)}
                                    className="w-full flex items-center gap-2 px-4 py-2 ml-9 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Plus size={16} />
                                    Add {section.label === "Custom Sections" ? "Section" : section.label.slice(0, -1)}
                                </button>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
};
