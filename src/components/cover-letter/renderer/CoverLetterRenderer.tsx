"use client";

import React from "react";
import { CoverLetter, CoverLetterTemplate } from "@/types/cover-letter";
import { TemplateDefinition } from "@/types/resume"; // Reuse for now if similar, or define new
import { cn } from "@/lib/utils";

// Assuming CoverLetterTemplate.data is similar to TemplateDefinition or we parse it
// For now, let's assume a simplified structure for valid rendering

interface CoverLetterRendererProps {
    coverLetter: CoverLetter;
    templateDefinition?: any; // To be typed strictly
    isEditable?: boolean;
}

export const CoverLetterRenderer: React.FC<CoverLetterRendererProps> = ({
    coverLetter,
    templateDefinition,
    isEditable = false
}) => {
    // Default styles if no template
    const styles = {
        fontFamily: templateDefinition?.style?.font_family || 'Inter, sans-serif',
        lineHeight: templateDefinition?.style?.line_height || 1.6,
        color: templateDefinition?.style?.primary_color || '#000000',
        padding: '40px', // simplified margin
    };

    const { personal_info, recipient, body, date } = coverLetter.content || {};

    return (
        <div
            className="bg-white shadow-sm w-[210mm] h-[297mm] mx-auto overflow-hidden relative"
            style={{
                fontFamily: styles.fontFamily,
                color: '#333',
            }}
        >
            <div className="p-16 h-full flex flex-col">
                {/* Header (Personal Info) */}
                <header className="mb-12 border-b pb-8">
                    <h1 className="text-4xl font-bold uppercase tracking-tight text-gray-900 mb-2" style={{ color: styles.color }}>
                        {personal_info?.full_name || "Your Name"}
                    </h1>
                    <div className="text-sm text-gray-600 space-y-1">
                        {personal_info?.job_title && <p className="font-medium text-lg text-gray-800">{personal_info.job_title}</p>}
                        <div className="flex flex-wrap gap-4 mt-4 text-xs uppercase tracking-wider text-gray-500">
                            {personal_info?.email && <span>{personal_info.email}</span>}
                            {personal_info?.phone && <span>{personal_info.phone}</span>}
                            {personal_info?.address && <span>{personal_info.address}</span>}
                        </div>
                    </div>
                </header>

                {/* Date */}
                <div className="mb-8 font-medium text-sm text-gray-500">
                    {date || new Date().toLocaleDateString()}
                </div>

                {/* Recipient */}
                <div className="mb-12 text-sm text-gray-800">
                    {recipient?.manager_name && <p className="font-bold">{recipient.manager_name}</p>}
                    {recipient?.company_name && <p className="font-medium">{recipient.company_name}</p>}
                    {recipient?.address && <p className="text-gray-600 whitespace-pre-line">{recipient.address}</p>}
                </div>

                {/* Body Content */}
                <div className="flex-1 text-sm leading-relaxed whitespace-pre-line text-gray-700">
                    {body || "Cover letter content goes here..."}
                </div>

                {/* Footer/Sign-off */}
                <div className="mt-8 pt-8 text-sm">
                    <p>Sincerely,</p>
                    <p className="mt-8 font-bold text-gray-900">{personal_info?.full_name}</p>
                </div>
            </div>
        </div>
    );
};
