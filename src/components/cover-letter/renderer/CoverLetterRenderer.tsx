"use client";

import React from "react";
import { CoverLetter } from "@/types/cover-letter";
import { Resume } from "@/types/resume";

interface CoverLetterRendererProps {
    coverLetter: CoverLetter;
    templateDefinition?: any;
    linkedResume?: Resume | null;
    isEditable?: boolean;
}

export const CoverLetterRenderer: React.FC<CoverLetterRendererProps> = ({
    coverLetter,
    templateDefinition,
    linkedResume,
    isEditable = false
}) => {
    // Default styles if no template
    const styleData = templateDefinition?.style || {};
    const styles = {
        fontFamily: styleData.font_family || 'Inter, sans-serif',
        lineHeight: styleData.line_height || 1.6,
        primaryColor: styleData.primary_color || '#000000',
        accentColor: styleData.accent_color || '#4f46e5',
        fontSize: styleData.font_size || '11pt',
        bodyScale: styleData.body_scale || 1,
        headingScale: styleData.heading_scale || 1.5,
    };

    const personalInfo = linkedResume?.personal_info;

    return (
        <div
            className="bg-white shadow-sm w-[210mm] h-[297mm] mx-auto overflow-hidden relative"
            style={{
                fontFamily: styles.fontFamily,
                fontSize: styles.fontSize,
                lineHeight: styles.lineHeight,
                color: '#333',
            }}
        >
            <div className="p-16 h-full flex flex-col">
                {/* Header (Personal Info from Linked Resume) */}
                <header className="mb-12 border-b pb-8">
                    <h1 className="text-4xl font-bold uppercase tracking-tight mb-2" style={{ color: styles.primaryColor }}>
                        {personalInfo ? `${personalInfo.first_name} ${personalInfo.last_name}` : "Your Name"}
                    </h1>
                    <div className="text-sm text-gray-600 space-y-1">
                        {personalInfo?.headline && <p className="font-medium text-lg text-gray-800">{personalInfo.headline}</p>}
                        <div className="flex flex-wrap gap-4 mt-4 text-xs uppercase tracking-wider text-gray-500">
                            {personalInfo?.email && <span>{personalInfo.email}</span>}
                            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                            {personalInfo?.city && <span>{personalInfo.city}{personalInfo.country ? `, ${personalInfo.country}` : ""}</span>}
                        </div>
                    </div>
                </header>

                {/* Date */}
                <div className="mb-8 font-medium text-sm text-gray-500">
                    {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>

                {/* Recipient */}
                <div className="mb-12 text-sm text-gray-800">
                    <p className="font-bold">{coverLetter.company_name || "(Recipient Company)"}</p>
                    {coverLetter.job_title && <p className="font-medium">Re: {coverLetter.job_title}</p>}
                </div>

                {/* Body Content */}
                <div className="flex-1 text-sm leading-relaxed whitespace-pre-line text-gray-700 font-sans">
                    {coverLetter.body || "Start writing your cover letter here..."}
                </div>

                {/* Footer/Sign-off */}
                <div className="mt-8 pt-8 text-sm">
                    <p>Sincerely,</p>
                    <p className="mt-8 font-bold text-gray-900">
                        {personalInfo ? `${personalInfo.first_name} ${personalInfo.last_name}` : "Your Name"}
                    </p>
                </div>
            </div>
        </div>
    );
};
