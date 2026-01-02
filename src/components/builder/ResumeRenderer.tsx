import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Resume, TemplateDefinition } from '@/types/resume';
import {
    PersonalInfoSection,
    ExperienceSection,
    EducationSection,
    SkillsSection,
    StrengthsSection,
    HobbiesSection,
    CustomSectionRenderer,
    SingleCustomSectionRenderer
} from './renderer/SectionComponents';
import { calculatePages, PageLayoutData } from './renderer/pagination-utils';

interface ResumeRendererProps {
    resume: Resume;
    templateDefinition: TemplateDefinition;
    isEditable?: boolean;
}

// ----------------------------------------------------------------------
// 1. Dumb Section Renderer (Maps key -> Component)
// ----------------------------------------------------------------------
const SectionItem = ({ sectionKey, resume, style, isEditable }: { sectionKey: string, resume: Resume, style: any, isEditable: boolean }) => {
    // Handle individual custom sections
    if (sectionKey.startsWith('custom.')) {
        const sectionId = sectionKey.split('.')[1];
        const section = resume.custom_sections?.find(s => s.id === sectionId);
        if (section) {
            return <SingleCustomSectionRenderer section={section} resume={resume} style={style} isEditable={isEditable} />;
        }
        return null;
    }

    switch (sectionKey) {
        case 'personal_info': return <PersonalInfoSection resume={resume} style={style} isEditable={isEditable} />;
        case 'work_experiences': return <ExperienceSection resume={resume} style={style} isEditable={isEditable} />;
        case 'educations': return <EducationSection resume={resume} style={style} isEditable={isEditable} />;
        case 'skill_categories': return <SkillsSection resume={resume} style={style} isEditable={isEditable} />;
        case 'strengths': return <StrengthsSection resume={resume} style={style} isEditable={isEditable} />;
        case 'hobbies': return <HobbiesSection resume={resume} style={style} isEditable={isEditable} />;
        // Deprecated monolithic renderer, but kept for safety if needed or debug
        // case 'custom_sections': return <CustomSectionRenderer resume={resume} style={style} isEditable={isEditable} />;
        default: return null;
    }
};

// ----------------------------------------------------------------------
// 2. Single Page Component
// ----------------------------------------------------------------------
const ResumePage = React.forwardRef<HTMLDivElement, {
    pageData: PageLayoutData;
    resume: Resume;
    templateDefinition: TemplateDefinition;
    isEditable: boolean;
    pageIndex: number;
}>(({ pageData, resume, templateDefinition, isEditable, pageIndex }, ref) => {
    const { layout, style } = templateDefinition;
    const margins = resume.page?.margins_mm || { top: 20, right: 20, bottom: 20, left: 20 };

    // Page dimensions (only for styling the container div)
    const widthMm = resume.page?.size === 'LETTER' ? 216 : 210;
    const heightMm = resume.page?.size === 'LETTER' ? 279 : 297;

    // In landscape swap
    const finalWidth = resume.page?.orientation === 'landscape' ? heightMm : widthMm;
    const finalHeight = resume.page?.orientation === 'landscape' ? widthMm : heightMm;

    const paddingStyle = {
        paddingTop: `${margins.top}mm`,
        paddingRight: `${margins.right}mm`,
        paddingBottom: `${margins.bottom}mm`,
        paddingLeft: `${margins.left}mm`,
    };

    return (
        <div
            ref={ref}
            className="bg-white font-sans box-border relative shadow-lg print:shadow-none mb-8 last:mb-0 print:mb-0 print:break-after-page"
            style={{
                width: `${finalWidth}mm`,
                minHeight: `${finalHeight}mm`,
                height: `${finalHeight}mm`,
                fontFamily: style.font_family,
                lineHeight: style.line_height,
                fontSize: `${0.875 * style.body_scale}rem`,
                overflow: 'hidden',
                ...paddingStyle
            }}
        >
            {/* Header (Only on Page 0) */}
            {pageIndex === 0 && pageData.header.length > 0 && (
                <header className="mb-6">
                    {pageData.header.map(key => <SectionItem key={key} sectionKey={key} resume={resume} style={style} isEditable={isEditable} />)}
                </header>
            )}

            {/* Main Layout */}
            {layout.type === 'two_column' ? (
                <div className="flex">
                    {/* Left Column */}
                    <div
                        className="flex flex-col"
                        style={{
                            width: `${(layout.columns?.left || 0.35) * 100}%`,
                            gap: `${style.section_gap}px`
                        }}
                    >
                        {pageData.left.map(key => <SectionItem key={key} sectionKey={key} resume={resume} style={style} isEditable={isEditable} />)}
                    </div>

                    {/* Right Column */}
                    <div
                        className="flex flex-col ml-8"
                        style={{
                            width: `${(layout.columns?.right || 0.65) * 100}%`,
                            gap: `${style.section_gap}px`,
                            marginLeft: `${style.section_gap * 2}px`
                        }}
                    >
                        {pageData.right.map(key => <SectionItem key={key} sectionKey={key} resume={resume} style={style} isEditable={isEditable} />)}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col" style={{ gap: `${style.section_gap}px` }}>
                    {pageData.left.map(key => <SectionItem key={key} sectionKey={key} resume={resume} style={style} isEditable={isEditable} />)}
                    {pageData.right.map(key => <SectionItem key={key} sectionKey={key} resume={resume} style={style} isEditable={isEditable} />)}
                </div>
            )}

            {/* Full Width Sections */}
            {pageData.full.length > 0 && (
                <div className="flex flex-col mt-6" style={{ gap: `${style.section_gap}px` }}>
                    {pageData.full.map(key => <SectionItem key={key} sectionKey={key} resume={resume} style={style} isEditable={isEditable} />)}
                </div>
            )}
        </div>
    );
});
ResumePage.displayName = "ResumePage";

