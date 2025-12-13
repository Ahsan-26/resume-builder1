"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { CustomSection, CustomSectionItem } from "../../../types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomSectionFormProps {
    sections: CustomSection[];
}

export const CustomSectionForm: React.FC<CustomSectionFormProps> = ({ sections = [] }) => {
    const { updateCustomSections, saveResume } = useResumeStore();
    const [expandedSectionId, setExpandedSectionId] = React.useState<string | null>(null);
    const [expandedItemId, setExpandedItemId] = React.useState<string | null>(null);

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
                    title: "",
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

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#00004d]">Custom Sections</h3>
                <button
                    onClick={handleAddSection}
                    className="flex items-center gap-2 text-sm font-medium text-[#00004d] hover:text-[#002366] transition-colors"
                >
                    <Plus size={16} /> Add Section
                </button>
            </div>

            <div className="space-y-6">
                {sections.map((section) => (
                    <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        {/* Section Header */}
                        <div className="bg-gray-50 p-4 flex items-center justify-between border-b border-gray-200">
                            <div className="flex-1 mr-4">
                                <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => handleUpdateSectionTitle(section.id, e.target.value)}
                                    
                                    className="bg-transparent font-bold text-lg text-gray-900 border-b border-transparent hover:border-gray-300 focus:border-[#00004d] focus:outline-none w-full transition-colors"
                                    placeholder="Section Title (e.g. Volunteering)"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleDeleteSection(section.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Delete Section"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button
                                    onClick={() => setExpandedSectionId(expandedSectionId === section.id ? null : section.id)}
                                    className="p-2 text-gray-500 hover:text-[#00004d] transition-colors"
                                >
                                    {expandedSectionId === section.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Section Items */}
                        <AnimatePresence>
                            {expandedSectionId === section.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="p-4 bg-gray-50/50"
                                >
                                    <div className="space-y-4">
                                        {section.items.map((item) => (
                                            <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                                <div
                                                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                                    onClick={() => setExpandedItemId(expandedItemId === item.id ? null : item.id)}
                                                >
                                                    <span className="font-medium text-gray-700">{item.title || "(Untitled Item)"}</span>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteItem(section.id, item.id);
                                                            }}
                                                            className="p-1.5 text-gray-400 hover:text-red-500"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                        {expandedItemId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                    </div>
                                                </div>

                                                {expandedItemId === item.id && (
                                                    <div className="p-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="md:col-span-2">
                                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Title</label>
                                                            <input
                                                                type="text"
                                                                value={item.title}
                                                                onChange={(e) => handleUpdateItem(section.id, item.id, "title", e.target.value)}
                                                                
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none transition-all"
                                                                placeholder="e.g. Volunteer"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Subtitle</label>
                                                            <input
                                                                type="text"
                                                                value={item.subtitle}
                                                                onChange={(e) => handleUpdateItem(section.id, item.id, "subtitle", e.target.value)}
                                                                
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none transition-all"
                                                                placeholder="e.g. Red Cross"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date / Meta</label>
                                                            <input
                                                                type="text"
                                                                value={item.meta}
                                                                onChange={(e) => handleUpdateItem(section.id, item.id, "meta", e.target.value)}
                                                                
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none transition-all"
                                                                placeholder="e.g. 2020 - 2022"
                                                            />
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label>
                                                            <textarea
                                                                value={item.description}
                                                                onChange={(e) => handleUpdateItem(section.id, item.id, "description", e.target.value)}
                                                                
                                                                rows={3}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none transition-all resize-none"
                                                                placeholder="Details about this item..."
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => handleAddItem(section.id)}
                                            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-medium hover:border-[#00004d] hover:text-[#00004d] transition-all flex items-center justify-center gap-2"
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
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 mb-4">No custom sections yet.</p>
                        <button
                            onClick={handleAddSection}
                            className="px-4 py-2 bg-[#00004d] text-white rounded-lg hover:bg-[#002366] transition-colors font-medium"
                        >
                            Create Your First Section
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
