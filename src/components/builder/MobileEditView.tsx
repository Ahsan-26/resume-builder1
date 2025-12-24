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
            <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
                <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
                    <button onClick={() => setShowPreview(false)} className="flex items-center gap-2 text-gray-700">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Edit</span>
                    </button>
                </div>
                <div className="flex-1 overflow-auto p-4 flex justify-center items-start bg-gray-200">
                    <div className="w-full max-w-full flex justify-center">
                        <BuilderPreview isEditable={false} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 z-10 shadow-sm">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-4 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/dashboard/resumes" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-semibold">Back to Dashboard</span>
                        </Link>
                        <button
                            onClick={() => saveResume()}
                            disabled={isSaving}
                            className="px-6 py-2 bg-white text-blue-700 rounded-full font-bold shadow-lg hover:bg-blue-50 transition-all disabled:opacity-50 active:scale-95"
                        >
                            {isSaving ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
                                    <span>Saving...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    <span>Save Changes</span>
                                </div>
                            )}
                        </button>
                    </div>
                    <h1 className="text-xl font-bold truncate">{resume.title || "Untitled Resume"}</h1>
                </div>
                <div className="flex gap-3 p-3 bg-gray-50">
                    <button
                        onClick={() => setShowPreview(true)}
                        className="flex-1 py-2.5 px-4 bg-white text-gray-700 border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-semibold transition-all active:scale-95"
                    >
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span>Live Preview</span>
                    </button>
                    <button
                        onClick={() => setShowRearrange(true)}
                        className="flex-1 py-2.5 px-4 bg-white text-gray-700 border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-semibold transition-all active:scale-95"
                    >
                        <Layout className="w-4 h-4 text-indigo-600" />
                        <span>Rearrange</span>
                    </button>
                </div>
            </div>

            <RearrangeModal isOpen={showRearrange} onClose={() => setShowRearrange(false)} />

            {/* Content - Centered Form */}
            <div className="flex-1 overflow-auto">
                <div className="max-w-2xl mx-auto p-4 space-y-4">
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
        <div className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 ${isExpanded ? "border-blue-200 ring-4 ring-blue-50" : "border-gray-200"}`}>
            <button
                onClick={onToggle}
                className="w-full px-5 py-4 flex items-center justify-between font-bold text-left"
            >
                <span className={isExpanded ? "text-blue-700" : "text-gray-700"}>{title}</span>
                <div className={`p-1 rounded-full transition-all ${isExpanded ? "bg-blue-100 text-blue-700 rotate-180" : "bg-gray-100 text-gray-400"}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            {isExpanded && (
                <div className="px-5 pb-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="h-px bg-gray-100 mb-5" />
                    {children}
                </div>
            )}
        </div>
    );
};

