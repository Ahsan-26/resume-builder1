"use client";

import React, { useEffect, useState } from "react";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { fetchTemplates } from "@/lib/api/templates";
import { Template } from "@/types/resume";
import { Check, Loader2, Search } from "lucide-react";
import Image from "next/image";

export const TemplatesForm: React.FC = () => {
    const { currentCoverLetter, updateCoverLetter } = useCoverLetterStore();
    const [templates, setTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTemplates = async () => {
            try {
                setIsLoading(true);
                const data = await fetchTemplates('cover_letter');
                setTemplates(data);
            } catch (err) {
                console.error("Failed to load templates", err);
                setError("Failed to load templates. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        loadTemplates();
    }, []);

    const handleSelectTemplate = (templateId: string) => {
        if (currentCoverLetter?.id) {
            updateCoverLetter(currentCoverLetter.id, { template_id: templateId });
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-600" />
                <p className="text-sm font-medium">Fetching beautiful templates...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-500 bg-red-50 rounded-2xl border border-red-100 italic text-sm">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {templates.map((template) => {
                    const isActive = currentCoverLetter?.template === template.id || currentCoverLetter?.template_id === template.id;

                    return (
                        <button
                            key={template.id}
                            onClick={() => handleSelectTemplate(template.id)}
                            className={`
                                relative group overflow-hidden rounded-2xl border-2 transition-all duration-300 text-left
                                ${isActive
                                    ? "border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-50"
                                    : "border-gray-100 bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-gray-200/50"}
                            `}
                        >
                            {/* Thumbnail */}
                            <div className="aspect-[3/4] relative bg-gray-50 overflow-hidden border-b border-gray-100">
                                {(() => {
                                    const src = template.preview_image_url;
                                    if (!src) return null;

                                    let isUrlValid = false;
                                    if (src.startsWith('/')) {
                                        isUrlValid = true;
                                    } else {
                                        try {
                                            const urlToTest = src.startsWith('http') ? src : `https://${src}`;
                                            const parsed = new URL(urlToTest);
                                            isUrlValid = parsed.hostname.includes('.') && !parsed.hostname.includes(' ');
                                        } catch {
                                            isUrlValid = false;
                                        }
                                    }

                                    if (!isUrlValid) {
                                        return (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-300 text-[10px] text-center p-4 italic">
                                                Image Link Error
                                            </div>
                                        );
                                    }

                                    return (
                                        <Image
                                            src={src}
                                            alt={template.name}
                                            fill
                                            className={`object-cover transition-transform duration-500 ${isActive ? "scale-105" : "group-hover:scale-110"}`}
                                            unoptimized={true}
                                        />
                                    );
                                })()}

                                {!template.preview_image_url && (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                        No Preview
                                    </div>
                                )}

                                {isActive && (
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg animate-in zoom-in duration-300">
                                        <Check size={18} />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <p className="text-white text-[10px] font-bold uppercase tracking-widest translate-y-2 group-hover:translate-y-0 transition-transform">
                                        Select Template
                                    </p>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className={`text-sm font-bold truncate ${isActive ? "text-indigo-900" : "text-gray-900"}`}>
                                    {template.name}
                                </h3>
                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                                    {template.category || "Professional"}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {templates.length === 0 && (
                <div className="py-12 text-center text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <Search className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">No cover letter templates found.</p>
                </div>
            )}
        </div>
    );
};
