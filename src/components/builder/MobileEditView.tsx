"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { ArrowLeft, Plus, Edit2, Trash2, Save, Eye, Layout } from "lucide-react";
import Link from "next/link";
import { BuilderPreview } from "./BuilderPreview";
import { RearrangeModal } from "./RearrangeModal";

export const MobileEditView: React.FC = () => {
    const { resume, updatePersonalInfo, saveResume, autosaveResume, isSaving } = useResumeStore();
    const [expandedSection, setExpandedSection] = useState<string | null>("personal");
    const [showPreview, setShowPreview] = useState(false);
    const [showRearrange, setShowRearrange] = useState(false);

    if (!resume) return null;

    const accentColor = resume.template?.definition?.style?.accent_color || "#6366f1";

    if (showPreview) {
        return (
            <div className="h-full flex flex-col bg-gray-100">
                <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                    <button onClick={() => setShowPreview(false)} className="flex items-center gap-2 text-gray-700">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Edit</span>
                    </button>
                </div>
                <div className="flex-1 overflow-auto p-4 flex justify-center items-start bg-gray-200">
                    <div className="w-full max-w-full overflow-hidden flex justify-center">
                        <BuilderPreview isEditable={false} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                    <Link href="/dashboard/resumes" className="flex items-center gap-2 text-gray-700">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </Link>
                    <button
                        onClick={() => saveResume()}
                        disabled={isSaving}
                        className="px-4 py-2 rounded-lg font-medium text-white transition-colors"
                        style={{ backgroundColor: accentColor }}
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowPreview(true)}
                        className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 text-sm"
                    >
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                    </button>
                    <button
                        onClick={() => setShowRearrange(true)}
                        className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 text-sm"
                    >
                        <Layout className="w-4 h-4" />
                        <span>Rearrange</span>
                    </button>
                </div>
            </div>

            <RearrangeModal isOpen={showRearrange} onClose={() => setShowRearrange(false)} />

            {/* Content */}
            <div className="p-4 space-y-4">
                {/* Personal Info Section */}
                <SectionCard
                    title="Personal Information"
                    isExpanded={expandedSection === "personal"}
                    onToggle={() => setExpandedSection(expandedSection === "personal" ? null : "personal")}
                    accentColor={accentColor}
                >
                    <PersonalInfoMobile />
                </SectionCard>

                {/* Experience Section */}
                <SectionCard
                    title="Experience"
                    isExpanded={expandedSection === "experience"}
                    onToggle={() => setExpandedSection(expandedSection === "experience" ? null : "experience")}
                    accentColor={accentColor}
                >
                    <ExperienceMobile />
                </SectionCard>

                {/* Education Section */}
                <SectionCard
                    title="Education"
                    isExpanded={expandedSection === "education"}
                    onToggle={() => setExpandedSection(expandedSection === "education" ? null : "education")}
                    accentColor={accentColor}
                >
                    <EducationMobile />
                </SectionCard>

                {/* Skills Section */}
                <SectionCard
                    title="Skills"
                    isExpanded={expandedSection === "skills"}
                    onToggle={() => setExpandedSection(expandedSection === "skills" ? null : "skills")}
                    accentColor={accentColor}
                >
                    <SkillsMobile />
                </SectionCard>

                {/* Strengths Section */}
                <SectionCard
                    title="Strengths"
                    isExpanded={expandedSection === "strengths"}
                    onToggle={() => setExpandedSection(expandedSection === "strengths" ? null : "strengths")}
                    accentColor={accentColor}
                >
                    <StrengthsMobile />
                </SectionCard>

                {/* Hobbies Section */}
                <SectionCard
                    title="Hobbies"
                    isExpanded={expandedSection === "hobbies"}
                    onToggle={() => setExpandedSection(expandedSection === "hobbies" ? null : "hobbies")}
                    accentColor={accentColor}
                >
                    <HobbiesMobile />
                </SectionCard>

                {/* Custom Sections */}
                {resume?.custom_sections?.map((section) => (
                    <SectionCard
                        key={section.id}
                        title={section.title || "Custom Section"}
                        isExpanded={expandedSection === `custom-${section.id}`}
                        onToggle={() => setExpandedSection(expandedSection === `custom-${section.id}` ? null : `custom-${section.id}`)}
                        accentColor={accentColor}
                    >
                        <CustomSectionMobile sectionId={section.id} />
                    </SectionCard>
                ))}
            </div>
        </div>
    );
};

