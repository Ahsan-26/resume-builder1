import React from 'react';
import { Resume, TemplateStyle } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import { EditableField } from './EditableField';
import { useResumeStore } from '@/store/useResumeStore';

interface SectionProps {
    resume: Resume;
    style: TemplateStyle;
    isEditable?: boolean;
}

export const PersonalInfoSection: React.FC<SectionProps> = ({ resume, style, isEditable = false }) => {
    const { personal_info } = resume;
    const { updatePersonalInfo } = useResumeStore();

    if (!personal_info) return null;

    return (
        <div className="mb-6">
            <h1 style={{
                fontSize: `${2.25 * style.heading_scale}rem`,
                color: style.primary_color,
                lineHeight: 1.2
            }} className="font-bold mb-2 flex flex-wrap gap-2 items-baseline">
                <EditableField
                    value={personal_info.first_name}
                    onChange={(val) => updatePersonalInfo({ first_name: val })}
                    placeholder="First Name"
                    isEditable={isEditable}
                />
                <span style={{ color: style.accent_color }}>
                    <EditableField
                        value={personal_info.last_name}
                        onChange={(val) => updatePersonalInfo({ last_name: val })}
                        placeholder="Last Name"
                        isEditable={isEditable}
                    />
                </span>
            </h1>
            <div className="text-xl text-gray-500 font-medium mb-4">
                <EditableField
                    value={personal_info.headline}
                    onChange={(val) => updatePersonalInfo({ headline: val })}
                    placeholder="Professional Headline"
                    isEditable={isEditable}
                />
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <Mail size={14} />
                    <EditableField
                        value={personal_info.email}
                        onChange={(val) => updatePersonalInfo({ email: val })}
                        placeholder="Email"
                        isEditable={isEditable}
                    />
                </div>
                <div className="flex items-center gap-1">
                    <Phone size={14} />
                    <EditableField
                        value={personal_info.phone}
                        onChange={(val) => updatePersonalInfo({ phone: val })}
                        placeholder="Phone"
                        isEditable={isEditable}
                    />
                </div>
                <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <EditableField
                        value={personal_info.city}
                        onChange={(val) => updatePersonalInfo({ city: val })}
                        placeholder="City"
                        isEditable={isEditable}
                    />
                    ,
                    <EditableField
                        value={personal_info.country}
                        onChange={(val) => updatePersonalInfo({ country: val })}
                        placeholder="Country"
                        isEditable={isEditable}
                    />
                </div>
                {(personal_info.website || isEditable) && (
                    <div className="flex items-center gap-1">
                        <Globe size={14} />
                        <EditableField
                            value={personal_info.website}
                            onChange={(val) => updatePersonalInfo({ website: val })}
                            placeholder="Website"
                            isEditable={isEditable}
                        />
                    </div>
                )}
                {(personal_info.linkedin_url || isEditable) && (
                    <div className="flex items-center gap-1">
                        <Linkedin size={14} />
                        <EditableField
                            value={personal_info.linkedin_url}
                            onChange={(val) => updatePersonalInfo({ linkedin_url: val })}
                            placeholder="LinkedIn URL"
                            isEditable={isEditable}
                        />
                    </div>
                )}
            </div>

            <div className="mt-4">
                <p style={{ lineHeight: style.line_height }} className="text-gray-700">
                    <EditableField
                        value={personal_info.summary}
                        onChange={(val) => updatePersonalInfo({ summary: val })}
                        placeholder="Write a professional summary..."
                        multiline
                        isEditable={isEditable}
                    />
                </p>
            </div>
        </div>
    );
};

