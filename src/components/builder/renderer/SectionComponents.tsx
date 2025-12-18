import React from 'react';
import { Resume, TemplateStyle } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface SectionProps {
    resume: Resume;
    style: TemplateStyle;
}

export const PersonalInfoSection: React.FC<SectionProps> = ({ resume, style }) => {
    const { personal_info } = resume;
    if (!personal_info) return null;

    return (
        <div className="mb-6">
            <h1 style={{
                fontSize: `${2.25 * style.heading_scale}rem`,
                color: style.primary_color,
                lineHeight: 1.2
            }} className="font-bold mb-2">
                {personal_info.first_name} <span style={{ color: style.accent_color }}>{personal_info.last_name}</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium mb-4">{personal_info.headline}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {personal_info.email && (
                    <div className="flex items-center gap-1">
                        <Mail size={14} /> {personal_info.email}
                    </div>
                )}
                {personal_info.phone && (
                    <div className="flex items-center gap-1">
                        <Phone size={14} /> {personal_info.phone}
                    </div>
                )}
                {personal_info.city && (
                    <div className="flex items-center gap-1">
                        <MapPin size={14} /> {personal_info.city}, {personal_info.country}
                    </div>
                )}
                {personal_info.website && (
                    <div className="flex items-center gap-1">
                        <Globe size={14} /> {personal_info.website}
                    </div>
                )}
                {personal_info.linkedin_url && (
                    <div className="flex items-center gap-1">
                        <Linkedin size={14} /> LinkedIn
                    </div>
                )}
            </div>
            {personal_info.summary && (
                <div className="mt-4">
                    <p style={{ lineHeight: style.line_height }} className="text-gray-700">
                        {personal_info.summary}
                    </p>
                </div>
            )}
        </div>
    );
};

export const ExperienceSection: React.FC<SectionProps> = ({ resume, style }) => {
    const { work_experiences } = resume;
    if (!work_experiences?.length) return null;

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
                    <div key={exp.id}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-lg font-bold text-gray-800">{exp.position_title}</h3>
                            <span className="text-sm text-gray-500">
                                {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}
                            </span>
                        </div>
                        <div style={{ color: style.accent_color }} className="font-medium mb-2">
                            {exp.company_name} | {exp.city}
                        </div>
                        <p style={{ lineHeight: style.line_height }} className="text-gray-600 whitespace-pre-line">
                            {exp.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const EducationSection: React.FC<SectionProps> = ({ resume, style }) => {
    const { educations } = resume;
    if (!educations?.length) return null;

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
                {educations.map((edu) => (
                    <div key={edu.id}>
                        <div className="font-bold text-gray-800">{edu.school_name}</div>
                        <div style={{ color: style.accent_color }} className="font-medium">{edu.degree}</div>
                        {edu.field_of_study && <div className="text-gray-500 italic">{edu.field_of_study}</div>}
                        <div className="text-xs text-gray-400 mt-1">
                            {edu.start_date} - {edu.is_current ? "Present" : edu.end_date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const SkillsSection: React.FC<SectionProps> = ({ resume, style }) => {
    const { skill_categories } = resume;
    if (!skill_categories?.length) return null;

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
                {skill_categories.map((cat) => (
                    <div key={cat.id}>
                        <div className="font-semibold text-gray-700 mb-2 text-sm uppercase">{cat.name}</div>
                        <div className="flex flex-wrap gap-2">
                            {cat.items.map((item) => (
                                <span
                                    key={item.id}
                                    className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 font-medium"
                                >
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const StrengthsSection: React.FC<SectionProps> = ({ resume, style }) => {
    const { strengths } = resume;
    if (!strengths?.length) return null;

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
                {strengths.map((item) => (
                    <span
                        key={item.id}
                        className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 font-medium"
                    >
                        {item.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export const HobbiesSection: React.FC<SectionProps> = ({ resume, style }) => {
    const { hobbies } = resume;
    if (!hobbies?.length) return null;

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
                {hobbies.map((item) => (
                    <span
                        key={item.id}
                        className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 font-medium"
                    >
                        {item.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export const CustomSectionRenderer: React.FC<SectionProps & { sectionId: string }> = ({ resume, style, sectionId }) => {
    // This is a placeholder. In a real scenario, we'd find the specific custom section by ID or type.
    // For now, we'll render all custom sections if the ID matches 'custom_sections'
    const { custom_sections } = resume;
    if (!custom_sections?.length) return null;

    return (
        <>
            {custom_sections.map((section) => (
                <div key={section.id} className="mb-6">
                    <h2 style={{
                        color: style.primary_color,
                        fontSize: `${1.25 * style.heading_scale}rem`,
                        borderColor: style.accent_color
                    }} className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4">
                        {section.title}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {section.items.map((item) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                                    <span className="text-sm text-gray-500">{item.meta}</span>
                                </div>
                                <div style={{ color: style.accent_color }} className="font-medium mb-2">
                                    {item.subtitle}
                                </div>
                                <p style={{ lineHeight: style.line_height }} className="text-gray-600 whitespace-pre-line">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};
