"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { SkillCategory, SkillItem } from "../../../types/resume";
import { Plus, Trash2, X } from "lucide-react";

interface SkillsFormProps {
    categories: SkillCategory[];
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ categories = [] }) => {
    const { updateSkillCategories, saveResume } = useResumeStore();

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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#00004d]">Skills</h3>
                <button
                    onClick={handleAddCategory}
                    className="flex items-center gap-2 text-sm font-medium text-[#00004d] hover:text-[#002366]"
                >
                    <Plus size={16} /> Add Category
                </button>
            </div>

            <div className="space-y-6">
                {categories.map((category) => (
                    <div key={category.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                            <input
                                type="text"
                                value={category.name}
                                onChange={(e) => handleUpdateCategory(category.id, e.target.value)}
                                
                                className="bg-transparent font-medium text-gray-900 border-b border-transparent hover:border-gray-300 focus:border-[#00004d] focus:outline-none transition-colors"
                            />
                            <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {category.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="group flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm hover:border-[#00004d] transition-colors"
                                >
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleUpdateItem(category.id, item.id, e.target.value)}
                                        
                                        className="bg-transparent text-sm text-gray-700 w-24 focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleDeleteItem(category.id, item.id)}
                                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => handleAddItem(category.id)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-gray-300 text-sm text-gray-500 hover:border-[#00004d] hover:text-[#00004d] transition-colors"
                            >
                                <Plus size={14} /> Add Skill
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