// ----------------------------------------------------------------------
// 3. Orchestrator
// ----------------------------------------------------------------------
export const ResumeRenderer: React.FC<ResumeRendererProps> = ({ resume, templateDefinition, isEditable = false }) => {
    const [sectionHeights, setSectionHeights] = useState<Record<string, number>>({});
    const measureRef = useRef<HTMLDivElement>(null);

    // Helpers to get all keys
    const getAllSectionKeys = () => {
        const allSections = Object.entries(templateDefinition.sections);
        const allKeys: string[] = [];

        // 1. Add standard sections (excluding monolithic custom_sections)
        allSections.forEach(([key, config]) => {
            if (key === 'custom_sections') return; // Skip monolithic

            const settings = resume.section_settings?.[key];
            if (isEditable || (settings?.visible ?? config.visible ?? true)) {
                allKeys.push(key);
            }
        });

        // 2. Add individual custom sections
        if (resume.custom_sections) {
            resume.custom_sections.forEach(section => {
                const key = `custom.${section.id}`;
                const settings = resume.section_settings?.[section.id]; // Note: settings keyed by ID
                if (isEditable || (settings?.visible ?? true)) {
                    allKeys.push(key);
                }
            });
        }

        return allKeys;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const allKeys = useMemo(getAllSectionKeys, [resume, templateDefinition, isEditable]);

    // Measure Effect
    useEffect(() => {
        if (!measureRef.current) return;

        // Short timeout to ensure DOM render
        const timer = setTimeout(() => {
            if (!measureRef.current) return;
            const heights: Record<string, number> = {};
            allKeys.forEach(key => {
                const el = measureRef.current?.querySelector(`[data-measure-key="${key}"]`);
                if (el) {
                    heights[key] = el.getBoundingClientRect().height;
                }
            });

            setSectionHeights(prev => {
                const isDifferent = Object.keys(heights).some(k => Math.abs((prev[k] || 0) - heights[k]) > 2);
                if (Object.keys(prev).length !== Object.keys(heights).length || isDifferent) {
                    return heights;
                }
                return prev;
            });
        }, 100);

        return () => clearTimeout(timer);
    }, [resume, templateDefinition, allKeys]);

    // Calculate Pages
    const pages = useMemo(() => {
        return calculatePages(resume, templateDefinition, sectionHeights, isEditable);
    }, [resume, templateDefinition, sectionHeights, isEditable]);

    return (
        <div className="relative">
            {/* Hidden Measurement Layer */}
            <div
                ref={measureRef}
                className="absolute top-0 left-0 w-[210mm] opacity-0 pointer-events-none z-[-1]"
                style={{ visibility: 'hidden' }}
            >
                {allKeys.map(key => {
                    // Determine width based on area
                    let config = templateDefinition.sections[key as keyof typeof templateDefinition.sections];
                    let settings = resume.section_settings?.[key];

                    // Handle Custom Section Logic
                    if (key.startsWith('custom.')) {
                        const sectionId = key.split('.')[1];
                        // Fallback to generic 'custom_sections' config from template
                        config = templateDefinition.sections['custom_sections'] || { area: 'full', visible: true, order: 99 };
                        // Get specific settings for this section ID
                        settings = resume.section_settings?.[sectionId];
                    }

                    const area = settings?.area ?? config?.area ?? 'full';

                    let width = '100%';
                    if (templateDefinition.layout.type === 'two_column') {
                        if (area === 'left') width = `${(templateDefinition.layout.columns?.left || 0.35) * 100}%`;
                        if (area === 'right') width = `${(templateDefinition.layout.columns?.right || 0.65) * 100}%`;
                    }

                    return (
                        <div key={key} data-measure-key={key} style={{ width }}>
                            <SectionItem sectionKey={key} resume={resume} style={templateDefinition.style} isEditable={isEditable} />
                        </div>
                    );
                })}
            </div>

            {/* Render Pages */}
            <div className="flex flex-col items-center gap-8">
                {pages.map((pageData, index) => (
                    <ResumePage
                        key={index}
                        pageData={pageData}
                        resume={resume}
                        templateDefinition={templateDefinition}
                        isEditable={isEditable}
                        pageIndex={index}
                    />
                ))}
            </div>
        </div>
    );
};
