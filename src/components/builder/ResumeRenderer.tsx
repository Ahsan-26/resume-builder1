import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Resume, TemplateDefinition } from '@/types/resume';
import { useResumeStore } from '@/store/useResumeStore';
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
    const { setActiveSection } = useResumeStore();

    // Determine the navigation target
    const getTargetSection = (key: string): string => {
        const baseKey = key.split(':')[0];
        if (baseKey === 'personal_info') return 'personal';
        if (baseKey === 'work_experiences') return 'experience';
        if (baseKey === 'educations') return 'education';
        if (baseKey === 'skill_categories') return 'skills';
        if (baseKey === 'strengths') return 'strengths';
        if (baseKey === 'hobbies') return 'hobbies';
        if (baseKey.startsWith('custom.')) return 'custom';
        return 'personal';
    };

    const renderContent = () => {
        // Parse secondary keys
        const [baseKey, subType, itemId] = sectionKey.split(':');

        // Handle individual custom sections from template definition map (monolithic)
        if (baseKey.startsWith('custom.')) {
            const sectionId = baseKey.split('.')[1];
            const section = resume.custom_sections?.find(s => s.id === sectionId);
            if (section) {
                return (
                    <SingleCustomSectionRenderer
                        section={section}
                        resume={resume}
                        style={style}
                        isEditable={isEditable}
                        renderOnly={subType as any}
                        limitToId={itemId}
                    />
                );
            }
            return null;
        }

        switch (baseKey) {
            case 'personal_info': return <PersonalInfoSection resume={resume} style={style} isEditable={isEditable} />;
            case 'work_experiences': return <ExperienceSection resume={resume} style={style} isEditable={isEditable} renderOnly={subType as any} limitToId={itemId} />;
            case 'educations': return <EducationSection resume={resume} style={style} isEditable={isEditable} renderOnly={subType as any} limitToId={itemId} />;
            case 'skill_categories': return <SkillsSection resume={resume} style={style} isEditable={isEditable} renderOnly={subType as any} limitToId={itemId} />;
            case 'strengths': return <StrengthsSection resume={resume} style={style} isEditable={isEditable} />;
            case 'hobbies': return <HobbiesSection resume={resume} style={style} isEditable={isEditable} />;
            default: return null;
        }
    };

    if (!isEditable) return renderContent();

    return (
        <div
            onClick={() => setActiveSection(getTargetSection(sectionKey))}
            className="group relative cursor-pointer hover:ring-2 hover:ring-blue-400/30 hover:bg-blue-50/10 rounded-lg transition-all duration-200"
            title={`Click to edit ${sectionKey.replace('_', ' ')}`}
        >
            {renderContent()}
        </div>
    );
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
                <header className="" style={{ marginBottom: `${style.section_gap}px` }}>
                    {pageData.header.map(key => <SectionItem key={key} sectionKey={key} resume={resume} style={style} isEditable={isEditable} />)}
                </header>
            )}

            {/* Main Layout */}
            {layout.type === 'two_column' ? (
                <div className="flex w-full" style={{ gap: `${style.section_gap * 2}px` }}>
                    {/* Left Column */}
                    <div
                        className="flex flex-col shrink-0"
                        style={{
                            width: `calc(${(layout.columns?.left || 0.35) * 100}% - ${style.section_gap}px)`,
                            gap: `${style.section_gap}px`
                        }}
                    >
                        {pageData.left.map(key => <SectionItem key={key} sectionKey={key} resume={resume} style={style} isEditable={isEditable} />)}
                    </div>

                    {/* Right Column */}
                    <div
                        className="flex flex-col flex-1 shrink-0"
                        style={{
                            width: `calc(${(layout.columns?.right || 0.65) * 100}% - ${style.section_gap}px)`,
                            gap: `${style.section_gap}px`
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
                <div className="flex flex-col" style={{ marginTop: `${style.section_gap}px`, gap: `${style.section_gap}px` }}>
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
        const allKeys: string[] = [];
        const SPLIT_SECTIONS = ['work_experiences', 'educations', 'skill_categories'];

        // 1. Prepare combined list of sections for sorting
        const standardSections = Object.entries(templateDefinition.sections)
            .filter(([key]) => key !== 'custom_sections');

        const customSectionsAsEntries = (resume.custom_sections || []).map(section => {
            const config = (templateDefinition.sections as any)['custom_sections'] || { order: 99, area: 'full', visible: true };
            return [`custom.${section.id}`, config] as [string, any];
        });

        const combinedSections = [...standardSections, ...customSectionsAsEntries]
            .sort(([keyA, configA], [keyB, configB]) => {
                const idA = keyA.startsWith('custom.') ? keyA.split('.')[1] : keyA;
                const idB = keyB.startsWith('custom.') ? keyB.split('.')[1] : keyB;
                const orderA = resume.section_settings?.[idA]?.order ?? configA.order ?? 99;
                const orderB = resume.section_settings?.[idB]?.order ?? configB.order ?? 99;
                return orderA - orderB;
            });

        // 2. Generate granular keys in sorted order
        combinedSections.forEach(([key, config]) => {
            const id = key.startsWith('custom.') ? key.split('.')[1] : key;
            const settings = resume.section_settings?.[id];
            const isVisible = isEditable || (settings?.visible ?? config.visible ?? true);

            if (isVisible) {
                if (key.startsWith('custom.')) {
                    const section = resume.custom_sections?.find(s => s.id === id);
                    if (section) {
                        allKeys.push(`${key}:header`);
                        (section.items || []).forEach(item => {
                            allKeys.push(`${key}:items:${item.id}`);
                        });
                    }
                } else if (SPLIT_SECTIONS.includes(key)) {
                    allKeys.push(`${key}:header`);
                    const items = (resume as any)[key] || [];
                    items.forEach((item: any) => {
                        allKeys.push(`${key}:items:${item.id}`);
                    });
                } else {
                    allKeys.push(key);
                }
            }
        });

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
        return calculatePages(resume, templateDefinition, sectionHeights, isEditable, allKeys);
    }, [resume, templateDefinition, sectionHeights, isEditable, allKeys]);

    // Page dimensions for measurement
    const widthMm = resume.page?.size === 'LETTER' ? 216 : 210;
    const heightMm = resume.page?.size === 'LETTER' ? 279 : 297;
    const finalWidth = resume.page?.orientation === 'landscape' ? heightMm : widthMm;
    const margins = resume.page?.margins_mm || { top: 20, right: 20, bottom: 20, left: 20 };
    const measurementWidthMm = finalWidth - margins.left - margins.right;

    return (
        <div className="relative">
            {/* Hidden Measurement Layer */}
            <div
                ref={measureRef}
                className="absolute top-0 left-0 opacity-0 pointer-events-none z-[-1]"
                style={{
                    visibility: 'hidden',
                    width: `${measurementWidthMm}mm`,
                    fontFamily: templateDefinition.style.font_family,
                    lineHeight: templateDefinition.style.line_height,
                    fontSize: `${0.875 * templateDefinition.style.body_scale}rem`,
                }}
            >
                {allKeys.map(key => {
                    // Determine width based on area
                    const [baseKey] = key.split(':');
                    let config = templateDefinition.sections[baseKey as keyof typeof templateDefinition.sections];
                    let settings = resume.section_settings?.[baseKey];

                    // Handle Custom Section Logic
                    if (baseKey.startsWith('custom.')) {
                        const sectionId = baseKey.split('.')[1];
                        // Fallback to generic 'custom_sections' config from template
                        config = templateDefinition.sections['custom_sections'] || { area: 'full', visible: true, order: 99 };
                        // Get specific settings for this section ID
                        settings = resume.section_settings?.[sectionId];
                    }

                    const area = settings?.area ?? config?.area ?? 'full';

                    let width = '100%';
                    if (templateDefinition.layout.type === 'two_column') {
                        const sectionGap = templateDefinition.style.section_gap;
                        if (area === 'left') {
                            const pct = (templateDefinition.layout.columns?.left || 0.35) * 100;
                            width = `calc(${pct}% - ${sectionGap}px)`;
                        }
                        if (area === 'right') {
                            const pct = (templateDefinition.layout.columns?.right || 0.65) * 100;
                            width = `calc(${pct}% - ${sectionGap}px)`;
                        }
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
