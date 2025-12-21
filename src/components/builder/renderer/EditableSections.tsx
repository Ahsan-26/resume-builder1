import React from "react";
import { EditableField } from "./EditableField";
import { useResumeStore } from "@/store/useResumeStore";
import { Resume, TemplateStyle } from "@/types/resume";

interface SectionProps {
    resume: Resume;
    style: TemplateStyle;
    isEditable?: boolean;
}

export const SkillsSection: React.FC<SectionProps> = ({ resume, style, isEditable = false }) => {
    const { skill_categories } = resume;
    const { updateSkillCategories } = useResumeStore();

    if (!skill_categories?.length && !isEditable) return null;

    const handleUpdateCategoryName = (catId: string, newName: string) => {
        const updated = skill_categories.map(cat =>
            cat.id === catId ? { ...cat, name: newName } : cat
        );
        updateSkillCategories(updated);
    };

    const handleUpdateSkillName = (catId: string, skillId: string, newName: string) => {
        const updated = skill_categories.map(cat => {
            if (cat.id === catId) {
                return {
                    ...cat,
                    items: cat.items.map(item =>
                        item.id === skillId ? { ...item, name: newName } : item
                    )
                };
            }
            return cat;
        });
        updateSkillCategories(updated);
    };

    const handleDeleteCategory = (catId: string) => {
        const updated = skill_categories.filter(cat => cat.id !== catId);
        updateSkillCategories(updated);
    };

    const handleDeleteSkill = (catId: string, skillId: string) => {
        const updated = skill_categories.map(cat => {
            if (cat.id === catId) {
                return {
                    ...cat,
                    items: cat.items.filter(item => item.id !== skillId)
                };
            }
            return cat;
        });
        updateSkillCategories(updated);
    };

    return (
        <div className="mb-6">
            <h2 style={{
                color: style.primary_color,
                fontSize: `${1.25 * style.heading_scale}rem`,
                borderColor: style.accent_color
            }} className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4">
                Skills
            </h2>
            <div className="flex flex-col gap-4">
                {skill_categories?.map((cat) => (
                    <div key={cat.id} className="group relative">
                        {isEditable && (
                            <button
                                onClick={() => handleDeleteCategory(cat.id)}
                                className="absolute -right-2 -top-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10"
                                title="Delete Category"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        )}
                        <div className="font-semibold text-gray-700 mb-2 text-sm uppercase">
                            <EditableField
                                value={cat.name}
                                onChange={(val) => handleUpdateCategoryName(cat.id, val)}
                                placeholder="Category Name"
                                isEditable={isEditable}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {cat.items.map((item) => (
                                <span
                                    key={item.id}
                                    className="group/skill relative px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                                >
                                    <EditableField
                                        value={item.name}
                                        onChange={(val) => handleUpdateSkillName(cat.id, item.id, val)}
                                        placeholder="Skill"
                                        isEditable={isEditable}
                                    />
                                    {isEditable && (
                                        <button
                                            onClick={() => handleDeleteSkill(cat.id, item.id)}
                                            className="absolute -right-1 -top-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover/skill:opacity-100 transition-opacity"
                                            title="Delete Skill"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const StrengthsSection: React.FC<SectionProps> = ({ resume, style, isEditable = false }) => {
    const { strengths } = resume;
    const { updateStrengths } = useResumeStore();

    if (!strengths?.length && !isEditable) return null;

    const handleUpdate = (id: string, newLabel: string) => {
        const updated = strengths.map(item =>
            item.id === id ? { ...item, label: newLabel } : item
        );
        updateStrengths(updated);
    };

    const handleDelete = (id: string) => {
        const updated = strengths.filter(item => item.id !== id);
        updateStrengths(updated);
    };

    return (
        <div className="mb-6">
            <h2 style={{
                color: style.primary_color,
                fontSize: `${1.25 * style.heading_scale}rem`,
                borderColor: style.accent_color
            }} className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4">
                Strengths
            </h2>
            <div className="flex flex-wrap gap-2">
                {strengths?.map((item) => (
                    <span
                        key={item.id}
                        className="group relative px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                    >
                        <EditableField
                            value={item.label}
                            onChange={(val) => handleUpdate(item.id, val)}
                            placeholder="Strength"
                            isEditable={isEditable}
                        />
                        {isEditable && (
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute -right-1 -top-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        )}
                    </span>
                ))}
            </div>
        </div>
    );
};

export const HobbiesSection: React.FC<SectionProps> = ({ resume, style, isEditable = false }) => {
    const { hobbies } = resume;
    const { updateHobbies } = useResumeStore();

    if (!hobbies?.length && !isEditable) return null;

    const handleUpdate = (id: string, newLabel: string) => {
        const updated = hobbies.map(item =>
            item.id === id ? { ...item, label: newLabel } : item
        );
        updateHobbies(updated);
    };

    const handleDelete = (id: string) => {
        const updated = hobbies.filter(item => item.id !== id);
        updateHobbies(updated);
    };

    return (
        <div className="mb-6">
            <h2 style={{
                color: style.primary_color,
                fontSize: `${1.25 * style.heading_scale}rem`,
                borderColor: style.accent_color
            }} className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4">
                Hobbies
            </h2>
            <div className="flex flex-wrap gap-2">
                {hobbies?.map((item) => (
                    <span
                        key={item.id}
                        className="group relative px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                    >
                        <EditableField
                            value={item.label}
                            onChange={(val) => handleUpdate(item.id, val)}
                            placeholder="Hobby"
                            isEditable={isEditable}
                        />
                        {isEditable && (
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute -right-1 -top-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        )}
                    </span>
                ))}
            </div>
        </div>
    );
};