// Personal Info Mobile Component
const PersonalInfoMobile: React.FC = () => {
    const { resume, updatePersonalInfo, autosaveResume } = useResumeStore();
    const personal_info = resume?.personal_info || {} as any;

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <InputField
                label="Professional Headline"
                value={personal_info.headline || ""}
                onChange={(val) => updatePersonalInfo({ headline: val })}
                onBlur={() => autosaveResume()}
                placeholder="e.g. Senior Software Engineer"
            />
            <TextareaField
                label="Professional Summary"
                value={personal_info.summary || ""}
                onChange={(val) => updatePersonalInfo({ summary: val })}
                onBlur={() => autosaveResume()}
                placeholder="Briefly describe your career goals and achievements..."
            />
            <InputField
                label="Email Address"
                type="email"
                value={personal_info.email || ""}
                onChange={(val) => updatePersonalInfo({ email: val })}
                onBlur={() => autosaveResume()}
                validate={(val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : "Please enter a valid email address"}
            />
            <InputField
                label="Phone Number"
                value={personal_info.phone || ""}
                onChange={(val) => updatePersonalInfo({ phone: val })}
                onBlur={() => autosaveResume()}
            />
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div className="space-y-4 pt-2 border-t border-gray-100">
                <InputField
                    label="Website"
                    value={personal_info.website || ""}
                    onChange={(val) => updatePersonalInfo({ website: val })}
                    onBlur={() => autosaveResume()}
                    placeholder="https://yourwebsite.com"
                />
                <InputField
                    label="LinkedIn Profile"
                    value={personal_info.linkedin_url || ""}
                    onChange={(val) => updatePersonalInfo({ linkedin_url: val })}
                    onBlur={() => autosaveResume()}
                    placeholder="https://linkedin.com/in/username"
                />
                <InputField
                    label="GitHub Profile"
                    value={personal_info.github_url || ""}
                    onChange={(val) => updatePersonalInfo({ github_url: val })}
                    onBlur={() => autosaveResume()}
                    placeholder="https://github.com/username"
                />
                <InputField
                    label="Portfolio"
                    value={personal_info.portfolio_url || ""}
                    onChange={(val) => updatePersonalInfo({ portfolio_url: val })}
                    onBlur={() => autosaveResume()}
                    placeholder="https://portfolio.com"
                />
            </div>
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
            bullets: [],
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
        <div className="space-y-4">
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
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-bold active:scale-95"
            >
                <div className="p-1 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                    <Plus className="w-5 h-5" />
                </div>
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
        <div className="space-y-4">
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
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-bold active:scale-95"
            >
                <div className="p-1 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                    <Plus className="w-5 h-5" />
                </div>
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
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    placeholder="Add a skill (e.g. React)..."
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
                />
                <button
                    onClick={handleAddSkill}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 active:scale-95 transition-all"
                >
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
                {resume?.skill_categories?.flatMap(cat =>
                    cat.items.map(skill => (
                        <span
                            key={skill.id}
                            className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm animate-in zoom-in-95 duration-200"
                        >
                            {skill.name}
                            <button
                                onClick={() => handleDeleteSkill(cat.id, skill.id)}
                                className="p-0.5 hover:bg-blue-100 rounded-full transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </span>
                    ))
                )}
                {(!resume?.skill_categories || resume.skill_categories.every(c => c.items.length === 0)) && (
                    <p className="text-sm text-gray-400 italic w-full text-center py-4">No skills added yet.</p>
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
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newStrength}
                    onChange={(e) => setNewStrength(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAdd()}
                    placeholder="Add a strength (e.g. Leadership)..."
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm"
                />
                <button
                    onClick={handleAdd}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 active:scale-95 transition-all"
                >
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
                {resume?.strengths?.map(strength => (
                    <span
                        key={strength.id}
                        className="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm animate-in zoom-in-95 duration-200"
                    >
                        {strength.label}
                        <button
                            onClick={() => handleDelete(strength.id)}
                            className="p-0.5 hover:bg-indigo-100 rounded-full transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </span>
                ))}
                {(!resume?.strengths || resume.strengths.length === 0) && (
                    <p className="text-sm text-gray-400 italic w-full text-center py-4">No strengths added yet.</p>
                )}
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
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAdd()}
                    placeholder="Add a hobby (e.g. Reading)..."
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all shadow-sm"
                />
                <button
                    onClick={handleAdd}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
                >
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
                {resume?.hobbies?.map(hobby => (
                    <span
                        key={hobby.id}
                        className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm animate-in zoom-in-95 duration-200"
                    >
                        {hobby.label}
                        <button
                            onClick={() => handleDelete(hobby.id)}
                            className="p-0.5 hover:bg-emerald-100 rounded-full transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </span>
                ))}
                {(!resume?.hobbies || resume.hobbies.length === 0) && (
                    <p className="text-sm text-gray-400 italic w-full text-center py-4">No hobbies added yet.</p>
                )}
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
            <div className="bg-white p-5 rounded-2xl border-2 border-blue-100 shadow-md animate-in zoom-in-95 duration-200">
                {children}
                <button
                    onClick={onClose}
                    className="mt-5 w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
                >
                    Done
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:bg-white hover:shadow-md hover:border-blue-100 transition-all group">
            <div className="flex-1 min-w-0 pr-4">
                <div className="font-bold text-gray-900 truncate">{title}</div>
                {subtitle && <div className="text-sm text-gray-500 truncate mt-0.5">{subtitle}</div>}
            </div>
            <div className="flex gap-2 shrink-0">
                <button onClick={onEdit} className="p-2.5 text-blue-600 bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-blue-50 hover:border-blue-200 transition-all active:scale-90">
                    <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={onDelete} className="p-2.5 text-red-500 bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-red-50 hover:border-red-200 transition-all active:scale-90">
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
    placeholder?: string;
    validate?: (val: string) => string | null;
}> = ({ label, value, onChange, onBlur, type = "text", placeholder, validate }) => {
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        onChange(val);
        if (validate) {
            setError(validate(val));
        }
    };

    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-4 transition-all ${error
                    ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                    : "border-gray-200 focus:ring-blue-100 focus:border-blue-400"
                    }`}
            />
            {error && <p className="text-xs text-red-500 font-medium ml-1 animate-in fade-in slide-in-from-top-1">{error}</p>}
        </div>
    );
};

const TextareaField: React.FC<{
    label: string;
    value: string;
    onChange: (val: string) => void;
    onBlur?: () => void;
    placeholder?: string;
}> = ({ label, value, onChange, onBlur, placeholder }) => {
    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                rows={4}
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all resize-none"
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
        <div className="space-y-4">
            <InputField label="Position Title" value={exp.position_title} onChange={(val) => updateExperience(expId, { position_title: val })} onBlur={() => autosaveResume()} placeholder="e.g. Senior Developer" />
            <InputField label="Company Name" value={exp.company_name} onChange={(val) => updateExperience(expId, { company_name: val })} onBlur={() => autosaveResume()} placeholder="e.g. Google" />

            <div className="flex items-center gap-2 py-2">
                <input
                    type="checkbox"
                    id={`current-${expId}`}
                    checked={exp.is_current}
                    onChange={(e) => {
                        updateExperience(expId, { is_current: e.target.checked });
                        autosaveResume();
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`current-${expId}`} className="text-sm font-medium text-gray-700">I currently work here</label>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <InputField label="Start Date" value={exp.start_date} onChange={(val) => updateExperience(expId, { start_date: val })} onBlur={() => autosaveResume()} placeholder="MM/YYYY" />
                {!exp.is_current && (
                    <InputField label="End Date" value={exp.end_date} onChange={(val) => updateExperience(expId, { end_date: val })} onBlur={() => autosaveResume()} placeholder="MM/YYYY" />
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <InputField label="City" value={exp.city} onChange={(val) => updateExperience(expId, { city: val })} onBlur={() => autosaveResume()} />
                <InputField label="Country" value={exp.country} onChange={(val) => updateExperience(expId, { country: val })} onBlur={() => autosaveResume()} />
            </div>

            <TextareaField label="Description" value={exp.description} onChange={(val) => updateExperience(expId, { description: val })} onBlur={() => autosaveResume()} placeholder="Describe your role and impact..." />
            <TextareaField
                label="Key Achievements (Bullets)"
                value={Array.isArray(exp.bullets) ? exp.bullets.join('\n') : (exp.bullets || "")}
                onChange={(val) => updateExperience(expId, { bullets: val.split('\n').filter(b => b.trim() !== "") })}
                onBlur={() => autosaveResume()}
                placeholder="Achieved X using Y..."
            />
        </div>
    );
};

// Education Form
const EducationForm: React.FC<{ eduId: string }> = ({ eduId }) => {
    const { resume, updateEducation, autosaveResume } = useResumeStore();
    const edu = resume?.educations?.find(e => e.id === eduId);
    if (!edu) return null;

    return (
        <div className="space-y-4">
            <InputField label="Degree" value={edu.degree} onChange={(val) => updateEducation(eduId, { degree: val })} onBlur={() => autosaveResume()} placeholder="e.g. Bachelor of Science" />
            <InputField label="Field of Study" value={edu.field_of_study} onChange={(val) => updateEducation(eduId, { field_of_study: val })} onBlur={() => autosaveResume()} placeholder="e.g. Computer Science" />
            <InputField label="School Name" value={edu.school_name} onChange={(val) => updateEducation(eduId, { school_name: val })} onBlur={() => autosaveResume()} placeholder="e.g. Stanford University" />

            <div className="flex items-center gap-2 py-2">
                <input
                    type="checkbox"
                    id={`edu-current-${eduId}`}
                    checked={edu.is_current}
                    onChange={(e) => {
                        updateEducation(eduId, { is_current: e.target.checked });
                        autosaveResume();
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`edu-current-${eduId}`} className="text-sm font-medium text-gray-700">I currently study here</label>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <InputField label="Start Date" value={edu.start_date} onChange={(val) => updateEducation(eduId, { start_date: val })} onBlur={() => autosaveResume()} placeholder="MM/YYYY" />
                {!edu.is_current && (
                    <InputField label="End Date" value={edu.end_date} onChange={(val) => updateEducation(eduId, { end_date: val })} onBlur={() => autosaveResume()} placeholder="MM/YYYY" />
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <InputField label="City" value={edu.city} onChange={(val) => updateEducation(eduId, { city: val })} onBlur={() => autosaveResume()} />
                <InputField label="Country" value={edu.country} onChange={(val) => updateEducation(eduId, { country: val })} onBlur={() => autosaveResume()} />
            </div>
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
        <div className="space-y-4">
            {section.items.map((item) => (
                <ItemCard
                    key={item.id}
                    title={item.title || "Untitled Item"}
                    subtitle={item.subtitle}
                    onEdit={() => setEditingItemId(item.id)}
                    onDelete={() => handleDeleteItem(item.id)}
                    isEditing={editingItemId === item.id}
                    onClose={() => setEditingItemId(null)}
                >
                    <div className="space-y-4">
                        <InputField
                            label="Title"
                            value={item.title}
                            onChange={(val) => handleUpdateItem(item.id, 'title', val)}
                            onBlur={() => autosaveResume()}
                            placeholder="e.g. Project Name or Award"
                        />
                        <InputField
                            label="Subtitle"
                            value={item.subtitle || ""}
                            onChange={(val) => handleUpdateItem(item.id, 'subtitle', val)}
                            onBlur={() => autosaveResume()}
                            placeholder="e.g. Organization or Link"
                        />
                        <InputField
                            label="Date/Location"
                            value={item.meta || ""}
                            onChange={(val) => handleUpdateItem(item.id, 'meta', val)}
                            onBlur={() => autosaveResume()}
                            placeholder="e.g. Jan 2023 - Present"
                        />
                        <TextareaField
                            label="Description"
                            value={item.description || ""}
                            onChange={(val) => handleUpdateItem(item.id, 'description', val)}
                            onBlur={() => autosaveResume()}
                            placeholder="Provide more details..."
                        />
                    </div>
                </ItemCard>
            ))}
            <button
                onClick={handleAddItem}
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-bold active:scale-95"
            >
                <div className="p-1 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                    <Plus className="w-5 h-5" />
                </div>
                <span>Add New Item</span>
            </button>
        </div>
    );
};
