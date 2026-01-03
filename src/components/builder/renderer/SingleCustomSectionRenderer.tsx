import React from 'react';
import { SectionProps } from './SectionComponents';
import { useResumeStore } from '@/store/useResumeStore';
import { CustomSection, CustomSectionItem } from '@/types/resume';
import { EditableField } from './EditableField';
import { Eye, EyeOff, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { SectionActionToolbar } from './SectionComponents';

interface SingleCustomSectionProps extends SectionProps {
    section: CustomSection;
    renderOnly?: 'header' | 'items';
    limitToId?: string;
}

export const SingleCustomSectionRenderer: React.FC<SingleCustomSectionProps> = ({ resume, style, isEditable = false, section, renderOnly, limitToId }) => {
    const { updateCustomSections, updateSectionSettings } = useResumeStore();

    // Safety check if section was deleted but key remains
    if (!section) return null;

    const sectionSettings = resume.section_settings?.[section.id] || { order: 0, visible: true };
    const isVisible = sectionSettings.visible !== false;

    // Helper to update THIS specific section in the array
    const handleUpdateSection = (updatedSection: CustomSection) => {
        const allSections = resume.custom_sections || [];
        const newSections = allSections.map((s: CustomSection) => s.id === updatedSection.id ? updatedSection : s);
        updateCustomSections(newSections);
    };

    const sectionTitle = sectionSettings.title || section.title;

    if (!isVisible && !isEditable && !renderOnly) return null;

    return (
        <div className={`transition-all duration-300 ${(!isVisible && !renderOnly) ? 'opacity-50 grayscale' : ''} ${!renderOnly ? 'mb-6' : ''}`}>

            {/* Header */}
            {(!renderOnly || renderOnly === 'header') && (
                <div className="flex justify-between items-center border-b-2 pb-2 mb-4 group relative transition-all duration-300" style={{ borderColor: style.accent_color }}>
                    {isEditable && !renderOnly && (
                        <SectionActionToolbar
                            onToggleVisibility={() => updateSectionSettings(section.id, { visible: !isVisible })}
                            isVisible={isVisible}
                            className="-top-10 left-1/2 -translate-x-1/2"
                        />
                    )}

                    <h2 style={{
                        color: style.primary_color,
                        fontSize: `${1.25 * style.heading_scale}rem`,
                    }} className="font-bold uppercase tracking-wider flex items-center gap-2">
                        <EditableField
                            value={sectionTitle}
                            onChange={(val) => updateSectionSettings(section.id, { title: val })}
                            placeholder="Section Title"
                            isEditable={isEditable}
                        />
                        {!isVisible && <span className="text-xs font-normal normal-case text-gray-400 italic">(Temporarily Hidden)</span>}
                    </h2>
                </div>
            )}

            {/* Items */}
            {(!renderOnly || renderOnly === 'items') && (
                <div className="flex flex-col gap-6">
                    {section.items.sort((a, b) => (a.order || 0) - (b.order || 0))
                        .filter(item => !limitToId || item.id === limitToId)
                        .map((item, iIdx) => {
                            const itemSettings = sectionSettings.items?.[item.id]?.fields || {};
                            return (
                                <div key={item.id} className={`group/item relative ${limitToId ? '' : 'mb-2'}`}>
                                    {isEditable && !limitToId && (
                                        <SectionActionToolbar
                                            onMoveUp={() => {
                                                const newItems = [...section.items];
                                                if (iIdx > 0) {
                                                    [newItems[iIdx - 1], newItems[iIdx]] = [newItems[iIdx], newItems[iIdx - 1]];
                                                    const updatedItems = newItems.map((it, idx) => ({ ...it, order: idx }));
                                                    handleUpdateSection({ ...section, items: updatedItems });
                                                }
                                            }}
                                            onMoveDown={() => {
                                                const newItems = [...section.items];
                                                if (iIdx < section.items.length - 1) {
                                                    [newItems[iIdx + 1], newItems[iIdx]] = [newItems[iIdx], newItems[iIdx + 1]];
                                                    const updatedItems = newItems.map((it, idx) => ({ ...it, order: idx }));
                                                    handleUpdateSection({ ...section, items: updatedItems });
                                                }
                                            }}
                                            isFirst={iIdx === 0}
                                            isLast={iIdx === section.items.length - 1}
                                            className="-right-12 top-0 flex-col"
                                        />
                                    )}

                                    <div className="mb-2">
                                        <h3 className="text-lg font-bold text-gray-800 leading-tight">
                                            <EditableField
                                                value={item.title}
                                                onChange={(val) => {
                                                    const newItems = [...section.items];
                                                    newItems[iIdx] = { ...item, title: val };
                                                    handleUpdateSection({ ...section, items: newItems });
                                                }}
                                                placeholder="Item Title"
                                                isEditable={isEditable}
                                            />
                                        </h3>
                                        {(isEditable || item.meta) && itemSettings.meta !== false && (
                                            <div className="text-sm text-gray-500 mt-1">
                                                <EditableField
                                                    value={item.meta}
                                                    onChange={(val) => {
                                                        const newItems = [...section.items];
                                                        newItems[iIdx] = { ...item, meta: val };
                                                        handleUpdateSection({ ...section, items: newItems });
                                                    }}
                                                    placeholder="Date/Location"
                                                    isEditable={isEditable}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {(isEditable || item.subtitle) && itemSettings.subtitle !== false && (
                                        <div style={{ color: style.accent_color }} className="font-medium mb-2">
                                            <EditableField
                                                value={item.subtitle}
                                                onChange={(val) => {
                                                    const newItems = [...section.items];
                                                    newItems[iIdx] = { ...item, subtitle: val };
                                                    handleUpdateSection({ ...section, items: newItems });
                                                }}
                                                placeholder="Subtitle"
                                                isEditable={isEditable}
                                            />
                                        </div>
                                    )}
                                    {(isEditable || item.description) && itemSettings.description !== false && (
                                        <p style={{ lineHeight: style.line_height }} className="text-gray-600 whitespace-pre-line">
                                            <EditableField
                                                value={item.description}
                                                onChange={(val) => {
                                                    const newItems = [...section.items];
                                                    newItems[iIdx] = { ...item, description: val };
                                                    handleUpdateSection({ ...section, items: newItems });
                                                }}
                                                placeholder="Description..."
                                                multiline
                                                isEditable={isEditable}
                                            />
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};