export const ExperienceSection: React.FC<SectionProps> = ({ resume, style, isEditable = false }) => {
    const { work_experiences } = resume;
    const { updateExperience, removeExperience } = useResumeStore();

    if (!work_experiences?.length && !isEditable) return null;

    return (
        <div className="mb-6">
            <h2 style={{
                color: style.primary_color,
                fontSize: `${1.25 * style.heading_scale}rem`,
                borderColor: style.accent_color
            }} className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4">
                Experience
            </h2>
            <div className="flex flex-col gap-6">
                {work_experiences.map((exp) => (
                    <div key={exp.id} className="group relative">
                        {isEditable && (
                            <button
                                onClick={() => removeExperience(exp.id)}
                                className="absolute -right-2 -top-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10"
                                title="Delete"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        )}
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-lg font-bold text-gray-800">
                                <EditableField
                                    value={exp.position_title}
                                    onChange={(val) => updateExperience(exp.id, { position_title: val })}
                                    placeholder="Position Title"
                                    isEditable={isEditable}
                                />
                            </h3>
                            <span className="text-sm text-gray-500 flex gap-1">
                                <EditableField
                                    value={exp.start_date}
                                    onChange={(val) => updateExperience(exp.id, { start_date: val })}
                                    placeholder="Start Date"
                                    isEditable={isEditable}
                                />
                                —
                                {exp.is_current ? "Present" : (
                                    <EditableField
                                        value={exp.end_date}
                                        onChange={(val) => updateExperience(exp.id, { end_date: val })}
                                        placeholder="End Date"
                                        isEditable={isEditable}
                                    />
                                )}
                            </span>
                        </div>
                        <div style={{ color: style.accent_color }} className="font-medium mb-2 flex gap-1">
                            <EditableField
                                value={exp.company_name}
                                onChange={(val) => updateExperience(exp.id, { company_name: val })}
                                placeholder="Company Name"
                                isEditable={isEditable}
                            />
                            |
                            <EditableField
                                value={exp.city}
                                onChange={(val) => updateExperience(exp.id, { city: val })}
                                placeholder="City"
                                isEditable={isEditable}
                            />
                        </div>
                        <p style={{ lineHeight: style.line_height }} className="text-gray-600 whitespace-pre-line">
                            <EditableField
                                value={exp.description}
                                onChange={(val) => updateExperience(exp.id, { description: val })}
                                placeholder="Job Description..."
                                multiline
                                isEditable={isEditable}
                            />
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const EducationSection: React.FC<SectionProps> = ({ resume, style, isEditable = false }) => {
    const { educations } = resume;
    const { updateEducation, removeEducation } = useResumeStore();

    if (!educations?.length && !isEditable) return null;

    return (
        <div className="mb-6">
            <h2 style={{
                color: style.primary_color,
                fontSize: `${1.25 * style.heading_scale}rem`,
                borderColor: style.accent_color
            }} className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4">
                Education
            </h2>
            <div className="flex flex-col gap-4">
                {educations?.map((edu) => (
                    <div key={edu.id} className="group relative">
                        {isEditable && (
                            <button
                                onClick={() => removeEducation(edu.id)}
                                className="absolute -right-2 -top-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10"
                                title="Delete"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        )}
                        <div className="font-bold text-gray-800">
                            <EditableField
                                value={edu.school_name}
                                onChange={(val) => updateEducation(edu.id, { school_name: val })}
                                placeholder="School Name"
                                isEditable={isEditable}
                            />
                        </div>
                        <div style={{ color: style.accent_color }} className="font-medium">
                            <EditableField
                                value={edu.degree}
                                onChange={(val) => updateEducation(edu.id, { degree: val })}
                                placeholder="Degree"
                                isEditable={isEditable}
                            />
                        </div>
                        <div className="text-gray-500 italic">
                            <EditableField
                                value={edu.field_of_study}
                                onChange={(val) => updateEducation(edu.id, { field_of_study: val })}
                                placeholder="Field of Study"
                                isEditable={isEditable}
                            />
                        </div>
                        <div className="text-xs text-gray-400 mt-1 flex gap-1">
                            <EditableField
                                value={edu.start_date}
                                onChange={(val) => updateEducation(edu.id, { start_date: val })}
                                placeholder="Start Date"
                                isEditable={isEditable}
                            />
                            —
                            {edu.is_current ? "Present" : (
                                <EditableField
                                    value={edu.end_date}
                                    onChange={(val) => updateEducation(edu.id, { end_date: val })}
                                    placeholder="End Date"
                                    isEditable={isEditable}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

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
                                    className="group/skill relative px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 font-medium hover:bg-gray-200 transition-colors"
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
                        className="group relative px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 font-medium hover:bg-gray-200 transition-colors"
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
                        className="group relative px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 font-medium hover:bg-gray-200 transition-colors"
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

export const CustomSectionRenderer: React.FC<SectionProps & { sectionId: string }> = ({ resume, style, sectionId, isEditable = false }) => {
    const { custom_sections } = resume;
    const { updateCustomSections } = useResumeStore();

    if (!custom_sections?.length) return null;

    return (
        <div className="flex flex-col gap-8">
            {custom_sections.map((section, sIdx) => (
                <div key={section.id} className="mb-2 group relative">
                    {isEditable && (
                        <button
                            onClick={() => {
                                const updated = custom_sections.filter(s => s.id !== section.id);
                                updateCustomSections(updated);
                            }}
                            className="absolute -right-2 -top-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10"
                            title="Delete Section"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    )}
                    <h2 style={{
                        color: style.primary_color,
                        fontSize: `${1.25 * style.heading_scale}rem`,
                        borderColor: style.accent_color
                    }} className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4">
                        <EditableField
                            value={section.title}
                            onChange={(val) => {
                                const newSections = [...custom_sections];
                                newSections[sIdx] = { ...section, title: val };
                                updateCustomSections(newSections);
                            }}
                            placeholder="Section Title"
                            isEditable={isEditable}
                        />
                    </h2>
                    <div className="flex flex-col gap-6">
                        {section.items.map((item, iIdx) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        <EditableField
                                            value={item.title}
                                            onChange={(val) => {
                                                const newSections = [...custom_sections];
                                                const newItems = [...section.items];
                                                newItems[iIdx] = { ...item, title: val };
                                                newSections[sIdx] = { ...section, items: newItems };
                                                updateCustomSections(newSections);
                                            }}
                                            placeholder="Item Title"
                                            isEditable={isEditable}
                                        />
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        <EditableField
                                            value={item.meta}
                                            onChange={(val) => {
                                                const newSections = [...custom_sections];
                                                const newItems = [...section.items];
                                                newItems[iIdx] = { ...item, meta: val };
                                                newSections[sIdx] = { ...section, items: newItems };
                                                updateCustomSections(newSections);
                                            }}
                                            placeholder="Date/Location"
                                            isEditable={isEditable}
                                        />
                                    </span>
                                </div>
                                <div style={{ color: style.accent_color }} className="font-medium mb-2">
                                    <EditableField
                                        value={item.subtitle}
                                        onChange={(val) => {
                                            const newSections = [...custom_sections];
                                            const newItems = [...section.items];
                                            newItems[iIdx] = { ...item, subtitle: val };
                                            newSections[sIdx] = { ...section, items: newItems };
                                            updateCustomSections(newSections);
                                        }}
                                        placeholder="Subtitle"
                                        isEditable={isEditable}
                                    />
                                </div>
                                <p style={{ lineHeight: style.line_height }} className="text-gray-600 whitespace-pre-line">
                                    <EditableField
                                        value={item.description}
                                        onChange={(val) => {
                                            const newSections = [...custom_sections];
                                            const newItems = [...section.items];
                                            newItems[iIdx] = { ...item, description: val };
                                            newSections[sIdx] = { ...section, items: newItems };
                                            updateCustomSections(newSections);
                                        }}
                                        placeholder="Description..."
                                        multiline
                                        isEditable={isEditable}
                                    />
                                </p>
                            </div>
                        ))}
                        {isEditable && (
                            <button
                                onClick={() => {
                                    const newSections = [...custom_sections];
                                    const newItem = {
                                        id: crypto.randomUUID(),
                                        title: "New Item",
                                        subtitle: "Subtitle",
                                        meta: "2024",
                                        description: "Click to edit description",
                                        start_date: "",
                                        end_date: "",
                                        is_current: false,
                                        order: section.items.length,
                                    };
                                    newSections[sIdx] = { ...section, items: [...section.items, newItem] };
                                    updateCustomSections(newSections);
                                }}
                                className="mt-4 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add Item
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
