"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { Strength } from "../../../types/resume";
import { Plus, Trash2, X } from "lucide-react";

interface StrengthsFormProps {
    items: Strength[];
}

export const StrengthsForm: React.FC<StrengthsFormProps> = ({ items = [] }) => {
    const { updateStrengths, saveResume } = useResumeStore();

    const handleAdd = () => {
        const newItem: Strength = {
            id: crypto.randomUUID(),
            label: "New Strength",
            order: items.length,
        };
        updateStrengths([...items, newItem]);
    };

    const handleUpdate = (id: string, label: string) => {
        const newItems = items.map((item) =>
            item.id === id ? { ...item, label } : item
        );
        updateStrengths(newItems);
    };

    const handleDelete = (id: string) => {
        const newItems = items.filter((item) => item.id !== id);
        updateStrengths(newItems);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#00004d]">Strengths</h3>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 text-sm font-medium text-[#00004d] hover:text-[#002366]"
                >
                    <Plus size={16} /> Add Strength
                </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex flex-wrap gap-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="group flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:border-[#00004d] transition-colors"
                        >
                            <input
                                type="text"
                                value={item.label}
                                onChange={(e) => handleUpdate(item.id, e.target.value)}
                                
                                className="bg-transparent text-sm font-medium text-gray-700 w-32 focus:outline-none"
                            />
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-1 px-4 py-2 rounded-full border border-dashed border-gray-300 text-sm text-gray-500 hover:border-[#00004d] hover:text-[#00004d] transition-colors bg-white"
                    >
                        <Plus size={14} /> Add
                    </button>
                </div>
            </div>
        </div>
    );
};
