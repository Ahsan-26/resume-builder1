import React from 'react';
import { Resume, TemplateStyle, WorkExperience, Education, SkillCategory, SkillItem, CustomSection, CustomSectionItem } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Eye, EyeOff, Plus, ChevronUp, ChevronDown, Trash2, GripVertical, Settings2 } from 'lucide-react';
import { EditableField } from './EditableField';
import { useResumeStore } from '@/store/useResumeStore';
import { DatePicker } from './DatePicker';

export interface SectionProps {
    resume: Resume;
    style: TemplateStyle;
    isEditable?: boolean;
    renderOnly?: 'header' | 'items';
    limitToId?: string;
}

// ----------------------------------------------------------------------
// Unified Action Toolbar
// ----------------------------------------------------------------------
export const SectionActionToolbar = ({
    onAdd,
    onToggleVisibility,
    isVisible,
    onDelete,
    onMoveUp,
    onMoveDown,
    isFirst,
    isLast,
    className = ""
}: {
    onAdd?: () => void;
    onToggleVisibility?: () => void;
    isVisible?: boolean;
    onDelete?: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    isFirst?: boolean;
    isLast?: boolean;
    className?: string;
}) => {
    return (
        <div className={`flex items-center gap-1 bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl shadow-gray-200/50 rounded-full px-2 py-1 absolute z-30 transition-all duration-200 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 ${className}`}>
            {onMoveUp && (
                <button
                    onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
                    disabled={isFirst}
                    className="p-1.5 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 disabled:opacity-20 transition-colors"
                    title="Move Up"
                >
                    <ChevronUp size={14} />
                </button>
            )}
            {onMoveDown && (
                <button
                    onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
                    disabled={isLast}
                    className="p-1.5 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 disabled:opacity-20 transition-colors"
                    title="Move Down"
                >
                    <ChevronDown size={14} />
                </button>
            )}
            {(onMoveUp || onMoveDown) && <div className="w-px h-4 bg-gray-100 mx-0.5" />}

            {onAdd && (
                <button
                    onClick={(e) => { e.stopPropagation(); onAdd(); }}
                    className="p-1.5 hover:bg-blue-50 rounded-full text-blue-500 hover:text-blue-600 transition-colors"
                    title="Add Item"
                >
                    <Plus size={16} />
                </button>
            )}

            {onToggleVisibility && (
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }}
                    className="p-1.5 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                    title={isVisible ? "Hide" : "Show"}
                >
                    {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
            )}

            {onDelete && (
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="p-1.5 hover:bg-red-50 rounded-full text-red-400 hover:text-red-500 transition-colors"
                    title="Delete"
                >
                    <Trash2 size={14} />
                </button>
            )}
        </div>
    );
};

