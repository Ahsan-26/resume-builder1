"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { WorkExperience } from "../../../types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp, Briefcase, Calendar, MapPin, AlignLeft, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DatePicker } from "../renderer/DatePicker";
import { generateExperienceDescription, generateBullets } from "@/lib/api/ai";
import toast from "react-hot-toast";

interface ExperienceFormProps {
    items: WorkExperience[];
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ items = [] }) => {
    const { addExperience, updateExperience, removeExperience, resume } = useResumeStore();
    const [expandedId, setExpandedId] = React.useState<string | null>(items[0]?.id || null);
    const accentColor = resume?.template?.definition?.style?.accent_color || "#2563EB";

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
            bullets: [],
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

    const [generatingId, setGeneratingId] = React.useState<string | null>(null);
    const [activeGenerator, setActiveGenerator] = React.useState<'desc' | 'bullets' | null>(null);

    const handleGenerateDescription = async (id: string, item: WorkExperience) => {
        if (!item.position_title || !item.company_name) {
            toast.error("Please enter Job Title and Company first.");
            return;
        }
        setGeneratingId(id);
        setActiveGenerator('desc');
        try {
            const result = await generateExperienceDescription({
                role: item.position_title,
                company: item.company_name,
                tone: 'professional'
            });
            updateExperience(id, { description: result.description });
            toast.success("Description generated!");
        } catch (e: any) {
            console.error(e);
            toast.error(e.message || "Failed to generate description");
        } finally {
            setGeneratingId(null);
            setActiveGenerator(null);
        }
    };

    const handleGenerateBullets = async (id: string, item: WorkExperience) => {
        if (!item.position_title || !item.company_name || !item.description) {
            toast.error("Please ensure Role, Company and Description are filled.");
            return;
        }
        setGeneratingId(id);
        setActiveGenerator('bullets');
        try {
            const result = await generateBullets({
                role: item.position_title,
                company: item.company_name,
                description: item.description,
                count: 4,
                tone: 'professional'
            });
            updateExperience(id, { bullets: result.bullets });
            toast.success("Bullets generated!");
        } catch (e: any) {
            console.error(e);
            toast.error(e.message || "Failed to generate bullets");
        } finally {
            setGeneratingId(null);
            setActiveGenerator(null);
        }
    };

    const inputClasses = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400";
    const labelClasses = "block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1";

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-2">
                <div className="space-y-1">
                    <h3 className="text-lg font-black text-gray-900">Work Experience</h3>
                    <p className="text-xs text-gray-500 font-medium">List your relevant work history, starting with the most recent.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all active:scale-95"
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
                            className={`border rounded-[24px] overflow-hidden transition-all duration-300 ${expandedId === item.id ? 'border-blue-200 shadow-xl shadow-blue-50/50 ring-1 ring-blue-100' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                        >
                            <div
                                className={`flex items-center justify-between p-5 cursor-pointer transition-colors ${expandedId === item.id ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}`}
                                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${expandedId === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400'}`}>
                                        <Briefcase size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-gray-900">
                                            {item.position_title || "New Position"}
                                        </h4>
                                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                                            {item.company_name || "Company Name"} {item.start_date ? `• ${item.start_date}` : ""}
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
                                            <label className={labelClasses}>Job Title</label>
                                            <input
                                                type="text"
                                                value={item.position_title || ""}
                                                onChange={(e) => handleChange(item.id, "position_title", e.target.value)}
                                                className={inputClasses}
                                                placeholder="e.g. Senior Product Designer"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-1.5">
                                            <label className={labelClasses}>Company</label>
                                            <input
                                                type="text"
                                                value={item.company_name || ""}
                                                onChange={(e) => handleChange(item.id, "company_name", e.target.value)}
                                                className={inputClasses}
                                                placeholder="e.g. Kickresume"
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
                                                id={`current-${item.id}`}
                                                checked={item.is_current}
                                                onChange={(e) => handleChange(item.id, "is_current", e.target.checked)}
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
                                            />
                                            <label htmlFor={`current-${item.id}`} className="text-sm font-bold text-gray-700 cursor-pointer">
                                                I currently work here
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
                                                    placeholder="e.g. San Francisco"
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
                                            <div className="flex justify-between items-center">
                                                <label className={labelClasses}>Description & Achievements</label>
                                                <button
                                                    onClick={() => handleGenerateDescription(item.id, item)}
                                                    disabled={generatingId === item.id}
                                                    className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
                                                >
                                                    {generatingId === item.id && activeGenerator === 'desc' ? (
                                                        <Loader2 className="animate-spin" size={12} />
                                                    ) : (
                                                        <Sparkles size={12} />
                                                    )}
                                                    Generate with AI
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <AlignLeft className="absolute left-4 top-4 text-gray-400" size={16} />
                                                <textarea
                                                    value={item.description || ""}
                                                    onChange={(e) => handleChange(item.id, "description", e.target.value)}
                                                    rows={5}
                                                    className={`${inputClasses} pl-11 resize-none leading-relaxed`}
                                                    placeholder="Describe your key responsibilities... Or click Generate to let AI write it for you!"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className={labelClasses}>Bullet Points</label>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleGenerateBullets(item.id, item)}
                                                        disabled={generatingId === item.id}
                                                        className="flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-purple-200 transition-colors disabled:opacity-50"
                                                    >
                                                        {generatingId === item.id && activeGenerator === 'bullets' ? (
                                                            <Loader2 className="animate-spin" size={12} />
                                                        ) : (
                                                            <Sparkles size={12} />
                                                        )}
                                                        AI Bullets
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            const newBullets = [...(item.bullets || []), ""];
                                                            handleChange(item.id, "bullets", newBullets);
                                                        }}
                                                        className="text-[10px] font-black text-blue-600 uppercase tracking-wider hover:underline"
                                                    >
                                                        + Add Bullet
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                {(item.bullets || []).map((bullet, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={bullet}
                                                            onChange={(e) => {
                                                                const newBullets = [...(item.bullets || [])];
                                                                newBullets[index] = e.target.value;
                                                                handleChange(item.id, "bullets", newBullets);
                                                            }}
                                                            className={inputClasses}
                                                            placeholder="e.g. Increased sales by 20% in Q3"
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                const newBullets = (item.bullets || []).filter((_, i) => i !== index);
                                                                handleChange(item.id, "bullets", newBullets);
                                                            }}
                                                            className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                ))}
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