// Section Card Component
const SectionCard: React.FC<{
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    accentColor: string;
}> = ({ title, isExpanded, onToggle, children, accentColor }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full px-4 py-3 flex items-center justify-between font-semibold text-left"
                style={{ color: accentColor }}
            >
                <span>{title}</span>
                <svg
                    className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isExpanded && <div className="px-4 pb-4">{children}</div>}
        </div>
    );
};

// Personal Info Mobile Component
const PersonalInfoMobile: React.FC = () => {
    const { resume, updatePersonalInfo, autosaveResume } = useResumeStore();
    const personal_info = resume?.personal_info || {} as any;

    return (
        <div className="space-y-4">
            <InputField
                label="First Name"
                value={personal_info.first_name || ""}
                onChange={(val) => updatePersonalInfo({ first_name: val })}
                onBlur={() => autosaveResume()}
            />
            <InputField
                label="Last Name"
                value={personal_info.last_name || ""}
                onChange={(val) => updatePersonalInfo({ last_name: val })}
                onBlur={() => autosaveResume()}
            />
            <InputField
                label="Headline"
                value={personal_info.headline || ""}
                onChange={(val) => updatePersonalInfo({ headline: val })}
                onBlur={() => autosaveResume()}
            />
            <TextareaField
                label="Summary"
                value={personal_info.summary || ""}
                onChange={(val) => updatePersonalInfo({ summary: val })}
                onBlur={() => autosaveResume()}
            />
            <InputField
                label="Email"
                type="email"
                value={personal_info.email || ""}
                onChange={(val) => updatePersonalInfo({ email: val })}
                onBlur={() => autosaveResume()}
            />
            <InputField
                label="Phone"
                value={personal_info.phone || ""}
                onChange={(val) => updatePersonalInfo({ phone: val })}
                onBlur={() => autosaveResume()}
            />
            <InputField
                label="City"
                value={personal_info.city || ""}
                onChange={(val) => updatePersonalInfo({ city: val })}
                onBlur={() => autosaveResume()}
            />
            <InputField
                label="Country"
                value={personal_info.country || ""}
                onChange={(val) => updatePersonalInfo({ country: val })}
                onBlur={() => autosaveResume()}
            />
            <InputField
                label="LinkedIn URL"
                value={personal_info.linkedin_url || ""}
                onChange={(val) => updatePersonalInfo({ linkedin_url: val })}
                onBlur={() => autosaveResume()}
            />
        </div>
    );
};

// Experience Mobile Component
const ExperienceMobile: React.FC = () => {
    const { resume, addExperience, removeExperience, autosaveResume } = useResumeStore();
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleAdd = () => {
        const newExp = {
            id: crypto.randomUUID(),
            position_title: "",
            company_name: "",
            city: "",
            country: "",
            start_date: "",
            end_date: "",
            is_current: false,
            description: "",
            bullets: "",
            order: resume?.work_experiences?.length || 0,
        };
        addExperience(newExp);
        setEditingId(newExp.id);
        autosaveResume();
    };

    const handleDelete = async (id: string) => {
        await removeExperience(id);
        autosaveResume();
    };

    return (
        <div className="space-y-3">
            {resume?.work_experiences?.map((exp) => (
                <ItemCard
                    key={exp.id}
                    title={exp.position_title || "Untitled Position"}
                    subtitle={exp.company_name}
                    onEdit={() => setEditingId(exp.id)}
                    onDelete={() => handleDelete(exp.id)}
                    isEditing={editingId === exp.id}
                    onClose={() => setEditingId(null)}
                >
                    <ExperienceForm expId={exp.id} />
                </ItemCard>
            ))}
            <button
                onClick={handleAdd}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" />
                <span>Add Experience</span>
            </button>
        </div>
    );
};

