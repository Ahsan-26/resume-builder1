"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { Education } from "../../../types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp, GraduationCap, Calendar, MapPin, AlignLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DatePicker } from "../renderer/DatePicker";

interface EducationFormProps {
    items: Education[];
}

export const EducationForm: React.FC<EducationFormProps> = ({ items = [] }) => {
    const { addEducation, updateEducation, removeEducation, resume } = useResumeStore();
    const [expandedId, setExpandedId] = React.useState<string | null>(items[0]?.id || null);
    const accentColor = resume?.template?.definition?.style?.accent_color || "#2563EB";

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

    const inputClasses = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400";
    const labelClasses = "block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1";

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-2">
                <div className="space-y-1">
                    <h3 className="text-lg font-black text-gray-900">Education</h3>
                    <p className="text-xs text-gray-500 font-medium">Add your academic background and certifications.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all active:scale-95"
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
                            className={`border rounded-[24px] overflow-hidden transition-all duration-300 ${expandedId === item.id ? 'border-blue-200 shadow-xl shadow-blue-50/50 ring-1 ring-blue-100' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                        >
                            <div
                                className={`flex items-center justify-between p-5 cursor-pointer transition-colors ${expandedId === item.id ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}`}
                                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${expandedId === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400'}`}>
                                        <GraduationCap size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-gray-900">
                                            {item.school_name || "School / University"}
                                        </h4>
                                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                                            {item.degree} {item.field_of_study ? `in ${item.field_of_study}` : ""} {item.start_date ? `• ${item.start_date}` : ""}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(item.id);
                                        }}
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className={`p-1 rounded-lg transition-colors ${expandedId === item.id ? 'text-blue-600' : 'text-gray-400'}`}>
                                        {expandedId === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </div>
                            </div>

                            {expandedId === item.id && (
                                <div className="p-6 pt-2 border-t border-blue-50/50 bg-white space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2 space-y-1.5">
                                            <label className={labelClasses}>School / University</label>
                                            <input
                                                type="text"
                                                value={item.school_name || ""}
                                                onChange={(e) => handleChange(item.id, "school_name", e.target.value)}
                                                className={inputClasses}
                                                placeholder="e.g. Harvard University"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={labelClasses}>Degree</label>
                                            <input
                                                type="text"
                                                value={item.degree || ""}
                                                onChange={(e) => handleChange(item.id, "degree", e.target.value)}
                                                className={inputClasses}
                                                placeholder="e.g. Bachelor's"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={labelClasses}>Field of Study</label>
                                            <input
                                                type="text"
                                                value={item.field_of_study || ""}
                                                onChange={(e) => handleChange(item.id, "field_of_study", e.target.value)}
                                                className={inputClasses}
                                                placeholder="e.g. Computer Science"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={labelClasses}>Start Date</label>
                                            <DatePicker
                                                value={item.start_date || ""}
                                                onChange={(val) => handleChange(item.id, "start_date", val)}
                                                placeholder="MM/YYYY"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={labelClasses}>End Date</label>
                                            <DatePicker
                                                value={item.end_date || ""}
                                                onChange={(val) => handleChange(item.id, "end_date", val)}
                                                placeholder="MM/YYYY"
                                                disabled={item.is_current}
                                            />
                                        </div>
                                        <div className="md:col-span-2 flex items-center gap-3 px-1">
                                            <input
                                                type="checkbox"
                                                id={`current-edu-${item.id}`}
                                                checked={item.is_current}
                                                onChange={(e) => handleChange(item.id, "is_current", e.target.checked)}
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
                                            />
                                            <label htmlFor={`current-edu-${item.id}`} className="text-sm font-bold text-gray-700 cursor-pointer">
                                                I currently study here
                                            </label>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={labelClasses}>City</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                <input
                                                    type="text"
                                                    value={item.city || ""}
                                                    onChange={(e) => handleChange(item.id, "city", e.target.value)}
                                                    className={`${inputClasses} pl-11`}
                                                    placeholder="e.g. Cambridge, MA"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={labelClasses}>Country</label>
                                            <input
                                                type="text"
                                                value={item.country || ""}
                                                onChange={(e) => handleChange(item.id, "country", e.target.value)}
                                                className={inputClasses}
                                                placeholder="e.g. USA"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-1.5 pt-2">
                                            <label className={labelClasses}>Description & Achievements</label>
                                            <div className="relative">
                                                <AlignLeft className="absolute left-4 top-4 text-gray-400" size={16} />
                                                <textarea
                                                    value={item.description || ""}
                                                    onChange={(e) => handleChange(item.id, "description", e.target.value)}
                                                    rows={5}
                                                    className={`${inputClasses} pl-11 resize-none leading-relaxed`}
                                                    placeholder="Describe your achievements, GPA, relevant coursework, etc..."
                                                />
                                            </div>
                                        </div>
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
