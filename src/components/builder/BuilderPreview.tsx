"use client";

import React, { useEffect, useState } from "react";
import { useResumeStore } from "../../store/useResumeStore";
import { ResumeRenderer } from "./ResumeRenderer";
import { TemplateDefinition } from "@/types/resume";
import { fetchTemplate } from "@/lib/api/templates";
import { Loader2 } from "lucide-react";

interface BuilderPreviewProps {
    isEditable?: boolean;
}

export const BuilderPreview: React.FC<BuilderPreviewProps> = ({ isEditable = false }) => {
    const { resume } = useResumeStore();
    const [localTemplateDefinition, setLocalTemplateDefinition] = useState<TemplateDefinition | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!resume) return;

        // If definition exists in resume, use it
        if (resume.template?.definition) {
            setLocalTemplateDefinition(resume.template.definition);
            return;
        }

        // If missing definition but have ID, fetch it
        const templateId = resume.template_id || resume.template?.id;
        if (templateId) {
            setIsLoading(true);
            fetchTemplate(templateId)
                .then((template) => {
                    setLocalTemplateDefinition(template.definition);
                })
                .catch((err) => {
                    console.error("Failed to fetch template definition", err);
                    setError("Failed to load template definition");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [resume]);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [contentHeight, setContentHeight] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0);

    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current || !contentRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            const resumeWidthPx = 210 * 3.78; // 210mm in pixels (approx)
            const padding = 32; // 16px on each side

            // Calculate scale
            let newScale = (containerWidth - padding) / resumeWidthPx;
            newScale = Math.min(newScale, 1);
            setScale(newScale);

            // Calculate centering offset
            const scaledWidth = resumeWidthPx * newScale;
            const availableSpace = containerWidth - scaledWidth;
            setMarginLeft(Math.max(0, availableSpace / 2));

            setContentHeight(contentRef.current.offsetHeight);
        };

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);
        if (contentRef.current) observer.observe(contentRef.current);
        updateScale();

        return () => observer.disconnect();
    }, []);

    if (!resume) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                Preview not available
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error || !localTemplateDefinition) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                {error || "Template definition not found"}
            </div>
        );
    }

    // Use only actual resume data - no sample fallbacks
    const previewResume = {
        ...resume,
        personal_info: resume.personal_info || {},
        work_experiences: resume.work_experiences || [],
        educations: resume.educations || [],
        skill_categories: resume.skill_categories || [],
        strengths: resume.strengths || [],
        hobbies: resume.hobbies || [],
        custom_sections: resume.custom_sections || [],
    };

    return (
        <div ref={containerRef} className="w-full overflow-visible py-4 sm:py-8">
            <div
                ref={contentRef}
                className="bg-white shadow-2xl w-[210mm] min-h-[297mm] origin-top-left transition-transform duration-300 ease-in-out"
                style={{
                    transform: `scale(${scale})`,
                    marginLeft: `${marginLeft}px`,
                    marginBottom: contentHeight ? `calc(${contentHeight}px * (${scale} - 1))` : 0,
                    boxShadow: `0 20px 60px -12px ${localTemplateDefinition.style.accent_color}20, 0 8px 16px -8px ${localTemplateDefinition.style.accent_color}10`
                }}
            >
                <ResumeRenderer resume={previewResume} templateDefinition={localTemplateDefinition} isEditable={isEditable} />
            </div>
        </div>
    );
};
