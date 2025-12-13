"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { Education } from "../../../types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EducationFormProps {
    items: Education[];
}

export const EducationForm: React.FC<EducationFormProps> = ({ items = [] }) => {
    const { addEducation, updateEducation, removeEducation, saveResume } = useResumeStore();
    const [expandedId, setExpandedId] = React.useState<string | null>(items[0]?.id || null);

    const handleAdd = () => {
        const newEducation: Education = {
            id: crypto.randomUUID(),
            degree: "",
            field_of_study: "",
            school_name: "",
            city: "",
            country: "",
            start_date: "",
            end_date: "",
            is_current: false,
            description: "",
            order: items.length,
        };
        addEducation(newEducation);
        setExpandedId(newEducation.id);
    };

    const handleChange = (id: string, field: keyof Education, value: any) => {
        updateEducation(id, { [field]: value });
    };


    const handleDelete = (id: string) => {
        removeEducation(id);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#00004d]">Education</h3>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 text-sm font-medium text-[#00004d] hover:text-[#002366]"
                >
                    <Plus size={16} /> Add Education
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
                                        {item.school_name || "(Not specified)"}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {item.degree} {item.field_of_study ? `in ${item.field_of_study}` : ""}
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
                                            School / University
                                        </label>
                                        <input
                                            type="text"
                                            value={item.school_name}
                                            onChange={(e) => handleChange(item.id, "school_name", e.target.value)}
                                            
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none"
                                            placeholder="e.g. Harvard University"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Degree
                                        </label>
                                        <input
                                            type="text"
                                            value={item.degree}
                                            onChange={(e) => handleChange(item.id, "degree", e.target.value)}
                                            
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none"
                                            placeholder="e.g. Bachelor's"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Field of Study
                                        </label>
                                        <input
                                            type="text"
                                            value={item.field_of_study}
                                            onChange={(e) => handleChange(item.id, "field_of_study", e.target.value)}
                                            
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none"
                                            placeholder="e.g. Computer Science"
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
                                            id={`current-edu-${item.id}`}
                                            checked={item.is_current}
                                            onChange={(e) => handleChange(item.id, "is_current", e.target.checked)}
                                            
                                            className="rounded border-gray-300 text-[#00004d] focus:ring-[#00004d]"
                                        />
                                        <label htmlFor={`current-edu-${item.id}`} className="text-sm text-gray-700">
                                            I currently study here
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
                                            placeholder="Describe your achievements, GPA, etc..."
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
