"use client";

import React, { useState, useEffect } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { X, GripVertical, Eye, EyeOff } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";

interface RearrangeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RearrangeModal: React.FC<RearrangeModalProps> = ({ isOpen, onClose }) => {
    const { resume, updateSectionOrder } = useResumeStore();
    const [sections, setSections] = useState<{ id: string; label: string; order: number; visible: boolean; area: string }[]>([]);

    useEffect(() => {
        if (resume && isOpen) {
            const templateSections = resume.template.definition.sections;
            const currentSettings = resume.section_settings || {};

            const initialSections = Object.entries(templateSections).map(([key, config]) => ({
                id: key,
                label: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                order: currentSettings[key]?.order ?? config.order,
                visible: currentSettings[key]?.visible ?? config.visible,
                area: currentSettings[key]?.area ?? config.area
            })).sort((a, b) => a.order - b.order);

            setSections(initialSections);
        }
    }, [resume, isOpen]);

    const handleReorder = (newOrder: typeof sections, area: string) => {
        const otherSections = sections.filter(s => s.area !== area);
        const updatedAreaSections = newOrder.map((s, index) => ({ ...s, order: index, area }));
        setSections([...otherSections, ...updatedAreaSections].sort((a, b) => a.order - b.order));
    };

    const toggleVisibility = (id: string) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
    };

    const handleSave = () => {
        const newSettings: Record<string, { order: number; visible: boolean; area: any }> = {};
        sections.forEach(s => {
            newSettings[s.id] = { order: s.order, visible: s.visible, area: s.area };
        });
        updateSectionOrder(newSettings);
        onClose();
    };

    if (!isOpen) return null;

    const headerSections = sections.filter(s => s.area === 'header');
    const leftSections = sections.filter(s => s.area === 'left');
    const rightSections = sections.filter(s => s.area === 'right');
    const fullSections = sections.filter(s => s.area === 'full');

    const SectionItem = ({ section }: { section: typeof sections[0] }) => (
        <Reorder.Item
            key={section.id}
            value={section}
            className={`flex items-center gap-2 p-2 bg-white border rounded-lg shadow-sm cursor-grab active:cursor-grabbing transition-all ${section.visible ? 'border-gray-200' : 'border-gray-100 opacity-50 bg-gray-50'
                }`}
        >
            <GripVertical size={14} className="text-gray-400 shrink-0" />
            <span className="flex-1 text-[10px] font-bold text-gray-700 truncate">{section.label}</span>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleVisibility(section.id);
                }}
                className={`p-1 rounded transition-colors ${section.visible ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-400 hover:bg-gray-200'
                    }`}
            >
                {section.visible ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
        </Reorder.Item>
    );

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20"
                >
                    <div className="p-8 pb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Rearrange Sections</h2>
                            <p className="text-sm text-gray-500 font-medium">Drag to reorder, toggle visibility with the eye icon</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={24} className="text-gray-400" />
                        </button>
                    </div>

                    <div className="p-8 pt-4 space-y-6 max-h-[60vh] overflow-y-auto">
                        {/* Header Area */}
                        {headerSections.length > 0 && (
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Header</span>
                                <Reorder.Group axis="y" values={headerSections} onReorder={(newOrder) => handleReorder(newOrder, 'header')} className="space-y-2">
                                    {headerSections.map(s => <SectionItem key={s.id} section={s} />)}
                                </Reorder.Group>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Left Column</span>
                                <Reorder.Group axis="y" values={leftSections} onReorder={(newOrder) => handleReorder(newOrder, 'left')} className="space-y-2 min-h-[100px] p-2 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                    {leftSections.map(s => <SectionItem key={s.id} section={s} />)}
                                </Reorder.Group>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Right Column</span>
                                <Reorder.Group axis="y" values={rightSections} onReorder={(newOrder) => handleReorder(newOrder, 'right')} className="space-y-2 min-h-[100px] p-2 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                    {rightSections.map(s => <SectionItem key={s.id} section={s} />)}
                                </Reorder.Group>
                            </div>
                        </div>

                        {/* Full Width Area */}
                        {fullSections.length > 0 && (
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Width</span>
                                <Reorder.Group axis="y" values={fullSections} onReorder={(newOrder) => handleReorder(newOrder, 'full')} className="space-y-2">
                                    {fullSections.map(s => <SectionItem key={s.id} section={s} />)}
                                </Reorder.Group>
                            </div>
                        )}
                    </div>

                    <div className="p-8 bg-gray-50/50 flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all"
                        >
                            Apply Changes
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
