"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { SkillCategory, SkillItem } from "../../../types/resume";
import { Plus, Trash2, X, Wrench, Sparkles } from "lucide-react";

interface SkillsFormProps {
    categories: SkillCategory[];
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ categories = [] }) => {
    const { updateSkillCategories, resume } = useResumeStore();
    const accentColor = resume?.template?.definition?.style?.accent_color || "#2563EB";

    const handleAddCategory = () => {
        const newCategory: SkillCategory = {
            id: crypto.randomUUID(),
            name: "New Category",
            order: categories.length,
            items: [],
        };
        updateSkillCategories([...categories, newCategory]);
    };

    const handleUpdateCategory = (id: string, name: string) => {
        const newCategories = categories.map((cat) =>
            cat.id === id ? { ...cat, name } : cat
        );
        updateSkillCategories(newCategories);
    };

    const handleDeleteCategory = (id: string) => {
        const newCategories = categories.filter((cat) => cat.id !== id);
        updateSkillCategories(newCategories);
    };

    const handleAddItem = (categoryId: string) => {
        const newCategories = categories.map((cat) => {
            if (cat.id === categoryId) {
                const newItem: SkillItem = {
                    id: crypto.randomUUID(),
                    name: "New Skill",
                    level: "expert",
                    order: cat.items.length,
                };
                return { ...cat, items: [...cat.items, newItem] };
            }
            return cat;
        });
        updateSkillCategories(newCategories);
    };

    const handleUpdateItem = (categoryId: string, itemId: string, name: string) => {
        const newCategories = categories.map((cat) => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    items: cat.items.map((item) =>
                        item.id === itemId ? { ...item, name } : item
                    ),
                };
            }
            return cat;
        });
        updateSkillCategories(newCategories);
    };

    const handleDeleteItem = (categoryId: string, itemId: string) => {
        const newCategories = categories.map((cat) => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    items: cat.items.filter((item) => item.id !== itemId),
                };
            }
            return cat;
        });
        updateSkillCategories(newCategories);
    };

    const inputClasses = "w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-bold text-gray-900 placeholder-gray-400";
    const labelClasses = "block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1";

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-2">
                <div className="space-y-1">
                    <h3 className="text-lg font-black text-gray-900">Skills</h3>
                    <p className="text-xs text-gray-500 font-medium">Highlight your technical and soft skills.</p>
                </div>
                <button
                    onClick={handleAddCategory}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all active:scale-95"
                >
                    <Plus size={16} /> Add Category
                </button>
            </div>

            <div className="space-y-6">
                {categories.map((category) => (
                    <div key={category.id} className="bg-gray-50/50 p-6 rounded-[24px] border border-gray-100 space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={category.name}
                                    onChange={(e) => handleUpdateCategory(category.id, e.target.value)}
                                    className="bg-transparent text-sm font-black text-gray-900 border-none focus:ring-0 p-0 placeholder-gray-300 w-full"
                                    placeholder="Category Name (e.g. Programming Languages)"
                                />
                                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-blue-600 rounded-full" />
                            </div>
                            <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                            {category.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="group flex items-center gap-2 bg-white pl-4 pr-2 py-2 rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
                                >
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleUpdateItem(category.id, item.id, e.target.value)}
                                        className="bg-transparent text-xs font-bold text-gray-700 w-24 focus:outline-none placeholder-gray-300"
                                        placeholder="Skill name"
                                    />
                                    <button
                                        onClick={() => handleDeleteItem(category.id, item.id)}
                                        className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => handleAddItem(category.id)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-gray-200 text-xs font-bold text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                            >
                                <Plus size={14} /> Add Skill
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Suggestion Placeholder */}
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                        <Sparkles size={16} />
                    </div>
                    <p className="text-xs font-bold text-indigo-900">Need help? Let AI suggest skills based on your job title.</p>
                </div>
                <button className="px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                    Suggest Skills
                </button>
            </div>
        </div>
    );
};
