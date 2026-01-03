"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { Hobby } from "../../../types/resume";
import { Plus, Trash2, X, Heart, ChevronUp, ChevronDown } from "lucide-react";

interface HobbiesFormProps {
    items: Hobby[];
}

export const HobbiesForm: React.FC<HobbiesFormProps> = ({ items = [] }) => {
    const { updateHobbies, reorderItems, resume } = useResumeStore();
    const accentColor = resume?.template?.definition?.style?.accent_color || "#2563EB";

    const handleAdd = () => {
        const newItem: Hobby = {
            id: crypto.randomUUID(),
            label: "New Hobby",
            order: items.length,
        };
        updateHobbies([...items, newItem]);
    };

    const handleUpdate = (id: string, label: string) => {
        const newItems = items.map((item) =>
            item.id === id ? { ...item, label } : item
        );
        updateHobbies(newItems);
    };

    const handleDelete = (id: string) => {
        const newItems = items.filter((item) => item.id !== id);
        updateHobbies(newItems);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-2">
                <div className="space-y-1">
                    <h3 className="text-lg font-black text-gray-900">Hobbies</h3>
                    <p className="text-xs text-gray-500 font-medium">What do you enjoy doing in your free time?</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all active:scale-95"
                >
                    <Plus size={16} /> Add Hobby
                </button>
            </div>

            <div className="bg-gray-50/50 p-8 rounded-[32px] border border-gray-100">
                <div className="flex flex-wrap gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="group flex items-center gap-3 bg-white pl-5 pr-2 py-3 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
                        >
                            <Heart size={14} className="text-pink-500" />
                            <input
                                type="text"
                                value={item.label || ""}
                                onChange={(e) => handleUpdate(item.id, e.target.value)}
                                className="bg-transparent text-sm font-bold text-gray-700 w-36 focus:outline-none placeholder-gray-300"
                                placeholder="e.g. Photography"
                            />
                            <div className="flex items-center gap-0.5 border-l border-gray-100 ml-1 pl-1">
                                <button
                                    onClick={() => {
                                        const newIds = items.map(i => i.id);
                                        const idx = items.indexOf(item);
                                        if (idx > 0) {
                                            [newIds[idx - 1], newIds[idx]] = [newIds[idx], newIds[idx - 1]];
                                            reorderItems('hobbies', newIds);
                                        }
                                    }}
                                    disabled={items.indexOf(item) === 0}
                                    className="p-1 text-gray-300 hover:text-blue-600 disabled:opacity-30 transition-all"
                                    title="Move Left"
                                >
                                    <ChevronUp size={14} className="-rotate-90" />
                                </button>
                                <button
                                    onClick={() => {
                                        const newIds = items.map(i => i.id);
                                        const idx = items.indexOf(item);
                                        if (idx < items.length - 1) {
                                            [newIds[idx + 1], newIds[idx]] = [newIds[idx], newIds[idx + 1]];
                                            reorderItems('hobbies', newIds);
                                        }
                                    }}
                                    disabled={items.indexOf(item) === items.length - 1}
                                    className="p-1 text-gray-300 hover:text-blue-600 disabled:opacity-30 transition-all"
                                    title="Move Right"
                                >
                                    <ChevronDown size={14} className="-rotate-90" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-dashed border-gray-200 text-sm font-bold text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all bg-white/50"
                    >
                        <Plus size={16} /> Add Hobby
                    </button>
                </div>
            </div>
        </div>
    );
};