export const PersonalInfoSection: React.FC<SectionProps> = ({ resume, style, isEditable = false }) => {
    const { personal_info } = resume;
    const { updatePersonalInfo, updateSectionSettings } = useResumeStore();

    if (!personal_info) return null;

    const displayMode = resume.template?.definition?.sections?.personal_info?.display || 'left';
    const isCentered = displayMode === 'centered';

    const sectionSettings = resume.section_settings?.personal_info || { order: 0, visible: true };

    const renderContactItem = (icon: React.ReactNode, value: string, field: string, placeholder: string, onChange: (val: string) => void, validate?: (val: string) => string | null) => {
        const isVisible = sectionSettings.fields?.[field] !== false;
        if (!isVisible && !isEditable && !value) return null; // Only render if visible, editable, or has a value

        return (
            <div className={`flex items-center gap-2 ${!isVisible ? 'opacity-40' : ''}`}>
                <div style={{ color: style.accent_color }}>{icon}</div>
                <EditableField
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    isEditable={isEditable}
                    validate={validate}
                />
                {isEditable && (
                    <button
                        onClick={() => updateSectionSettings('personal_info', {
                            fields: { ...sectionSettings.fields, [field]: !isVisible }
                        })}
                        className="p-0.5 hover:bg-gray-100 rounded text-gray-400"
                    >
                        {isVisible ? <Eye size={10} /> : <EyeOff size={10} />}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className={`${isCentered ? 'text-center' : ''}`}>
            <h1 style={{
                color: style.primary_color,
                fontSize: `${2.5 * style.heading_scale}rem`,
                fontFamily: style.font_family
            }} className="font-black mb-2 leading-tight">
                <EditableField
                    value={`${personal_info.first_name || ''} ${personal_info.last_name || ''}`}
                    onChange={(val) => {
                        const parts = val.split(' ');
                        const firstName = parts[0] || '';
                        const lastName = parts.slice(1).join(' ') || '';
                        updatePersonalInfo({ first_name: firstName, last_name: lastName });
                    }}
                    placeholder="Your Name"
                    isEditable={isEditable}
                />
            </h1>
            <div style={{ color: style.accent_color }} className="text-lg font-bold mb-4 uppercase tracking-widest">
                <EditableField
                    value={personal_info.headline}
                    onChange={(val) => updatePersonalInfo({ headline: val })}
                    placeholder="Professional Headline"
                    isEditable={isEditable}
                />
            </div>

            <div className={`flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600 ${isCentered ? 'justify-center' : ''}`}>
                {renderContactItem(<Mail size={14} />, personal_info.email, 'email', 'Email', (val) => updatePersonalInfo({ email: val }), (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : "Invalid email")}
                {renderContactItem(<Phone size={14} />, personal_info.phone, 'phone', 'Phone', (val) => updatePersonalInfo({ phone: val }))}
                {renderContactItem(<MapPin size={14} />, `${personal_info.city}${personal_info.country ? `, ${personal_info.country}` : ''}`, 'location', 'City, Country', (val) => {
                    const parts = val.split(', ');
                    const city = parts[0] || '';
                    const country = parts.slice(1).join(', ') || '';
                    updatePersonalInfo({ city, country });
                })}
                {renderContactItem(<Globe size={14} />, personal_info.website, 'website', 'Website', (val) => updatePersonalInfo({ website: val }))}
                {renderContactItem(<Linkedin size={14} />, personal_info.linkedin_url, 'linkedin', 'LinkedIn', (val) => updatePersonalInfo({ linkedin_url: val }))}
                {renderContactItem(<Plus size={14} />, personal_info.github_url, 'github', 'GitHub', (val) => updatePersonalInfo({ github_url: val }))}
            </div>

            {personal_info.summary && (
                <div className={`mt-6 max-w-3xl ${isCentered ? 'mx-auto' : ''}`}>
                    <p style={{ lineHeight: style.line_height }} className="text-gray-600 whitespace-pre-line italic">
                        <EditableField
                            value={personal_info.summary}
                            onChange={(val) => updatePersonalInfo({ summary: val })}
                            placeholder="Professional Summary..."
                            isEditable={isEditable}
                            multiline
                        />
                    </p>
                </div>
            )}
        </div>
    );
};

export const ExperienceSection: React.FC<SectionProps> = ({ resume, style, isEditable = false, renderOnly, limitToId }) => {
    const { work_experiences } = resume;
    const { updateExperience, removeExperience, addExperience, updateSectionOrder, reorderItems, updateSectionSettings } = useResumeStore();

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

    const sectionSettings = resume.section_settings?.work_experiences || { order: 0, visible: true };
    const sectionTitle = sectionSettings.title || "Experience";

    return (
        <div className={`group relative transition-all duration-300 ${(!isVisible && !renderOnly) ? 'opacity-40 grayscale' : ''} ${!renderOnly ? 'mb-6' : ''}`}>
            {isEditable && !renderOnly && (
                <SectionActionToolbar
                    onToggleVisibility={toggleVisibility}
                    isVisible={isVisible}
                    className="-top-10 left-1/2 -translate-x-1/2"
                />
            )}

            {(!renderOnly || renderOnly === 'header') && (
                <div className="flex justify-between items-center border-b-2 pb-2 mb-4" style={{ borderColor: style.accent_color }}>
                    <h2 style={{
                        color: style.primary_color,
                        fontSize: `${1.25 * style.heading_scale}rem`,
                    }} className="font-bold uppercase tracking-wider flex items-center gap-2">
                        <EditableField
                            value={sectionTitle}
                            onChange={(val) => updateSectionSettings('work_experiences', { title: val })}
                            placeholder="Experience"
                            isEditable={isEditable}
                        />
                        {!isVisible && <span className="text-xs font-normal normal-case text-gray-400 italic">(Temporarily Hidden)</span>}
                    </h2>
                </div>
            )}

            {(!renderOnly || renderOnly === 'items') && (
                <div className="flex flex-col gap-4">
                    {work_experiences.sort((a, b) => (a.order || 0) - (b.order || 0))
                        .filter(exp => !limitToId || exp.id === limitToId)
                        .map((exp, index) => (
                            <div key={exp.id} className={`group/item relative`}>
                                {isEditable && !limitToId && (
                                    <SectionActionToolbar
                                        onMoveUp={() => {
                                            const newIds = work_experiences.map(e => e.id);
                                            if (index > 0) {
                                                [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
                                                reorderItems('work_experiences', newIds);
                                            }
                                        }}
                                        onMoveDown={() => {
                                            const newIds = work_experiences.map(e => e.id);
                                            if (index < work_experiences.length - 1) {
                                                [newIds[index + 1], newIds[index]] = [newIds[index], newIds[index + 1]];
                                                reorderItems('work_experiences', newIds);
                                            }
                                        }}
                                        isFirst={index === 0}
                                        isLast={index === work_experiences.length - 1}
                                        className="-top-10 left-1/2 -translate-x-1/2"
                                    />
                                )}
                                <div className="mb-2">
                                    <h3 className="text-lg font-bold text-gray-800 leading-tight">
                                        <EditableField
                                            value={exp.position_title}
                                            onChange={(val) => updateExperience(exp.id, { position_title: val })}
                                            placeholder="Position Title"
                                            isEditable={isEditable}
                                        />
                                    </h3>

                                    {(!sectionSettings.items?.[exp.id]?.hide_date || isEditable) && (
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className={`text-sm text-gray-500 flex items-center gap-1 flex-wrap ${sectionSettings.items?.[exp.id]?.hide_date ? 'opacity-40' : ''}`}>
                                                <DatePicker
                                                    value={exp.start_date}
                                                    onChange={(val) => updateExperience(exp.id, { start_date: val })}
                                                    isEditable={isEditable}
                                                />
                                                <span className="mx-0.5">—</span>
                                                <DatePicker
                                                    value={exp.end_date}
                                                    onChange={(val) => updateExperience(exp.id, { end_date: val })}
                                                    isCurrent={exp.is_current}
                                                    onCurrentChange={(val) => updateExperience(exp.id, { is_current: val })}
                                                    isEditable={isEditable}
                                                    placeholder="Present"
                                                    align="left"
                                                />
                                            </span>
                                            {isEditable && (
                                                <button
                                                    onClick={() => updateSectionSettings('work_experiences', {
                                                        items: {
                                                            ...sectionSettings.items,
                                                            [exp.id]: { ...sectionSettings.items?.[exp.id], hide_date: !sectionSettings.items?.[exp.id]?.hide_date }
                                                        }
                                                    })}
                                                    className="p-0.5 hover:bg-gray-100 rounded text-gray-400"
                                                >
                                                    {sectionSettings.items?.[exp.id]?.hide_date ? <EyeOff size={10} /> : <Eye size={10} />}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div style={{ color: style.accent_color }} className="font-medium mb-2 flex gap-1 items-center">
                                    <EditableField
                                        value={exp.company_name}
                                        onChange={(val) => updateExperience(exp.id, { company_name: val })}
                                        placeholder="Company Name"
                                        isEditable={isEditable}
                                    />
                                    {(sectionSettings.items?.[exp.id]?.fields?.location !== false || isEditable) && (
                                        <div className="flex items-center gap-1">
                                            <span className="mx-1">|</span>
                                            <EditableField
                                                value={exp.city}
                                                onChange={(val) => updateExperience(exp.id, { city: val })}
                                                placeholder="City"
                                                isEditable={isEditable}
                                                className={sectionSettings.items?.[exp.id]?.fields?.location === false ? 'opacity-40' : ''}
                                            />
                                            {isEditable && (
                                                <button
                                                    onClick={() => updateSectionSettings('work_experiences', {
                                                        items: {
                                                            ...sectionSettings.items,
                                                            [exp.id]: {
                                                                ...sectionSettings.items?.[exp.id],
                                                                fields: {
                                                                    ...sectionSettings.items?.[exp.id]?.fields,
                                                                    location: sectionSettings.items?.[exp.id]?.fields?.location === false
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    className="p-0.5 hover:bg-gray-100 rounded text-gray-400"
                                                >
                                                    {sectionSettings.items?.[exp.id]?.fields?.location !== false ? <Eye size={10} /> : <EyeOff size={10} />}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {(sectionSettings.items?.[exp.id]?.fields?.description !== false || isEditable) && (
                                    <div className="relative group/desc">
                                        <p style={{ lineHeight: style.line_height }} className={`text-gray-600 whitespace-pre-line ${sectionSettings.items?.[exp.id]?.fields?.description === false ? 'opacity-40' : ''}`}>
                                            <EditableField
                                                value={exp.description}
                                                onChange={(val) => updateExperience(exp.id, { description: val })}
                                                placeholder="Job Description..."
                                                multiline
                                                isEditable={isEditable}
                                            />
                                        </p>
                                        {isEditable && (
                                            <button
                                                onClick={() => updateSectionSettings('work_experiences', {
                                                    items: {
                                                        ...sectionSettings.items,
                                                        [exp.id]: {
                                                            ...sectionSettings.items?.[exp.id],
                                                            fields: {
                                                                ...sectionSettings.items?.[exp.id]?.fields,
                                                                description: sectionSettings.items?.[exp.id]?.fields?.description === false
                                                            }
                                                        }
                                                    }
                                                })}
                                                className="absolute -right-6 top-0 p-0.5 hover:bg-gray-100 rounded text-gray-400 opacity-0 group-hover/desc:opacity-100 transition-opacity"
                                            >
                                                {sectionSettings.items?.[exp.id]?.fields?.description !== false ? <Eye size={10} /> : <EyeOff size={10} />}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export const EducationSection: React.FC<SectionProps> = ({ resume, style, isEditable = false, renderOnly, limitToId }) => {
    const { educations } = resume;
    const { updateEducation, removeEducation, addEducation, updateSectionOrder, reorderItems, updateSectionSettings } = useResumeStore();

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

    const sectionSettings = resume.section_settings?.educations || { order: 0, visible: true };
    const sectionTitle = sectionSettings.title || "Education";

    return (
        <div className={`group relative transition-all duration-300 ${(!isVisible && !renderOnly) ? 'opacity-40 grayscale' : ''} ${!renderOnly ? 'mb-6' : ''}`}>
            {isEditable && !renderOnly && (
                <SectionActionToolbar
                    onToggleVisibility={toggleVisibility}
                    isVisible={isVisible}
                    className="-top-10 left-1/2 -translate-x-1/2"
                />
            )}

            {(!renderOnly || renderOnly === 'header') && (
                <div className="flex justify-between items-center border-b-2 pb-2 mb-4" style={{ borderColor: style.accent_color }}>
                    <h2 style={{
                        color: style.primary_color,
                        fontSize: `${1.25 * style.heading_scale}rem`,
                    }} className="font-bold uppercase tracking-wider flex items-center gap-2">
                        <EditableField
                            value={sectionTitle}
                            onChange={(val) => updateSectionSettings('educations', { title: val })}
                            placeholder="Education"
                            isEditable={isEditable}
                        />
                        {!isVisible && <span className="text-xs font-normal normal-case text-gray-400 italic">(Temporarily Hidden)</span>}
                    </h2>
                </div>
            )}
            {(!renderOnly || renderOnly === 'items') && (
                <div className="flex flex-col gap-4">
                    {educations.sort((a, b) => (a.order || 0) - (b.order || 0))
                        .filter(edu => !limitToId || edu.id === limitToId)
                        .map((edu, index) => (
                            <div key={edu.id} className={`group/item relative`}>
                                {isEditable && !limitToId && (
                                    <SectionActionToolbar
                                        onMoveUp={() => {
                                            const newIds = educations.map(e => e.id);
                                            if (index > 0) {
                                                [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
                                                reorderItems('educations', newIds);
                                            }
                                        }}
                                        onMoveDown={() => {
                                            const newIds = educations.map(e => e.id);
                                            if (index < educations.length - 1) {
                                                [newIds[index + 1], newIds[index]] = [newIds[index], newIds[index + 1]];
                                                reorderItems('educations', newIds);
                                            }
                                        }}
                                        isFirst={index === 0}
                                        isLast={index === educations.length - 1}
                                        className="-top-10 left-1/2 -translate-x-1/2"
                                    />
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
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <DatePicker
                                        value={edu.start_date}
                                        onChange={(val) => updateEducation(edu.id, { start_date: val })}
                                        isEditable={isEditable}
                                    />
                                    <span className="mx-0.5">—</span>
                                    <DatePicker
                                        value={edu.end_date}
                                        onChange={(val) => updateEducation(edu.id, { end_date: val })}
                                        isCurrent={edu.is_current}
                                        onCurrentChange={(val) => updateEducation(edu.id, { is_current: val })}
                                        isEditable={isEditable}
                                        placeholder="Present"
                                        align="right"
                                    />
                                </span>
                                {(isEditable || edu.description) && (sectionSettings.items?.[edu.id]?.fields?.description !== false) && (
                                    <div className="mt-2 text-sm text-gray-600 whitespace-pre-line">
                                        <EditableField
                                            value={edu.description || ""}
                                            onChange={(val) => updateEducation(edu.id, { description: val })}
                                            placeholder="Description/Notable Achievements..."
                                            multiline
                                            isEditable={isEditable}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export const SkillsSection: React.FC<SectionProps> = ({ resume, style, isEditable = false, renderOnly, limitToId }) => {
    const { skill_categories } = resume;
    const { updateSkillCategories, updateSectionOrder, reorderItems, updateSectionSettings } = useResumeStore();

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

    const sectionSettings = resume.section_settings?.skill_categories || { order: 0, visible: true };
    const sectionTitle = sectionSettings.title || "Skills";

    return (
        <div className={`group relative transition-all duration-300 ${(!isVisible && !renderOnly) ? 'opacity-40 grayscale' : ''} ${!renderOnly ? 'mb-6' : ''}`}>
            {isEditable && !renderOnly && (
                <SectionActionToolbar
                    onToggleVisibility={toggleVisibility}
                    isVisible={isVisible}
                    className="-top-10 left-1/2 -translate-x-1/2"
                />
            )}

            {(!renderOnly || renderOnly === 'header') && (
                <div className="flex justify-between items-center border-b-2 pb-2 mb-4" style={{ borderColor: style.accent_color }}>
                    <h2 style={{
                        color: style.primary_color,
                        fontSize: `${1.25 * style.heading_scale}rem`,
                    }} className="font-bold uppercase tracking-wider flex items-center gap-2">
                        <EditableField
                            value={sectionTitle}
                            onChange={(val) => updateSectionSettings('skill_categories', { title: val })}
                            placeholder="Skills"
                            isEditable={isEditable}
                        />
                        {!isVisible && <span className="text-xs font-normal normal-case text-gray-400 italic">(Temporarily Hidden)</span>}
                    </h2>
                </div>
            )}
            {(!renderOnly || renderOnly === 'items') && (
                <div className="flex flex-col gap-6">
                    {skill_categories?.sort((a, b) => (a.order || 0) - (b.order || 0))
                        .filter(cat => !limitToId || cat.id === limitToId)
                        .map((cat, catIdx) => (
                            <div key={cat.id} className="group/item relative">
                                {isEditable && !limitToId && (
                                    <SectionActionToolbar
                                        onMoveUp={() => {
                                            const newIds = (skill_categories || []).map(e => e.id);
                                            if (catIdx > 0) {
                                                [newIds[catIdx - 1], newIds[catIdx]] = [newIds[catIdx], newIds[catIdx - 1]];
                                                reorderItems('skill_categories', newIds);
                                            }
                                        }}
                                        onMoveDown={() => {
                                            const newIds = (skill_categories || []).map(e => e.id);
                                            if (catIdx < (skill_categories || []).length - 1) {
                                                [newIds[catIdx + 1], newIds[catIdx]] = [newIds[catIdx], newIds[catIdx + 1]];
                                                reorderItems('skill_categories', newIds);
                                            }
                                        }}
                                        isFirst={catIdx === 0}
                                        isLast={catIdx === (skill_categories || []).length - 1}
                                        className="-top-10 left-1/2 -translate-x-1/2"
                                    />
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
            )}
        </div>
    );
};

export const StrengthsSection: React.FC<SectionProps> = ({ resume, style, isEditable = false }) => {
    const { strengths } = resume;
    const { updateStrengths, updateSectionOrder, reorderItems, updateSectionSettings } = useResumeStore();

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

    const sectionSettings = resume.section_settings?.strengths || { order: 0, visible: true };
    const sectionTitle = sectionSettings.title || "Strengths";

    return (
        <div className={`group relative transition-all duration-300 ${!isVisible ? 'opacity-40 grayscale' : ''}`}>
            {isEditable && (
                <SectionActionToolbar
                    onToggleVisibility={toggleVisibility}
                    isVisible={isVisible}
                    className="-top-10 left-1/2 -translate-x-1/2"
                />
            )}

            <div className="flex justify-between items-center border-b-2 pb-2 mb-4" style={{ borderColor: style.accent_color }}>
                <h2 style={{
                    color: style.primary_color,
                    fontSize: `${1.25 * style.heading_scale}rem`,
                }} className="font-bold uppercase tracking-wider flex items-center gap-2">
                    <EditableField
                        value={sectionTitle}
                        onChange={(val) => updateSectionSettings('strengths', { title: val })}
                        placeholder="Strengths"
                        isEditable={isEditable}
                    />
                    {!isVisible && <span className="text-xs font-normal normal-case text-gray-400 italic">(Temporarily Hidden)</span>}
                </h2>
            </div>
            <div className="flex flex-wrap gap-3">
                {strengths?.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item, index) => (
                    <span
                        key={item.id}
                        className="group/item relative px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 font-medium hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                        {isEditable && (
                            <SectionActionToolbar
                                onMoveUp={() => {
                                    const newIds = strengths.map(e => e.id);
                                    if (index > 0) {
                                        [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
                                        reorderItems('strengths', newIds);
                                    }
                                }}
                                onMoveDown={() => {
                                    const newIds = strengths.map(e => e.id);
                                    if (index < strengths.length - 1) {
                                        [newIds[index + 1], newIds[index]] = [newIds[index], newIds[index + 1]];
                                        reorderItems('strengths', newIds);
                                    }
                                }}
                                isFirst={index === 0}
                                isLast={index === strengths.length - 1}
                                className="-top-10 left-1/2 -translate-x-1/2"
                            />
                        )}
                        <EditableField
                            value={item.label}
                            onChange={(val) => handleUpdate(item.id, val)}
                            placeholder="Strength"
                            isEditable={isEditable}
                        />
                    </span>
                ))}
            </div>
        </div>
    );
};

export const HobbiesSection: React.FC<SectionProps> = ({ resume, style, isEditable = false }) => {
    const { hobbies } = resume;
    const { updateHobbies, updateSectionOrder, reorderItems, updateSectionSettings } = useResumeStore();

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

    const sectionSettings = resume.section_settings?.hobbies || { order: 0, visible: true };
    const sectionTitle = sectionSettings.title || "Hobbies";

    return (
        <div className={`group relative transition-all duration-300 ${!isVisible ? 'opacity-40 grayscale' : ''}`}>
            {isEditable && (
                <SectionActionToolbar
                    onToggleVisibility={toggleVisibility}
                    isVisible={isVisible}
                    className="-top-10 left-1/2 -translate-x-1/2"
                />
            )}

            <div className="flex justify-between items-center border-b-2 pb-2 mb-4" style={{ borderColor: style.accent_color }}>
                <h2 style={{
                    color: style.primary_color,
                    fontSize: `${1.25 * style.heading_scale}rem`,
                }} className="font-bold uppercase tracking-wider flex items-center gap-2">
                    <EditableField
                        value={sectionTitle}
                        onChange={(val) => updateSectionSettings('hobbies', { title: val })}
                        placeholder="Hobbies"
                        isEditable={isEditable}
                    />
                    {!isVisible && <span className="text-xs font-normal normal-case text-gray-400 italic">(Temporarily Hidden)</span>}
                </h2>
            </div>
            <div className="flex flex-wrap gap-3">
                {hobbies?.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item, index) => (
                    <span
                        key={item.id}
                        className="group/item relative px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 font-medium hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                        {isEditable && (
                            <SectionActionToolbar
                                onMoveUp={() => {
                                    const newIds = hobbies.map(e => e.id);
                                    if (index > 0) {
                                        [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
                                        reorderItems('hobbies', newIds);
                                    }
                                }}
                                onMoveDown={() => {
                                    const newIds = hobbies.map(e => e.id);
                                    if (index < hobbies.length - 1) {
                                        [newIds[index + 1], newIds[index]] = [newIds[index], newIds[index + 1]];
                                        reorderItems('hobbies', newIds);
                                    }
                                }}
                                isFirst={index === 0}
                                isLast={index === hobbies.length - 1}
                                className="-top-10 left-1/2 -translate-x-1/2"
                            />
                        )}
                        <EditableField
                            value={item.label}
                            onChange={(val) => handleUpdate(item.id, val)}
                            placeholder="Hobby"
                            isEditable={isEditable}
                        />
                    </span>
                ))}
            </div>
        </div>
    );
};

export const CustomSectionRenderer: React.FC<SectionProps> = ({ resume, style, isEditable = false }) => {
    const { custom_sections } = resume;
    const { updateCustomSections, updateSectionOrder, reorderItems, updateSectionSettings } = useResumeStore();

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
        <div className={`group relative flex flex-col gap-8 transition-all duration-300 ${!isVisible ? 'opacity-40 grayscale' : ''}`}>
            {isEditable && (
                <SectionActionToolbar
                    onToggleVisibility={toggleVisibility}
                    isVisible={isVisible}
                    className="-top-10 left-1/2 -translate-x-1/2"
                />
            )}
            {custom_sections?.sort((a, b) => (a.order || 0) - (b.order || 0)).map((section, sIdx) => {
                const sectionSettings = resume.section_settings?.[section.id] || { order: 0, visible: true };
                const sectionTitle = sectionSettings.title || section.title;

                return (
                    <div key={section.id} className="group/item relative">
                        {isEditable && (
                            <SectionActionToolbar
                                onMoveUp={() => {
                                    const newIds = custom_sections.map(e => e.id);
                                    if (sIdx > 0) {
                                        [newIds[sIdx - 1], newIds[sIdx]] = [newIds[sIdx], newIds[sIdx - 1]];
                                        const updated = [...custom_sections].sort((a, b) => {
                                            const idxA = newIds.indexOf(a.id);
                                            const idxB = newIds.indexOf(b.id);
                                            return idxA - idxB;
                                        }).map((s, i) => ({ ...s, order: i }));
                                        updateCustomSections(updated);
                                    }
                                }}
                                onMoveDown={() => {
                                    const newIds = custom_sections.map(e => e.id);
                                    if (sIdx < custom_sections.length - 1) {
                                        [newIds[sIdx + 1], newIds[sIdx]] = [newIds[sIdx], newIds[sIdx + 1]];
                                        const updated = [...custom_sections].sort((a, b) => {
                                            const idxA = newIds.indexOf(a.id);
                                            const idxB = newIds.indexOf(b.id);
                                            return idxA - idxB;
                                        }).map((s, i) => ({ ...s, order: i }));
                                        updateCustomSections(updated);
                                    }
                                }}
                                isFirst={sIdx === 0}
                                isLast={sIdx === custom_sections.length - 1}
                                className="-right-12 top-0 flex-col"
                            />
                        )}
                        <h2 style={{
                            color: style.primary_color,
                            fontSize: `${1.25 * style.heading_scale}rem`,
                            borderColor: style.accent_color
                        }} className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4">
                            <EditableField
                                value={sectionTitle}
                                onChange={(val) => updateSectionSettings(section.id, { title: val })}
                                placeholder="Section Title"
                                isEditable={isEditable}
                            />
                        </h2>
                        <div className="flex flex-col gap-6">
                            {section.items.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item, iIdx) => (
                                <div key={item.id} className="group/item relative">
                                    {isEditable && (
                                        <SectionActionToolbar
                                            onMoveUp={() => {
                                                const newItems = [...section.items];
                                                if (iIdx > 0) {
                                                    [newItems[iIdx - 1], newItems[iIdx]] = [newItems[iIdx], newItems[iIdx - 1]];
                                                    const updatedItems = newItems.map((it, idx) => ({ ...it, order: idx }));
                                                    const newSections = [...custom_sections];
                                                    newSections[sIdx] = { ...section, items: updatedItems };
                                                    updateCustomSections(newSections);
                                                }
                                            }}
                                            onMoveDown={() => {
                                                const newItems = [...section.items];
                                                if (iIdx < section.items.length - 1) {
                                                    [newItems[iIdx + 1], newItems[iIdx]] = [newItems[iIdx], newItems[iIdx + 1]];
                                                    const updatedItems = newItems.map((it, idx) => ({ ...it, order: idx }));
                                                    const newSections = [...custom_sections];
                                                    newSections[sIdx] = { ...section, items: updatedItems };
                                                    updateCustomSections(newSections);
                                                }
                                            }}
                                            isFirst={iIdx === 0}
                                            isLast={iIdx === section.items.length - 1}
                                            className="-left-12 top-0 flex-col"
                                        />
                                    )}
                                    <div className="mb-2">
                                        <h3 className="text-lg font-bold text-gray-800 leading-tight">
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
                                        <div className="text-sm text-gray-500 mt-1">
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
                                        </div>
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
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
// ... existing exports ...
export * from './SingleCustomSectionRenderer';
