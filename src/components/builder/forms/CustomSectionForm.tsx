"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { CustomSection, CustomSectionItem } from "../../../types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp, Edit2, Layers, Calendar, AlignLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DatePicker } from "../renderer/DatePicker";

interface CustomSectionFormProps {
    sections: CustomSection[];
}

export const CustomSectionForm: React.FC<CustomSectionFormProps> = ({ sections = [] }) => {
    const { updateCustomSections, reorderItems, resume } = useResumeStore();
    const [expandedSectionId, setExpandedSectionId] = React.useState<string | null>(sections[0]?.id || null);
    const [expandedItemId, setExpandedItemId] = React.useState<string | null>(null);
    const accentColor = resume?.template?.definition?.style?.accent_color || "#2563EB";

    const handleAddSection = () => {
        const newSection: CustomSection = {
            id: crypto.randomUUID(),
            type: "custom",
            title: "New Section",
            order: sections.length,
            items: [],
        };
        updateCustomSections([...sections, newSection]);
        setExpandedSectionId(newSection.id);
    };

    const handleUpdateSectionTitle = (id: string, title: string) => {
        const newSections = sections.map((sec) =>
            sec.id === id ? { ...sec, title } : sec
        );
        updateCustomSections(newSections);
    };

    const handleDeleteSection = (id: string) => {
        const newSections = sections.filter((sec) => sec.id !== id);
        updateCustomSections(newSections);
    };

    const handleAddItem = (sectionId: string) => {
        const newSections = sections.map((sec) => {
            if (sec.id === sectionId) {
                const newItem: CustomSectionItem = {
                    id: crypto.randomUUID(),
                    title: "New Item",
                    subtitle: "",
                    meta: "",
                    description: "",
                    start_date: "",
                    end_date: "",
                    is_current: false,
                    order: sec.items.length,
                };
                return { ...sec, items: [...sec.items, newItem] };
            }
            return sec;
        });
        updateCustomSections(newSections);
        // Find the new item ID to expand it? For now just save.
    };

    const handleUpdateItem = (sectionId: string, itemId: string, field: keyof CustomSectionItem, value: any) => {
        const newSections = sections.map((sec) => {
            if (sec.id === sectionId) {
                return {
                    ...sec,
                    items: sec.items.map((item) =>
                        item.id === itemId ? { ...item, [field]: value } : item
                    ),
                };
            }
            return sec;
        });
        updateCustomSections(newSections);
    };

    const handleDeleteItem = (sectionId: string, itemId: string) => {
        const newSections = sections.map((sec) => {
            if (sec.id === sectionId) {
                return {
                    ...sec,
                    items: sec.items.filter((item) => item.id !== itemId),
                };
            }
            return sec;
        });
        updateCustomSections(newSections);
    };

    const inputClasses = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400";
    const labelClasses = "block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1";

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-2">
                <div className="space-y-1">
                    <h3 className="text-lg font-black text-gray-900">Custom Sections</h3>
                    <p className="text-xs text-gray-500 font-medium">Add any other relevant information to your resume.</p>
                </div>
                <button
                    onClick={handleAddSection}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all active:scale-95"
                >
                    <Plus size={16} /> Add Section
                </button>
            </div>

            <div className="space-y-6">
                {sections.map((section) => (
                    <div key={section.id} className={`border rounded-[32px] overflow-hidden transition-all duration-300 ${expandedSectionId === section.id ? 'border-blue-200 shadow-xl shadow-blue-50/50 ring-1 ring-blue-100' : 'border-gray-100 bg-white'}`}>
                        {/* Section Header */}
                        <div
                            className={`p-6 flex items-center justify-between cursor-pointer transition-colors ${expandedSectionId === section.id ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}`}
                            onClick={() => setExpandedSectionId(expandedSectionId === section.id ? null : section.id)}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${expandedSectionId === section.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400'}`}>
                                    <Layers size={18} />
                                </div>
                                <div className="flex-1 max-w-md relative">
                                    <input
                                        type="text"
                                        value={section.title || ""}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => handleUpdateSectionTitle(section.id, e.target.value)}
                                        className="bg-transparent text-sm font-black text-gray-900 border-none focus:ring-0 p-0 placeholder-gray-300 w-full"
                                        placeholder="Section Title (e.g. Volunteering)"
                                    />
                                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-blue-600 rounded-full" />
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newSections = [...sections];
                                        const idx = sections.indexOf(section);
                                        if (idx > 0) {
                                            [newSections[idx - 1], newSections[idx]] = [newSections[idx], newSections[idx - 1]];
                                            updateCustomSections(newSections.map((s, i) => ({ ...s, order: i })));
                                        }
                                    }}
                                    disabled={sections.indexOf(section) === 0}
                                    className="p-2 text-gray-300 hover:text-blue-600 disabled:opacity-30 rounded-lg transition-all"
                                    title="Move Up"
                                >
                                    <ChevronUp size={18} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newSections = [...sections];
                                        const idx = sections.indexOf(section);
                                        if (idx < sections.length - 1) {
                                            [newSections[idx + 1], newSections[idx]] = [newSections[idx], newSections[idx + 1]];
                                            updateCustomSections(newSections.map((s, i) => ({ ...s, order: i })));
                                        }
                                    }}
                                    disabled={sections.indexOf(section) === sections.length - 1}
                                    className="p-2 text-gray-300 hover:text-blue-600 disabled:opacity-30 rounded-lg transition-all"
                                    title="Move Down"
                                >
                                    <ChevronDown size={18} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteSection(section.id);
                                    }}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <div className={`p-1 rounded-lg transition-colors ${expandedSectionId === section.id ? 'text-blue-600' : 'text-gray-400'}`}>
                                    {expandedSectionId === section.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </div>
                        </div>

                        {/* Section Items */}
                        <AnimatePresence>
                            {expandedSectionId === section.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-6 space-y-4"
                                >
                                    <div className="space-y-4">
                                        {section.items.map((item) => (
                                            <div key={item.id} className={`border rounded-2xl overflow-hidden transition-all ${expandedItemId === item.id ? 'border-blue-100 bg-white shadow-sm' : 'border-gray-100 bg-gray-50/30'}`}>
                                                <div
                                                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-white transition-colors"
                                                    onClick={() => setExpandedItemId(expandedItemId === item.id ? null : item.id)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-2 h-2 rounded-full ${expandedItemId === item.id ? 'bg-blue-600' : 'bg-gray-300'}`} />
                                                        <span className="text-xs font-bold text-gray-700">{item.title || "New Item"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const idx = section.items.indexOf(item);
                                                                if (idx > 0) {
                                                                    const newItems = [...section.items];
                                                                    [newItems[idx - 1], newItems[idx]] = [newItems[idx], newItems[idx - 1]];
                                                                    const updatedSections = sections.map(s => s.id === section.id ? { ...s, items: newItems.map((it, i) => ({ ...it, order: i })) } : s);
                                                                    updateCustomSections(updatedSections);
                                                                }
                                                            }}
                                                            disabled={section.items.indexOf(item) === 0}
                                                            className="p-1.5 text-gray-300 hover:text-blue-600 disabled:opacity-30 rounded-md transition-all"
                                                            title="Move Up"
                                                        >
                                                            <ChevronUp size={14} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const idx = section.items.indexOf(item);
                                                                if (idx < section.items.length - 1) {
                                                                    const newItems = [...section.items];
                                                                    [newItems[idx + 1], newItems[idx]] = [newItems[idx], newItems[idx + 1]];
                                                                    const updatedSections = sections.map(s => s.id === section.id ? { ...s, items: newItems.map((it, i) => ({ ...it, order: i })) } : s);
                                                                    updateCustomSections(updatedSections);
                                                                }
                                                            }}
                                                            disabled={section.items.indexOf(item) === section.items.length - 1}
                                                            className="p-1.5 text-gray-300 hover:text-blue-600 disabled:opacity-30 rounded-md transition-all"
                                                            title="Move Down"
                                                        >
                                                            <ChevronDown size={14} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteItem(section.id, item.id);
                                                            }}
                                                            className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                        <div className="text-gray-400">
                                                            {expandedItemId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                        </div>
                                                    </div>
                                                </div>

                                                {expandedItemId === item.id && (
                                                    <div className="p-5 pt-0 grid grid-cols-1 md:grid-cols-2 gap-5">
                                                        <div className="md:col-span-2 space-y-1.5">
                                                            <label className={labelClasses}>Title</label>
                                                            <input
                                                                type="text"
                                                                value={item.title || ""}
                                                                onChange={(e) => handleUpdateItem(section.id, item.id, "title", e.target.value)}
                                                                className={inputClasses}
                                                                placeholder="e.g. Volunteer"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className={labelClasses}>Subtitle</label>
                                                            <input
                                                                type="text"
                                                                value={item.subtitle || ""}
                                                                onChange={(e) => handleUpdateItem(section.id, item.id, "subtitle", e.target.value)}
                                                                className={inputClasses}
                                                                placeholder="e.g. Red Cross"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className={labelClasses}>Start Date</label>
                                                            <DatePicker
                                                                value={item.start_date || ""}
                                                                onChange={(val) => handleUpdateItem(section.id, item.id, "start_date", val)}
                                                                placeholder="MM/YYYY"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className={labelClasses}>End Date</label>
                                                            <DatePicker
                                                                value={item.end_date || ""}
                                                                onChange={(val) => handleUpdateItem(section.id, item.id, "end_date", val)}
                                                                placeholder="MM/YYYY"
                                                                disabled={item.is_current}
                                                                align="right"
                                                            />
                                                        </div>
                                                        <div className="md:col-span-2 flex items-center gap-3 px-1">
                                                            <input
                                                                type="checkbox"
                                                                id={`current-${item.id}`}
                                                                checked={item.is_current}
                                                                onChange={(e) => handleUpdateItem(section.id, item.id, "is_current", e.target.checked)}
                                                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
                                                            />
                                                            <label htmlFor={`current-${item.id}`} className="text-sm font-bold text-gray-700 cursor-pointer">
                                                                I currently do this
                                                            </label>
                                                        </div>
                                                        <div className="md:col-span-2 space-y-1.5">
                                                            <label className={labelClasses}>Description</label>
                                                            <div className="relative">
                                                                <AlignLeft className="absolute left-4 top-4 text-gray-400" size={16} />
                                                                <textarea
                                                                    value={item.description || ""}
                                                                    onChange={(e) => handleUpdateItem(section.id, item.id, "description", e.target.value)}
                                                                    rows={4}
                                                                    className={`${inputClasses} pl-11 resize-none leading-relaxed`}
                                                                    placeholder="Details about this item..."
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => handleAddItem(section.id)}
                                            className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-xs font-bold hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Plus size={16} /> Add Item
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}

                {sections.length === 0 && (
                    <div className="text-center py-16 bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-100">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-300 mx-auto mb-4 shadow-sm">
                            <Layers size={32} />
                        </div>
                        <h4 className="text-sm font-black text-gray-900 mb-1">No custom sections yet</h4>
                        <p className="text-xs text-gray-500 font-medium mb-6">Add volunteering, awards, or any other section.</p>
                        <button
                            onClick={handleAddSection}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-sm shadow-lg shadow-blue-200 active:scale-95"
                        >
                            Create Your First Section
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
