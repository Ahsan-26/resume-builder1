"use client";

import React, { useEffect, useState, useRef } from "react";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { CoverLetterRenderer } from "../renderer/CoverLetterRenderer";
import { Loader2 } from "lucide-react";

interface CoverLetterPreviewProps {
    isEditable?: boolean;
}

export const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ isEditable = false }) => {
    const { currentCoverLetter, isLoading } = useCoverLetterStore();

    // Zoom/Scale logic adaptation
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [userScale, setUserScale] = useState<number | null>(null);

    const handleZoomIn = () => setUserScale(prev => Math.min((prev || scale) + 0.1, 2.0));
    const handleZoomOut = () => setUserScale(prev => Math.max((prev || scale) - 0.1, 0.2));
    const handleFitToScreen = () => setUserScale(null);

    // Initial Auto-scale
    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.clientWidth;
            // Standard A4 width in pixels approx 794px at 96DPI, but often rendered at larger base.
            // Our renderer is 210mm (~794px).
            const pageBaseWidth = 794;
            let newScale = (containerWidth - 48) / pageBaseWidth;
            newScale = Math.min(newScale, 1.2);
            newScale = Math.max(newScale, 0.3);
            setScale(newScale);
        };

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);
        updateScale();
        return () => observer.disconnect();
    }, []);

    // Template Fetching Logic
    const [templateDefinition, setTemplateDefinition] = useState<any>(null); // Replace any with TemplateDefinition

    useEffect(() => {
        if (currentCoverLetter?.template_id) {
            import('@/lib/api/templates').then(({ fetchTemplate }) => {
                fetchTemplate(currentCoverLetter.template_id)
                    .then(template => setTemplateDefinition(template.definition))
                    .catch(err => console.error("Failed to load template", err));
            });
        }
    }, [currentCoverLetter?.template_id]);

    const effectiveScale = userScale !== null ? userScale : scale;

    if (isLoading) return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;
    if (!currentCoverLetter) return <div className="flex h-full items-center justify-center text-gray-400">No cover letter loaded</div>;

    return (
        <div ref={containerRef} className="relative w-full h-full flex justify-center overflow-auto py-8 bg-gray-100/50">
            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-lg border border-gray-200 z-10 print:hidden transition-opacity hover:opacity-100 opacity-0 sm:opacity-100">
                <button onClick={handleZoomOut} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600"> - </button>
                <button onClick={handleFitToScreen} className="px-2 text-xs font-medium text-gray-600">{Math.round(effectiveScale * 100)}%</button>
                <button onClick={handleZoomIn} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600"> + </button>
            </div>

            <div
                ref={contentRef}
                className="origin-top transition-transform duration-200 ease-out shadow-xl"
                style={{
                    transform: `scale(${effectiveScale})`,
                }}
            >
                <CoverLetterRenderer
                    coverLetter={currentCoverLetter}
                    templateDefinition={templateDefinition}
                    isEditable={isEditable}
                />
            </div>
        </div>
    );
};
