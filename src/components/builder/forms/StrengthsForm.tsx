"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { Strength } from "../../../types/resume";
import { Plus, Trash2, X } from "lucide-react";

interface StrengthsFormProps {
    items: Strength[];
}

import { Plus, Trash2, X, Zap } from "lucide-react";

export const StrengthsForm: React.FC<StrengthsFormProps> = ({ items = [] }) => {
    const { updateStrengths, resume } = useResumeStore();
    const accentColor = resume?.template?.definition?.style?.accent_color || "#2563EB";

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
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-2">
                <div className="space-y-1">
                    <h3 className="text-lg font-black text-gray-900">Strengths</h3>
                    <p className="text-xs text-gray-500 font-medium">What are your greatest professional strengths?</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all active:scale-95"
                >
                    <Plus size={16} /> Add Strength
                </button>
            </div>

            <div className="bg-gray-50/50 p-8 rounded-[32px] border border-gray-100">
                <div className="flex flex-wrap gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="group flex items-center gap-3 bg-white pl-5 pr-2 py-3 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
                        >
                            <Zap size={14} className="text-amber-500" />
                            <input
                                type="text"
                                value={item.label}
                                onChange={(e) => handleUpdate(item.id, e.target.value)}
                                className="bg-transparent text-sm font-bold text-gray-700 w-36 focus:outline-none placeholder-gray-300"
                                placeholder="e.g. Leadership"
                            />
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-dashed border-gray-200 text-sm font-bold text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all bg-white/50"
                    >
                        <Plus size={16} /> Add Strength
                    </button>
                </div>
            </div>
        </div>
    );
};
