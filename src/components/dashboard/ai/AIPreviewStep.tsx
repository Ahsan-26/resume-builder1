"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AIWizardSession, confirmAIResume } from "@/lib/api/ai";
import { fetchTemplates } from "@/lib/api/resumes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Check, FileText } from "lucide-react";
import { AIPreviewInput } from "@/lib/api/ai";

interface AIPreviewStepProps {
    session: AIWizardSession;
    inputData: AIPreviewInput;
    onBack: () => void;
    onClose: () => void;
}

export const AIPreviewStep: React.FC<AIPreviewStepProps> = ({ session, inputData, onBack, onClose }) => {
    const router = useRouter();
    const [templates, setTemplates] = useState<any[]>([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);

    useEffect(() => {
        const loadTemplates = async () => {
            try {
                const data = await fetchTemplates();
                // Filter active templates and maybe sort by popularity/newest
                setTemplates(data || []);
                if (data && data.length > 0) {
                    setSelectedTemplateId(data[0].id);
                }
            } catch (error) {
                console.error("Failed to load templates", error);
                toast.error("Failed to load templates");
            } finally {
                setIsLoadingTemplates(false);
            }
        };
        loadTemplates();
    }, []);

    const handleConfirm = async () => {
        if (!selectedTemplateId) return;

        setIsSaving(true);
        try {
            const result = await confirmAIResume({
                wizard_id: session.wizard_id,
                template_id: selectedTemplateId,
                title: inputData.name || `${inputData.target_role} Resume`,
            });

            toast.success("Resume created successfully!");
            onClose(); // Close wizard
            router.push(result.redirect_url); // Navigate to editor (handled by next.js router usually)
            // Force navigation if needed or let the router handle it
            window.location.href = result.redirect_url;
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to create resume");
            setIsSaving(false);
        }
    };

    // Extract some preview data from draft
    const { draft_resume } = session;
    const summary = draft_resume.personal_info?.summary || "No summary generated.";
    const expCount = draft_resume.work_experiences?.length || 0;
    const skillsCount = draft_resume.skill_categories?.reduce((acc: number, cat: any) => acc + (cat.items?.length || 0), 0) || 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Your AI Resume is Ready!</h3>
                <p className="text-gray-500">We've generated a professional draft based on your inputs.</p>
            </div>

            {/* AI Summary Card */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800/30">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <FileText size={16} className="text-purple-600" />
                    Generated Content
                </h4>
                <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-300 shadow-sm">
                        <p className="line-clamp-3 italic">"{summary}"</p>
                    </div>
                    <div className="flex gap-4 text-xs font-bold text-gray-500">
                        <span className="flex items-center gap-1 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg">
                            <Check size={12} className="text-green-500" /> {expCount} Experience Entries
                        </span>
                        <span className="flex items-center gap-1 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg">
                            <Check size={12} className="text-green-500" /> {skillsCount} Skills Identified
                        </span>
                    </div>
                </div>
            </div>

            {/* Template Selection */}
            <div className="space-y-4">
                <h4 className="font-bold text-gray-900 dark:text-white">Select a Template</h4>
                {isLoadingTemplates ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="animate-spin text-purple-600" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-60 overflow-y-auto pr-2">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                onClick={() => setSelectedTemplateId(template.id)}
                                className={`cursor-pointer group relative rounded-xl overflow-hidden border-2 transition-all ${selectedTemplateId === template.id
                                        ? 'border-purple-600 ring-2 ring-purple-100 dark:ring-purple-900'
                                        : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                                    }`}
                            >
                                <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 relative">
                                    {template.preview_image_url ? (
                                        <img src={template.preview_image_url} alt={template.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <FileText size={24} />
                                        </div>
                                    )}
                                    {selectedTemplateId === template.id && (
                                        <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center">
                                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-lg">
                                                <Check size={16} strokeWidth={3} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-2 text-center text-xs font-bold truncate bg-white dark:bg-gray-800">
                                    {template.name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    onClick={onBack}
                    disabled={isSaving}
                    className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                    Back
                </button>
                <button
                    onClick={handleConfirm}
                    disabled={isSaving || !selectedTemplateId}
                    className="flex-[2] py-4 bg-[#00004d] hover:bg-[#002366] text-white rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="animate-spin" size={20} /> Creating Resume...
                        </>
                    ) : (
                        "Create Resume"
                    )}
                </button>
            </div>
        </motion.div>
    );
};
