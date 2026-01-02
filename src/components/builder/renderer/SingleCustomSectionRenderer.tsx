import React from 'react';
import { SectionProps } from './SectionComponents';
import { useResumeStore } from '@/store/useResumeStore';
import { CustomSection, CustomSectionItem } from '@/types/resume';
import { EditableField } from './EditableField';
import { Eye, EyeOff, Plus, ChevronUp, ChevronDown } from 'lucide-react';

interface SingleCustomSectionProps extends SectionProps {
    section: CustomSection;
}

export const SingleCustomSectionRenderer: React.FC<SingleCustomSectionProps> = ({ resume, style, isEditable = false, section }) => {
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

    if (!isVisible && !isEditable) return null;

    return (
        <div className={`mb-6 ${!isVisible ? 'opacity-50 grayscale' : ''}`}>

            {/* Header */}
            <div className="flex justify-between items-center border-b-2 pb-2 mb-4 group relative" style={{ borderColor: style.accent_color }}>
                {isEditable && (
                    <div className="absolute -left-8 top-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Note: Reordering logic for sections is handled globally in RearrangeModal or parent, 
                             but we could add local move buttons if needed. For now relying on RearrangeModal. */}
                    </div>
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
                    {!isVisible && <span className="text-xs font-normal normal-case text-gray-400">(Hidden)</span>}
                </h2>

                {isEditable && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => updateSectionSettings(section.id, { visible: !isVisible })}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                            title={isVisible ? "Hide Section" : "Show Section"}
                        >
                            {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button
                            onClick={() => {
                                const newItem: CustomSectionItem = {
                                    id: crypto.randomUUID(),
                                    title: "New Item",
                                    subtitle: "Subtitle",
                                    meta: "2024",
                                    description: "Description",
                                    start_date: "",
                                    end_date: "",
                                    is_current: false,
                                    order: section.items.length
                                };
                                handleUpdateSection({ ...section, items: [...section.items, newItem] });
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"
                            title="Add Item"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* Items */}
            <div className="flex flex-col gap-6">
                {section.items.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item, iIdx) => (
                    <div key={item.id} className="group/item relative">
                        {isEditable && (
                            <div className="absolute -left-8 top-0 flex flex-col gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                <button
                                    onClick={() => {
                                        const newItems = [...section.items];
                                        if (iIdx > 0) {
                                            [newItems[iIdx - 1], newItems[iIdx]] = [newItems[iIdx], newItems[iIdx - 1]];
                                            const updatedItems = newItems.map((it, idx) => ({ ...it, order: idx }));
                                            handleUpdateSection({ ...section, items: updatedItems });
                                        }
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded text-gray-400"
                                    disabled={iIdx === 0}
                                >
                                    <ChevronUp size={12} />
                                </button>
                                <button
                                    onClick={() => {
                                        const newItems = [...section.items];
                                        if (iIdx < section.items.length - 1) {
                                            [newItems[iIdx + 1], newItems[iIdx]] = [newItems[iIdx], newItems[iIdx + 1]];
                                            const updatedItems = newItems.map((it, idx) => ({ ...it, order: idx }));
                                            handleUpdateSection({ ...section, items: updatedItems });
                                        }
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded text-gray-400"
                                    disabled={iIdx === section.items.length - 1}
                                >
                                    <ChevronDown size={12} />
                                </button>
                            </div>
                        )}

                        {isEditable && (
                            <button
                                onClick={() => {
                                    const newItems = section.items.filter(i => i.id !== item.id);
                                    handleUpdateSection({ ...section, items: newItems });
                                }}
                                className="absolute -right-2 -top-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10"
                                title="Delete Item"
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
                            <span className="text-sm text-gray-500">
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
                            </span>
                        </div>
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
                    </div>
                ))}
            </div>
        </div>
    );
};
