import React from 'react';
import { Resume, TemplateDefinition, SectionConfig } from '@/types/resume';
import {
    PersonalInfoSection,
    ExperienceSection,
    EducationSection,
    SkillsSection,
    StrengthsSection,
    HobbiesSection,
    CustomSectionRenderer
} from './renderer/SectionComponents';

interface ResumeRendererProps {
    resume: Resume;
    templateDefinition: TemplateDefinition;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({ resume, templateDefinition }) => {
    const { layout, style, sections } = templateDefinition;

    // Helper to get sorted sections for a specific area
    const getSectionsForArea = (area: string) => {
        return Object.entries(sections)
            .filter(([_, config]) => config.area === area && config.visible)
            .sort((a, b) => a[1].order - b[1].order)
            .map(([key, _]) => key);
    };

    const renderSection = (key: string) => {
        switch (key) {
            case 'personal_info':
                return <PersonalInfoSection key={key} resume={resume} style={style} />;
            case 'work_experiences':
                return <ExperienceSection key={key} resume={resume} style={style} />;
            case 'educations':
                return <EducationSection key={key} resume={resume} style={style} />;
            case 'skill_categories':
                return <SkillsSection key={key} resume={resume} style={style} />;
            case 'strengths':
                return <StrengthsSection key={key} resume={resume} style={style} />;
            case 'hobbies':
                return <HobbiesSection key={key} resume={resume} style={style} />;
            case 'custom_sections':
                return <CustomSectionRenderer key={key} resume={resume} style={style} sectionId={key} />;
            default:
                return null;
        }
    };

    const headerSections = getSectionsForArea('header');
    const leftSections = getSectionsForArea('left');
    const rightSections = getSectionsForArea('right');
    const fullSections = getSectionsForArea('full');

    return (
        <div
            className="w-full h-full bg-white text-sm font-sans"
            style={{
                fontFamily: style.font_family,
                lineHeight: style.line_height
            }}
        >
            {/* Header Area */}
            {headerSections.length > 0 && (
                <header className="p-8 pb-4">
                    {headerSections.map(renderSection)}
                </header>
            )}

            {/* Main Layout */}
            {layout.type === 'two_column' ? (
                <div className="flex h-full">
                    {/* Left Column */}
                    <div
                        className="p-8 pt-0 flex flex-col gap-6"
                        style={{ width: `${(layout.columns?.left || 0.35) * 100}%` }}
                    >
                        {leftSections.map(renderSection)}
                    </div>

                    {/* Right Column */}
                    <div
                        className="p-8 pt-0 flex flex-col gap-6 bg-gray-50"
                        style={{ width: `${(layout.columns?.right || 0.65) * 100}%` }}
                    >
                        {rightSections.map(renderSection)}
                    </div>
                </div>
            ) : (
                <div className="p-8 pt-0 flex flex-col gap-6">
                    {/* Single Column Fallback - render everything in order if needed, or just left/right stacked */}
                    {leftSections.map(renderSection)}
                    {rightSections.map(renderSection)}
                </div>
            )}

            {/* Full Width Bottom Area */}
            {fullSections.length > 0 && (
                <div className="p-8 pt-0 flex flex-col gap-6">
                    {fullSections.map(renderSection)}
                </div>
            )}
        </div>
    );
};
