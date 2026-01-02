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
    const [userScale, setUserScale] = useState<number | null>(null);
    const [scale, setScale] = useState(1);
    const [contentHeight, setContentHeight] = useState(0);

    // Calculate dimensions based on config
    const getPageDimensions = () => {
        const page = resume?.page;
        // Default to A4 Portrait if missing
        let widthMm = 210;
        let heightMm = 297;

        if (page?.size === 'LETTER') {
            widthMm = 216;
            heightMm = 279;
        }

        if (page?.orientation === 'landscape') {
            [widthMm, heightMm] = [heightMm, widthMm];
        }

        const mmToPx = 3.7795275591;
        return {
            widthPx: widthMm * mmToPx,
            heightPx: heightMm * mmToPx,
            widthMm,
            heightMm
        };
    };

    const handleZoomIn = () => {
        setUserScale(prev => {
            const current = prev || scale;
            return Math.min(current + 0.1, 2.0);
        });
    };

    const handleZoomOut = () => {
        setUserScale(prev => {
            const current = prev || scale;
            return Math.max(current - 0.1, 0.2);
        });
    };

    const handleFitToScreen = () => {
        setUserScale(null);
    };

    // Calculate effective scale
    const effectiveScale = userScale !== null ? userScale : scale;

    const { widthPx, heightPx, widthMm, heightMm } = getPageDimensions();

    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current || !contentRef.current) return;

            const containerWidth = containerRef.current.clientWidth;
            const padding = 32; // Add some padding calculation if needed

            // Calculate auto-scale to fit container width
            // We subtract a bit of padding to ensure it floats nicely
            let newScale = (containerWidth - 32) / widthPx;

            // On very large screens, don't scale up beyond 1.5 automatically
            newScale = Math.min(newScale, 1.5);

            // On very small screens, ensure we don't scale to 0
            newScale = Math.max(newScale, 0.2);

            setScale(newScale);
            setContentHeight(contentRef.current.offsetHeight);
        };

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);
        if (contentRef.current) observer.observe(contentRef.current);

        updateScale();

        return () => observer.disconnect();
    }, [widthPx]); // Re-run if page dims change

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
        <div ref={containerRef} className="relative w-full h-full flex justify-center overflow-auto py-4 sm:py-8 print:p-0 print:block bg-gray-100/50">
            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-lg border border-gray-200 z-10 print:hidden transition-opacity hover:opacity-100 opacity-0 sm:opacity-100">
                <button
                    onClick={handleZoomOut}
                    className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
                    title="Zoom Out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                </button>
                <div className="w-px bg-gray-200 mx-0.5"></div>
                <button
                    onClick={handleFitToScreen}
                    className={`p-1.5 rounded-md text-xs font-medium tabular-nums min-w-[3rem] text-center transition-colors ${userScale === null ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}`}
                    title="Fit to Screen"
                >
                    {Math.round(effectiveScale * 100)}%
                </button>
                <div className="w-px bg-gray-200 mx-0.5"></div>
                <button
                    onClick={handleZoomIn}
                    className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
                    title="Zoom In"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                </button>
            </div>

            <div
                ref={contentRef}
                className="origin-top transition-transform duration-200 ease-out print:shadow-none print:transform-none print:m-0"
                style={{
                    // width: `${widthMm}mm`, // ResumeRenderer now handles width per page
                    // minHeight: `${heightMm}mm`,
                    transform: `scale(${effectiveScale})`,
                    marginBottom: contentHeight ? `calc(${contentHeight}px * (${effectiveScale} - 1) + 40px)` : 0,
                    marginLeft: userScale !== null && widthPx * effectiveScale > (containerRef.current?.clientWidth || 0) ? `${(widthPx * effectiveScale - (containerRef.current?.clientWidth || 0)) / 2}px` : 0
                }}
            >
                <ResumeRenderer resume={previewResume} templateDefinition={localTemplateDefinition} isEditable={isEditable} />
            </div>
        </div>
    );
};
