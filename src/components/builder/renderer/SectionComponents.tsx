import React from 'react';
import { Resume, TemplateStyle, WorkExperience, Education, SkillCategory, SkillItem, CustomSection, CustomSectionItem } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Eye, EyeOff, Plus } from 'lucide-react';
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

    const displayMode = resume.template?.definition?.sections?.personal_info?.display || 'left';
    const isCentered = displayMode === 'centered';

    return (
        <div className={`mb-6 ${isCentered ? 'text-center' : ''}`}>
            <h1 style={{
                fontSize: `${2.25 * style.heading_scale}rem`,
                color: style.primary_color,
                lineHeight: 1.2
            }} className={`font-bold mb-2 flex flex-wrap gap-2 items-baseline ${isCentered ? 'justify-center' : ''}`}>
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

            <div className={`flex flex-wrap gap-4 text-sm text-gray-600 ${isCentered ? 'justify-center' : ''}`}>
                <div className="flex items-center gap-1">
                    <Mail size={14} />
                    <EditableField
                        value={personal_info.email}
                        onChange={(val) => updatePersonalInfo({ email: val })}
                        placeholder="Email"
                        isEditable={isEditable}
                        validate={(val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : "Invalid email"}
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
                {(personal_info.website !== undefined || isEditable) && (
                    <div className="flex items-center gap-1">
                        <Globe size={14} />
                        <EditableField
                            value={personal_info.website || ''}
                            onChange={(val) => updatePersonalInfo({ website: val })}
                            placeholder="Website"
                            isEditable={isEditable}
                        />
                    </div>
                )}
                {(personal_info.linkedin_url !== undefined || isEditable) && (
                    <div className="flex items-center gap-1">
                        <Linkedin size={14} />
                        <EditableField
                            value={personal_info.linkedin_url || ''}
                            onChange={(val) => updatePersonalInfo({ linkedin_url: val })}
                            placeholder="LinkedIn URL"
                            isEditable={isEditable}
                        />
                    </div>
                )}
                {(personal_info.github_url !== undefined || isEditable) && (
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                        <EditableField
                            value={personal_info.github_url || ''}
                            onChange={(val) => updatePersonalInfo({ github_url: val })}
                            placeholder="GitHub URL"
                            isEditable={isEditable}
                        />
                    </div>
                )}
                {(personal_info.portfolio_url !== undefined || isEditable) && (
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" /><path d="M12 12h.01" /></svg>
                        <EditableField
                            value={personal_info.portfolio_url || ''}
                            onChange={(val) => updatePersonalInfo({ portfolio_url: val })}
                            placeholder="Portfolio URL"
                            isEditable={isEditable}
                        />
                    </div>
                )}
            </div>

            <div className="mt-4">
                <p style={{ lineHeight: style.line_height }} className={`text-gray-700 ${isCentered ? 'text-center' : ''}`}>
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
    const { updateExperience, removeExperience, addExperience, updateSectionOrder } = useResumeStore();

    if (!work_experiences?.length && !isEditable) return null;

    const isVisible = resume.section_settings?.work_experiences?.visible !== false;

    const handleAdd = () => {
        const newExp: WorkExperience = {
            id: crypto.randomUUID(),
            position_title: "New Position",
            company_name: "Company Name",
            city: "City",
            country: "Country",
            start_date: "2024",
            end_date: "Present",
            description: "• Job responsibility or achievement",
            bullets: [],
            is_current: true,
            order: work_experiences.length
        };
        addExperience(newExp);
    };

    const toggleVisibility = () => {
        const settings = { ...resume.section_settings };
        settings.work_experiences = {
            ...settings.work_experiences,
            visible: !isVisible,
            order: settings.work_experiences?.order ?? 0
        };
        updateSectionOrder(settings);
    };

    return (
        <div className={`mb-6 ${!isVisible ? 'opacity-50 grayscale' : ''}`}>
            <div className="flex justify-between items-center border-b-2 pb-2 mb-4" style={{ borderColor: style.accent_color }}>
                <h2 style={{
                    color: style.primary_color,
                    fontSize: `${1.25 * style.heading_scale}rem`,
                }} className="font-bold uppercase tracking-wider flex items-center gap-2">
                    Experience
                    {!isVisible && <span className="text-xs font-normal normal-case text-gray-400">(Hidden)</span>}
                </h2>
                {isEditable && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleVisibility}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                            title={isVisible ? "Hide Section" : "Show Section"}
                        >
                            {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button
                            onClick={handleAdd}
                            className="p-1 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"
                            title="Add Experience"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                )}
            </div>
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
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                <EditableField
                                    value={exp.start_date}
                                    onChange={(val) => updateExperience(exp.id, { start_date: val })}
                                    placeholder="Start Date"
                                    isEditable={isEditable}
                                />
                                <span className="mx-0.5">—</span>
                                {exp.is_current ? (
                                    <span className="flex items-center gap-1">
                                        Present
                                        {isEditable && (
                                            <button
                                                onClick={() => updateExperience(exp.id, { is_current: false })}
                                                className="text-[10px] bg-gray-100 hover:bg-gray-200 px-1.5 py-0.5 rounded text-gray-500 transition-colors"
                                                title="Set end date"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </span>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <EditableField
                                            value={exp.end_date}
                                            onChange={(val) => updateExperience(exp.id, { end_date: val })}
                                            placeholder="End Date"
                                            isEditable={isEditable}
                                        />
                                        {isEditable && (
                                            <button
                                                onClick={() => updateExperience(exp.id, { is_current: true })}
                                                className="text-[10px] bg-blue-50 hover:bg-blue-100 px-1.5 py-0.5 rounded text-blue-600 transition-colors"
                                                title="Set to Present"
                                            >
                                                Present
                                            </button>
                                        )}
                                    </div>
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
    const { updateEducation, removeEducation, addEducation, updateSectionOrder } = useResumeStore();

    if (!educations?.length && !isEditable) return null;

    const isVisible = resume.section_settings?.educations?.visible !== false;

    const handleAdd = () => {
        const newEdu: Education = {
            id: crypto.randomUUID(),
            school_name: "School Name",
            degree: "Degree",
            field_of_study: "Field of Study",
            city: "City",
            country: "Country",
            start_date: "2020",
            end_date: "2024",
            is_current: false,
            description: "",
            order: educations.length
        };
        addEducation(newEdu);
    };

    const toggleVisibility = () => {
        const settings = { ...resume.section_settings };
        settings.educations = {
            ...settings.educations,
            visible: !isVisible,
            order: settings.educations?.order ?? 0
        };
        updateSectionOrder(settings);
    };

    return (
        <div className={`mb-6 ${!isVisible ? 'opacity-50 grayscale' : ''}`}>
            <div className="flex justify-between items-center border-b-2 pb-2 mb-4" style={{ borderColor: style.accent_color }}>
                <h2 style={{
                    color: style.primary_color,
                    fontSize: `${1.25 * style.heading_scale}rem`,
                }} className="font-bold uppercase tracking-wider flex items-center gap-2">
                    Education
                    {!isVisible && <span className="text-xs font-normal normal-case text-gray-400">(Hidden)</span>}
                </h2>
                {isEditable && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleVisibility}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                            title={isVisible ? "Hide Section" : "Show Section"}
                        >
                            {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button
                            onClick={handleAdd}
                            className="p-1 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"
                            title="Add Education"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                )}
            </div>
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
                        <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <EditableField
                                value={edu.start_date}
                                onChange={(val) => updateEducation(edu.id, { start_date: val })}
                                placeholder="Start Date"
                                isEditable={isEditable}
                            />
                            <span className="mx-0.5">—</span>
                            {edu.is_current ? (
                                <span className="flex items-center gap-1">
                                    Present
                                    {isEditable && (
                                        <button
                                            onClick={() => updateEducation(edu.id, { is_current: false })}
                                            className="text-[10px] bg-gray-100 hover:bg-gray-200 px-1.5 py-0.5 rounded text-gray-500 transition-colors"
                                            title="Set end date"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </span>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <EditableField
                                        value={edu.end_date}
                                        onChange={(val) => updateEducation(edu.id, { end_date: val })}
                                        placeholder="End Date"
                                        isEditable={isEditable}
                                    />
                                    {isEditable && (
                                        <button
                                            onClick={() => updateEducation(edu.id, { is_current: true })}
                                            className="text-[10px] bg-blue-50 hover:bg-blue-100 px-1.5 py-0.5 rounded text-blue-600 transition-colors"
                                            title="Set to Present"
                                        >
                                            Present
                                        </button>
                                    )}
                                </div>
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
    const { updateSkillCategories, updateSectionOrder } = useResumeStore();

    if (!skill_categories?.length && !isEditable) return null;

    const isVisible = resume.section_settings?.skill_categories?.visible !== false;

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

    const toggleVisibility = () => {
        const settings = { ...resume.section_settings };
        settings.skill_categories = {
            ...settings.skill_categories,
            visible: !isVisible,
            order: settings.skill_categories?.order ?? 0
        };
        updateSectionOrder(settings);
    };

    const displayMode = resume.template?.definition?.sections?.skill_categories?.display || 'tags';

    return (
        <div className={`mb-6 ${!isVisible ? 'opacity-50 grayscale' : ''}`}>
            <div className="flex justify-between items-center border-b-2 pb-2 mb-4" style={{ borderColor: style.accent_color }}>
                <h2 style={{
                    color: style.primary_color,
                    fontSize: `${1.25 * style.heading_scale}rem`,
                }} className="font-bold uppercase tracking-wider flex items-center gap-2">
                    Skills
                    {!isVisible && <span className="text-xs font-normal normal-case text-gray-400">(Hidden)</span>}
                </h2>
                {isEditable && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleVisibility}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                            title={isVisible ? "Hide Section" : "Show Section"}
                        >
                            {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button
                            onClick={() => {
                                const newCat: SkillCategory = {
                                    id: crypto.randomUUID(),
                                    name: "New Category",
                                    items: [{ id: crypto.randomUUID(), name: "Skill", level: "intermediate", order: 0 }],
                                    order: skill_categories.length
                                };
                                updateSkillCategories([...skill_categories, newCat]);
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"
                            title="Add Skill Category"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-6">
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
                        <div className="flex justify-between items-center mb-3">
                            <div className="font-semibold text-gray-700 text-xs uppercase tracking-wider">
                                <EditableField
                                    value={cat.name}
                                    onChange={(val) => handleUpdateCategoryName(cat.id, val)}
                                    placeholder="Category Name"
                                    isEditable={isEditable}
                                />
                            </div>
                            {isEditable && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const updated = skill_categories.map(c => {
                                            if (c.id === cat.id) {
                                                const newItem: SkillItem = { id: crypto.randomUUID(), name: "New Skill", level: "intermediate", order: c.items.length };
                                                return { ...c, items: [...c.items, newItem] };
                                            }
                                            return c;
                                        });
                                        updateSkillCategories(updated);
                                    }}
                                    className="p-1.5 hover:bg-blue-50 rounded-full text-blue-600 transition-colors border border-transparent hover:border-blue-200"
                                    title="Add Skill"
                                >
                                    <Plus size={16} />
                                </button>
                            )}
                        </div>

                        {displayMode === 'bars' ? (
                            <div className="grid grid-cols-1 gap-x-8 gap-y-4">
                                {cat.items.map((item) => (
                                    <div key={item.id} className="group/skill relative">
                                        <div className="flex justify-between mb-1 text-xs font-medium text-gray-700">
                                            <EditableField
                                                value={item.name}
                                                onChange={(val) => handleUpdateSkillName(cat.id, item.id, val)}
                                                placeholder="Skill"
                                                isEditable={isEditable}
                                            />
                                            <span className="text-gray-400 capitalize">{item.level}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                                            <div
                                                className="h-1.5 rounded-full transition-all duration-500"
                                                style={{
                                                    backgroundColor: style.accent_color,
                                                    width: item.level === 'expert' ? '100%' :
                                                        item.level === 'professional' ? '75%' :
                                                            item.level === 'intermediate' ? '50%' : '25%'
                                                }}
                                            />
                                        </div>
                                        {isEditable && (
                                            <button
                                                onClick={() => handleDeleteSkill(cat.id, item.id)}
                                                className="absolute -right-6 top-0 p-1 text-red-400 opacity-0 group-hover/skill:opacity-100 transition-opacity"
                                            >
                                                <Plus size={14} className="rotate-45" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : displayMode === 'list' ? (
                            <ul className="list-disc list-inside space-y-1">
                                {cat.items.map((item) => (
                                    <li key={item.id} className="group/skill relative text-sm text-gray-700">
                                        <EditableField
                                            value={item.name}
                                            onChange={(val) => handleUpdateSkillName(cat.id, item.id, val)}
                                            placeholder="Skill"
                                            isEditable={isEditable}
                                        />
                                        {isEditable && (
                                            <button
                                                onClick={() => handleDeleteSkill(cat.id, item.id)}
                                                className="ml-2 text-red-400 opacity-0 group-hover/skill:opacity-100 transition-opacity"
                                            >
                                                <Plus size={12} className="rotate-45" />
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {cat.items.map((item) => (
                                    <span
                                        key={item.id}
                                        className="group/skill relative px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 font-medium hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all"
                                    >
                                        <EditableField
                                            value={item.name}
                                            onChange={(val) => handleUpdateSkillName(cat.id, item.id, val)}
                                            placeholder="Skill"
                                            isEditable={isEditable}
                                        />
                                        {isEditable && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteSkill(cat.id, item.id);
                                                }}
                                                className="absolute -right-2 -top-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/skill:opacity-100 transition-all shadow-sm hover:bg-red-600 z-10"
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
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const StrengthsSection: React.FC<SectionProps> = ({ resume, style, isEditable = false }) => {
    const { strengths } = resume;
    const { updateStrengths, updateSectionOrder } = useResumeStore();

    if (!strengths?.length && !isEditable) return null;

    const isVisible = resume.section_settings?.strengths?.visible !== false;

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

    const toggleVisibility = () => {
        const settings = { ...resume.section_settings };
        settings.strengths = {
            ...settings.strengths,
            visible: !isVisible,
            order: settings.strengths?.order ?? 0
        };
        updateSectionOrder(settings);
    };

    return (
        <div className={`mb-6 ${!isVisible ? 'opacity-50 grayscale' : ''}`}>
            <div className="flex justify-between items-center border-b-2 pb-2 mb-4" style={{ borderColor: style.accent_color }}>
                <h2 style={{
                    color: style.primary_color,
                    fontSize: `${1.25 * style.heading_scale}rem`,
                }} className="font-bold uppercase tracking-wider flex items-center gap-2">
                    Strengths
                    {!isVisible && <span className="text-xs font-normal normal-case text-gray-400">(Hidden)</span>}
                </h2>
                {isEditable && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleVisibility}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                            title={isVisible ? "Hide Section" : "Show Section"}
                        >
                            {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button
                            onClick={() => {
                                const newItem = { id: crypto.randomUUID(), label: "New Strength", order: strengths.length };
                                updateStrengths([...strengths, newItem]);
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"
                            title="Add Strength"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap gap-3">
                {strengths?.map((item) => (
                    <span
                        key={item.id}
                        className="group relative px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 font-medium hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                        <EditableField
                            value={item.label}
                            onChange={(val) => handleUpdate(item.id, val)}
                            placeholder="Strength"
                            isEditable={isEditable}
                        />
                        {isEditable && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(item.id);
                                }}
                                className="absolute -right-2 -top-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-600 z-10"
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
    const { updateHobbies, updateSectionOrder } = useResumeStore();

    if (!hobbies?.length && !isEditable) return null;

    const isVisible = resume.section_settings?.hobbies?.visible !== false;

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

    const toggleVisibility = () => {
        const settings = { ...resume.section_settings };
        settings.hobbies = {
            ...settings.hobbies,
            visible: !isVisible,
            order: settings.hobbies?.order ?? 0
        };
        updateSectionOrder(settings);
    };

    return (
        <div className={`mb-6 ${!isVisible ? 'opacity-50 grayscale' : ''}`}>
            <div className="flex justify-between items-center border-b-2 pb-2 mb-4" style={{ borderColor: style.accent_color }}>
                <h2 style={{
                    color: style.primary_color,
                    fontSize: `${1.25 * style.heading_scale}rem`,
                }} className="font-bold uppercase tracking-wider flex items-center gap-2">
                    Hobbies
                    {!isVisible && <span className="text-xs font-normal normal-case text-gray-400">(Hidden)</span>}
                </h2>
                {isEditable && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleVisibility}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                            title={isVisible ? "Hide Section" : "Show Section"}
                        >
                            {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button
                            onClick={() => {
                                const newItem = { id: crypto.randomUUID(), label: "New Hobby", order: hobbies.length };
                                updateHobbies([...hobbies, newItem]);
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"
                            title="Add Hobby"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap gap-3">
                {hobbies?.map((item) => (
                    <span
                        key={item.id}
                        className="group relative px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 font-medium hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                        <EditableField
                            value={item.label}
                            onChange={(val) => handleUpdate(item.id, val)}
                            placeholder="Hobby"
                            isEditable={isEditable}
                        />
                        {isEditable && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(item.id);
                                }}
                                className="absolute -right-2 -top-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-600 z-10"
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

export const CustomSectionRenderer: React.FC<SectionProps> = ({ resume, style, isEditable = false }) => {
    const { custom_sections } = resume;
    const { updateCustomSections, updateSectionOrder } = useResumeStore();

    if (!custom_sections?.length && !isEditable) return null;

    const isVisible = resume.section_settings?.custom_sections?.visible !== false;

    const toggleVisibility = () => {
        const settings = { ...resume.section_settings };
        settings.custom_sections = {
            ...settings.custom_sections,
            visible: !isVisible,
            order: settings.custom_sections?.order ?? 0
        };
        updateSectionOrder(settings);
    };

    const handleAddSection = () => {
        const newSection: CustomSection = {
            id: crypto.randomUUID(),
            type: "custom",
            title: "New Section",
            order: custom_sections?.length || 0,
            items: [{
                id: crypto.randomUUID(),
                title: "New Item",
                subtitle: "Subtitle",
                meta: "2024",
                description: "Description",
                start_date: "",
                end_date: "",
                is_current: false,
                order: 0
            }]
        };
        updateCustomSections([...(custom_sections || []), newSection]);
    };

    return (
        <div className={`flex flex-col gap-8 ${!isVisible ? 'opacity-50 grayscale' : ''}`}>
            {isEditable && (
                <div className="flex justify-end mb-2">
                    <button
                        onClick={toggleVisibility}
                        className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors flex items-center gap-1 text-xs"
                        title={isVisible ? "Hide Custom Sections" : "Show Custom Sections"}
                    >
                        {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                        {isVisible ? "Visible" : "Hidden"}
                    </button>
                </div>
            )}
            {custom_sections?.map((section, sIdx) => (
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
                            <div key={item.id} className="group/item relative">
                                {isEditable && (
                                    <button
                                        onClick={() => {
                                            const newSections = [...custom_sections];
                                            const newItems = section.items.filter(it => it.id !== item.id);
                                            newSections[sIdx] = { ...section, items: newItems };
                                            updateCustomSections(newSections);
                                        }}
                                        className="absolute -right-2 -top-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity shadow-sm hover:bg-red-600 z-10"
                                        title="Delete Item"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                )}
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
                                    const newItem: CustomSectionItem = {
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
                                <Plus size={16} />
                                Add Item
                            </button>
                        )}
                    </div>
                </div>
            ))}
            {isEditable && (
                <button
                    onClick={handleAddSection}
                    className="mt-4 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                    <Plus size={16} />
                    Add New Section
                </button>
            )}
        </div>
    );
};
