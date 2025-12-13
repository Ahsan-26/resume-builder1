"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { WorkExperience } from "../../../types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceFormProps {
    items: WorkExperience[];
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ items = [] }) => {
    const { addExperience, updateExperience, removeExperience, saveResume } = useResumeStore();
    const [expandedId, setExpandedId] = React.useState<string | null>(items[0]?.id || null);

    const handleAdd = () => {
        const newExperience: WorkExperience = {
            id: crypto.randomUUID(),
            position_title: "",
            company_name: "",
            city: "",
            country: "",
            start_date: "",
            end_date: "",
            is_current: false,
            description: "",
            bullets: "",
            order: items.length,
        };
        addExperience(newExperience);
        setExpandedId(newExperience.id);
    };

    const handleChange = (id: string, field: keyof WorkExperience, value: any) => {
        updateExperience(id, { [field]: value });
    };


    const handleDelete = (id: string) => {
        removeExperience(id);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#00004d]">Work Experience</h3>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 text-sm font-medium text-[#00004d] hover:text-[#002366]"
                >
                    <Plus size={16} /> Add Experience
                </button>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                        >
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                            >
                                <div>
                                    <h4 className="font-medium text-gray-900">
                                        {item.position_title || "(Not specified)"}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {item.company_name} {item.start_date ? `• ${item.start_date}` : ""}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(item.id);
                                        }}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    {expandedId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                            </div>

                            {expandedId === item.id && (
                                <div className="p-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Job Title
                                        </label>
                                        <input
                                            type="text"
                                            value={item.position_title}
                                            onChange={(e) => handleChange(item.id, "position_title", e.target.value)}
                                            
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none"
                                            placeholder="e.g. Product Manager"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            value={item.company_name}
                                            onChange={(e) => handleChange(item.id, "company_name", e.target.value)}
                                            
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none"
                                            placeholder="e.g. Google"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="text"
                                            value={item.start_date}
                                            onChange={(e) => handleChange(item.id, "start_date", e.target.value)}
                                            
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none"
                                            placeholder="MM/YYYY"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date
                                        </label>
                                        <input
                                            type="text"
                                            value={item.end_date}
                                            disabled={item.is_current}
                                            onChange={(e) => handleChange(item.id, "end_date", e.target.value)}
                                            
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none disabled:bg-gray-100"
                                            placeholder={item.is_current ? "Present" : "MM/YYYY"}
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`current-${item.id}`}
                                            checked={item.is_current}
                                            onChange={(e) => handleChange(item.id, "is_current", e.target.checked)}
                                            
                                            className="rounded border-gray-300 text-[#00004d] focus:ring-[#00004d]"
                                        />
                                        <label htmlFor={`current-${item.id}`} className="text-sm text-gray-700">
                                            I currently work here
                                        </label>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => handleChange(item.id, "description", e.target.value)}
                                            
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none resize-none"
                                            placeholder="Describe your responsibilities and achievements..."
                                        />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