// Education Mobile Component  
const EducationMobile: React.FC = () => {
    const { resume, addEducation, removeEducation, autosaveResume } = useResumeStore();
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleAdd = () => {
        const newEdu = {
            id: crypto.randomUUID(),
            degree: "",
            field_of_study: "",
            school_name: "",
            city: "",
            country: "",
            start_date: "",
            end_date: "",
            is_current: false,
            description: "",
            order: resume?.educations?.length || 0,
        };
        addEducation(newEdu);
        setEditingId(newEdu.id);
        autosaveResume();
    };

    const handleDelete = async (id: string) => {
        await removeEducation(id);
        autosaveResume();
    };

    return (
        <div className="space-y-3">
            {resume?.educations?.map((edu) => (
                <ItemCard
                    key={edu.id}
                    title={edu.degree || "Untitled Degree"}
                    subtitle={edu.school_name}
                    onEdit={() => setEditingId(edu.id)}
                    onDelete={() => handleDelete(edu.id)}
                    isEditing={editingId === edu.id}
                    onClose={() => setEditingId(null)}
                >
                    <EducationForm eduId={edu.id} />
                </ItemCard>
            ))}
            <button
                onClick={handleAdd}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" />
                <span>Add Education</span>
            </button>
        </div>
    );
};

// Skills Mobile Component
const SkillsMobile: React.FC = () => {
    const { resume, updateSkillCategories, autosaveResume } = useResumeStore();
    const [newSkill, setNewSkill] = useState("");

    const handleAddSkill = () => {
        if (!newSkill.trim()) return;

        const existingCategories = resume?.skill_categories || [];
        let skillsCategory = existingCategories.find(cat => cat.name === "Skills");

        if (!skillsCategory) {
            skillsCategory = {
                id: crypto.randomUUID(),
                name: "Skills",
                order: existingCategories.length,
                items: [],
            };
            existingCategories.push(skillsCategory);
        }

        skillsCategory.items.push({
            id: crypto.randomUUID(),
            name: newSkill,
            level: "intermediate",
            order: skillsCategory.items.length,
        });

        updateSkillCategories([...existingCategories]);
        setNewSkill("");
        autosaveResume();
    };

    const handleDeleteSkill = async (catId: string, skillId: string) => {
        const updated = (resume?.skill_categories || []).map(cat => {
            if (cat.id === catId) {
                return {
                    ...cat,
                    items: cat.items.filter(item => item.id !== skillId)
                };
            }
            return cat;
        });
        await updateSkillCategories(updated);
        autosaveResume();
    };

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    placeholder="Add a skill..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {resume?.skill_categories?.flatMap(cat =>
                    cat.items.map(skill => (
                        <span
                            key={skill.id}
                            className="px-3 py-1.5 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                        >
                            {skill.name}
                            <button
                                onClick={() => handleDeleteSkill(cat.id, skill.id)}
                                className="text-gray-500 hover:text-red-600"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </span>
                    ))
                )}
            </div>
        </div>
    );
};

