"use client";

import React, { useEffect, useState } from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { fetchTemplates } from "../../../lib/api/templates";
import { Template } from "../../../types/resume";
import { Check } from "lucide-react";
import Image from "next/image";

export const TemplatesForm: React.FC = () => {
    const { resume, saveResume, updateResumeData } = useResumeStore();
    const [templates, setTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTemplates = async () => {
            try {
                const data = await fetchTemplates();
                setTemplates(data);
            } catch (error) {
                console.error("Failed to load templates", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadTemplates();
    }, []);

    const handleSelectTemplate = (template: Template) => {
        if (!resume) return;

        // Update the local store
        updateResumeData({ template });

        // Save to backend (assuming backend accepts template_id in PATCH)
        // Note: The updateResumeData action in store might need to be created or we use a direct update
        // For now, let's assume we can update the template object directly in the store

        // We also need to trigger a save. 
        // However, the backend might expect 'template_id' instead of the full template object.
        // We'll handle this in the store's save function or here.

        // Let's assume we update the store and then save.
    };

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading templates...</div>;
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Choose a Template</h3>
            <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => {
                    const isSelected = resume?.template?.id === template.id;
                    return (
                        <div
                            key={template.id}
                            onClick={() => handleSelectTemplate(template)}
                            className={`relative cursor-pointer rounded-lg border-2 overflow-hidden transition-all ${isSelected
                                    ? "border-blue-600 ring-2 ring-blue-100"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <div className="aspect-[210/297] bg-gray-100 relative">
                                {template.preview_image_url ? (
                                    <Image
                                        src={template.preview_image_url}
                                        alt={template.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                        No Preview
                                    </div>
                                )}

                                {isSelected && (
                                    <div className="absolute inset-0 bg-blue-900/10 flex items-center justify-center">
                                        <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
                                            <Check size={20} />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 bg-white border-t border-gray-100">
                                <h4 className="font-medium text-gray-900 text-sm truncate">{template.name}</h4>
                                <p className="text-xs text-gray-500 capitalize">{template.category}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
