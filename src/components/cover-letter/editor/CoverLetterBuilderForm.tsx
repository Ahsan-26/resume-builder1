"use client";

import React from "react";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { CoverLetterSectionType } from "./CoverLetterBuilderSidebar";
import { FileText, Sparkles } from "lucide-react";

// Sub-forms (will implement inline or separate files if complex)
import { RecipientForm } from "./forms/RecipientForm";
import { BodyForm } from "./forms/BodyForm";
import { PersonalInfoForm } from "./forms/PersonalInfoForm"; // Specific copy or adapted

interface CoverLetterBuilderFormProps {
    activeSection: CoverLetterSectionType;
}

export const CoverLetterBuilderForm: React.FC<CoverLetterBuilderFormProps> = ({ activeSection }) => {
    const { currentCoverLetter, isLoading } = useCoverLetterStore();

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
    if (!currentCoverLetter) return <div className="p-8 text-center text-red-500">No cover letter loaded.</div>;

    const renderForm = () => {
        switch (activeSection) {
            case "personal":
                return <PersonalInfoForm />;
            case "recipient":
                return <RecipientForm />;
            case "content":
                return <BodyForm />;
            case "templates":
                return <div className="p-4">Coming Soon: Template Selection</div>;
            default:
                return null;
        }
    };

    return (
        <div className="flex-1 h-full bg-[#F8FAFC] overflow-y-auto">
            <div className="max-w-3xl mx-auto p-6 md:p-10">
                {/* Form Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                            <FileText size={18} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 capitalize tracking-tight">
                            {activeSection === 'content' ? 'Letter Content' : activeSection.replace('_', ' ')}
                        </h2>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100/50 p-8 md:p-10">
                    {renderForm()}
                </div>

                {/* Footer Tip */}
                <div className="mt-8 px-6 py-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <Sparkles size={14} />
                    </div>
                    <p className="text-xs text-indigo-700 font-medium">
                        <span className="font-bold">Pro Tip:</span> Tailor your cover letter to the specific job description for better results.
                    </p>
                </div>
            </div>
        </div>
    );
};