// Strengths Mobile
const StrengthsMobile: React.FC = () => {
    const { resume, updateStrengths, autosaveResume } = useResumeStore();
    const [newStrength, setNewStrength] = useState("");

    const handleAdd = () => {
        if (!newStrength.trim()) return;
        const updated = [...(resume?.strengths || []), {
            id: crypto.randomUUID(),
            label: newStrength,
            order: resume?.strengths?.length || 0,
        }];
        updateStrengths(updated);
        setNewStrength("");
        autosaveResume();
    };

    const handleDelete = async (id: string) => {
        const updated = (resume?.strengths || []).filter(s => s.id !== id);
        await updateStrengths(updated);
        autosaveResume();
    };

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newStrength}
                    onChange={(e) => setNewStrength(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAdd()}
                    placeholder="Add a strength..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {resume?.strengths?.map(strength => (
                    <span key={strength.id} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                        {strength.label}
                        <button onClick={() => handleDelete(strength.id)} className="text-gray-500 hover:text-red-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

// Hobbies Mobile
const HobbiesMobile: React.FC = () => {
    const { resume, updateHobbies, autosaveResume } = useResumeStore();
    const [newHobby, setNewHobby] = useState("");

    const handleAdd = () => {
        if (!newHobby.trim()) return;
        const updated = [...(resume?.hobbies || []), {
            id: crypto.randomUUID(),
            label: newHobby,
            order: resume?.hobbies?.length || 0,
        }];
        updateHobbies(updated);
        setNewHobby("");
        autosaveResume();
    };

    const handleDelete = async (id: string) => {
        const updated = (resume?.hobbies || []).filter(h => h.id !== id);
        await updateHobbies(updated);
        autosaveResume();
    };

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAdd()}
                    placeholder="Add a hobby..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {resume?.hobbies?.map(hobby => (
                    <span key={hobby.id} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                        {hobby.label}
                        <button onClick={() => handleDelete(hobby.id)} className="text-gray-500 hover:text-red-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

// Helper Components
const ItemCard: React.FC<{
    title: string;
    subtitle?: string;
    onEdit: () => void;
    onDelete: () => void;
    isEditing: boolean;
    onClose: () => void;
    children: React.ReactNode;
}> = ({ title, subtitle, onEdit, onDelete, isEditing, onClose, children }) => {
    if (isEditing) {
        return (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                {children}
                <button
                    onClick={onClose}
                    className="mt-3 w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                    Done
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between">
            <div>
                <div className="font-medium text-gray-900">{title}</div>
                {subtitle && <div className="text-sm text-gray-600">{subtitle}</div>}
            </div>
            <div className="flex gap-2">
                <button onClick={onEdit} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={onDelete} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

const InputField: React.FC<{
    label: string;
    value: string;
    onChange: (val: string) => void;
    onBlur?: () => void;
    type?: string;
}> = ({ label, value, onChange, onBlur, type = "text" }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

const TextareaField: React.FC<{
    label: string;
    value: string;
    onChange: (val: string) => void;
    onBlur?: () => void;
}> = ({ label, value, onChange, onBlur }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

// Experience Form
const ExperienceForm: React.FC<{ expId: string }> = ({ expId }) => {
    const { resume, updateExperience, autosaveResume } = useResumeStore();
    const exp = resume?.work_experiences?.find(e => e.id === expId);
    if (!exp) return null;

    return (
        <div className="space-y-3">
            <InputField label="Position Title" value={exp.position_title} onChange={(val) => updateExperience(expId, { position_title: val })} onBlur={() => autosaveResume()} />
            <InputField label="Company Name" value={exp.company_name} onChange={(val) => updateExperience(expId, { company_name: val })} onBlur={() => autosaveResume()} />
            <InputField label="Start Date" value={exp.start_date} onChange={(val) => updateExperience(expId, { start_date: val })} onBlur={() => autosaveResume()} />
            <InputField label="End Date" value={exp.end_date} onChange={(val) => updateExperience(expId, { end_date: val })} onBlur={() => autosaveResume()} />
            <InputField label="City" value={exp.city} onChange={(val) => updateExperience(expId, { city: val })} onBlur={() => autosaveResume()} />
            <InputField label="Country" value={exp.country} onChange={(val) => updateExperience(expId, { country: val })} onBlur={() => autosaveResume()} />
            <TextareaField label="Description" value={exp.description} onChange={(val) => updateExperience(expId, { description: val })} onBlur={() => autosaveResume()} />
        </div>
    );
};

// Education Form
const EducationForm: React.FC<{ eduId: string }> = ({ eduId }) => {
    const { resume, updateEducation, autosaveResume } = useResumeStore();
    const edu = resume?.educations?.find(e => e.id === eduId);
    if (!edu) return null;

    return (
        <div className="space-y-3">
            <InputField label="Degree" value={edu.degree} onChange={(val) => updateEducation(eduId, { degree: val })} onBlur={() => autosaveResume()} />
            <InputField label="Field of Study" value={edu.field_of_study} onChange={(val) => updateEducation(eduId, { field_of_study: val })} onBlur={() => autosaveResume()} />
            <InputField label="School Name" value={edu.school_name} onChange={(val) => updateEducation(eduId, { school_name: val })} onBlur={() => autosaveResume()} />
            <InputField label="Start Date" value={edu.start_date} onChange={(val) => updateEducation(eduId, { start_date: val })} onBlur={() => autosaveResume()} />
            <InputField label="End Date" value={edu.end_date} onChange={(val) => updateEducation(eduId, { end_date: val })} onBlur={() => autosaveResume()} />
            <InputField label="City" value={edu.city} onChange={(val) => updateEducation(eduId, { city: val })} onBlur={() => autosaveResume()} />
            <InputField label="Country" value={edu.country} onChange={(val) => updateEducation(eduId, { country: val })} onBlur={() => autosaveResume()} />
        </div>
    );
};

// Custom Section Mobile
const CustomSectionMobile: React.FC<{ sectionId: string }> = ({ sectionId }) => {
    const { resume, updateCustomSections, autosaveResume } = useResumeStore();
    const [editingItemId, setEditingItemId] = useState<string | null>(null);

    const section = resume?.custom_sections?.find(s => s.id === sectionId);
    if (!section) return null;

    const handleAddItem = () => {
        const newItem = {
            id: crypto.randomUUID(),
            title: "",
            subtitle: "",
            meta: "",
            description: "",
            start_date: "",
            end_date: "",
            is_current: false,
            order: section.items.length,
        };

        const updated = (resume?.custom_sections || []).map(s => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    items: [...s.items, newItem]
                };
            }
            return s;
        });

        updateCustomSections(updated);
        setEditingItemId(newItem.id);
        autosaveResume();
    };

    const handleDeleteItem = (itemId: string) => {
        const updated = (resume?.custom_sections || []).map(s => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    items: s.items.filter(item => item.id !== itemId)
                };
            }
            return s;
        });
        updateCustomSections(updated);
        autosaveResume();
    };

    const handleUpdateItem = (itemId: string, field: string, value: string) => {
        const updated = (resume?.custom_sections || []).map(s => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    items: s.items.map(item =>
                        item.id === itemId ? { ...item, [field]: value } : item
                    )
                };
            }
            return s;
        });
        updateCustomSections(updated);
    };

    return (
        <div className="space-y-3">
            {section.items.map((item) => (
                <ItemCard
                    key={item.id}
                    title={item.title || "Untitled"}
                    subtitle={item.subtitle}
                    onEdit={() => setEditingItemId(item.id)}
                    onDelete={() => handleDeleteItem(item.id)}
                    isEditing={editingItemId === item.id}
                    onClose={() => setEditingItemId(null)}
                >
                    <div className="space-y-3">
                        <InputField
                            label="Title"
                            value={item.title}
                            onChange={(val) => handleUpdateItem(item.id, 'title', val)}
                            onBlur={() => autosaveResume()}
                        />
                        <InputField
                            label="Subtitle"
                            value={item.subtitle || ""}
                            onChange={(val) => handleUpdateItem(item.id, 'subtitle', val)}
                            onBlur={() => autosaveResume()}
                        />
                        <InputField
                            label="Date/Location"
                            value={item.meta || ""}
                            onChange={(val) => handleUpdateItem(item.id, 'meta', val)}
                            onBlur={() => autosaveResume()}
                        />
                        <TextareaField
                            label="Description"
                            value={item.description || ""}
                            onChange={(val) => handleUpdateItem(item.id, 'description', val)}
                            onBlur={() => autosaveResume()}
                        />
                    </div>
                </ItemCard>
            ))}
            <button
                onClick={handleAddItem}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" />
                <span>Add Item</span>
            </button>
        </div>
    );
};
