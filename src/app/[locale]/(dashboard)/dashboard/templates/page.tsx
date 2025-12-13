"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { fetchTemplates } from "@/lib/api/templates";
import { createResume } from "@/lib/api/resumes";
import { Template } from "@/types/resume";
import { Loader2, Check, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function TemplatesPage() {
    const t = useTranslations("dashboard");
    const router = useRouter();
    const searchParams = useSearchParams();
    const resumeName = searchParams.get("name");

    const [templates, setTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState<string | null>(null);
    const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

    useEffect(() => {
        const loadTemplates = async () => {
            try {
                const data = await fetchTemplates();
                setTemplates(data);
            } catch (error) {
                console.error("Failed to load templates", error);
                toast.error("Failed to load templates");
            } finally {
                setIsLoading(false);
            }
        };
        loadTemplates();
    }, []);

    const handlePreview = (template: Template) => {
        setPreviewTemplate(template);
    };

    const closePreview = () => {
        setPreviewTemplate(null);
    };

    const handleUseTemplate = async (template: Template) => {
        setIsCreating(template.id);
        try {
            const title = resumeName || `My ${template.name} Resume`;
            const newResume = await createResume({
                title,
                template_id: template.id,
                language: "en",
                target_role: "Professional",
            });
            toast.success("Resume created!");
            router.push(`/resumes/${newResume.id}/edit`);
        } catch (error) {
            console.error("Failed to create resume", error);
            toast.error("Failed to create resume");
        } finally {
            setIsCreating(null);
            closePreview();
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Resume Templates
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Choose a professional template to start building your resume.
                </p>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                            <div className="aspect-[210/297] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                                {template.preview_image_url ? (
                                    <Image
                                        src={template.preview_image_url}
                                        alt={template.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                        No Preview
                                    </div>
                                )}

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                                    <button
                                        onClick={() => handlePreview(template)}
                                        className="w-full py-2 bg-white text-gray-900 hover:bg-gray-100 rounded-lg font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                                    >
                                        Preview
                                    </button>
                                    <button
                                        onClick={() => handleUseTemplate(template)}
                                        disabled={!!isCreating}
                                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        {isCreating === template.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Plus className="w-4 h-4" />
                                                Use Template
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                        {template.name}
                                    </h3>
                                    {template.is_premium && (
                                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                            Premium
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                    {template.category}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Preview Modal */}
            {previewTemplate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closePreview}>
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{previewTemplate.name}</h2>
                            <button onClick={closePreview} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                                <span className="sr-only">Close</span>
                                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 bg-gray-100 dark:bg-gray-900 flex justify-center">
                            {/* In a real app, we would render the actual template component here with dummy data.
                   For now, we'll show the preview image large. */}
                            <div className="relative shadow-2xl w-[210mm] min-h-[297mm] bg-white">
                                {previewTemplate.preview_image_url ? (
                                    <Image
                                        src={previewTemplate.preview_image_url}
                                        alt={previewTemplate.name}
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">No Preview Available</div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-white dark:bg-gray-800">
                            <button
                                onClick={closePreview}
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleUseTemplate(previewTemplate)}
                                disabled={!!isCreating}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2"
                            >
                                {isCreating === previewTemplate.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Use This Template
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}