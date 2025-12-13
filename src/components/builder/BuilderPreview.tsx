"use client";

import React from "react";
import { useResumeStore } from "../../store/useResumeStore";
import { ModernTemplate } from "../templates/ModernTemplate";
import { ProfessionalTemplate } from "../templates/ProfessionalTemplate";
import { PremiumTemplate } from "../templates/PremiumTemplate";

const templates: Record<string, React.FC<{ resume: any }>> = {
    "modern": ModernTemplate,
    "classic": ProfessionalTemplate,
    "creative": PremiumTemplate,
    // Map other backend slugs to components as they are built
    "executive": ProfessionalTemplate, // Fallback
    "minimal": ModernTemplate, // Fallback
};

export const BuilderPreview: React.FC = () => {
    const { resume } = useResumeStore();

    if (!resume) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                Preview not available
            </div>
        );
    }

    // Default to ModernTemplate if slug not found or not set
    // We check resume.template?.slug. 
    // Note: Ensure your backend returns a 'slug' that matches these keys, or adjust keys.
    const TemplateComponent = (resume.template?.slug && templates[resume.template.slug])
        ? templates[resume.template.slug]
        : ModernTemplate;

    return (
        <div className="flex-1 bg-gray-200 h-full overflow-y-auto p-8 flex justify-center">
            <div className="bg-white shadow-2xl w-[210mm] min-h-[297mm] origin-top scale-[0.6] md:scale-[0.8] lg:scale-100 transition-transform">
                <TemplateComponent resume={resume} />
            </div>
        </div>
    );
};
