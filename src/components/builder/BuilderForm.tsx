"use client";

import React from "react";
import { FileText, Sparkles } from "lucide-react";
import { SectionType } from "./BuilderSidebar";
import { useResumeStore } from "../../store/useResumeStore";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { EducationForm } from "./forms/EducationForm";
import { SkillsForm } from "./forms/SkillsForm";
import { StrengthsForm } from "./forms/StrengthsForm";
import { HobbiesForm } from "./forms/HobbiesForm";
import { CustomSectionForm } from "./forms/CustomSectionForm";

import { TemplatesForm } from "./forms/TemplatesForm";

interface BuilderFormProps {
    activeSection: SectionType;
}

export const BuilderForm: React.FC<BuilderFormProps> = ({ activeSection }) => {
    const { resume, isLoading } = useResumeStore();

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading resume data...</div>;
    }

    if (!resume) {
        return <div className="p-8 text-center text-red-500">Failed to load resume.</div>;
    }

    return (
        <div className="flex-1 h-full bg-[#F8FAFC] overflow-y-auto">
            <div className="max-w-3xl mx-auto p-6 md:p-10">
                {/* Form Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <FileText size={18} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 capitalize tracking-tight">
                            {activeSection.replace('_', ' ')}
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500 font-medium ml-11">
                        {activeSection === 'personal' ? 'Tell us about yourself and how to reach you.' :
                            activeSection === 'experience' ? 'Showcase your professional journey and achievements.' :
                                activeSection === 'education' ? 'Detail your academic background and certifications.' :
                                    'Fill in the details below to complete this section.'}
                    </p>
                </div>

                {/* Form Content Card */}
                <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100/50 p-8 md:p-10">
                    <div className="space-y-10">
                        {activeSection === "templates" && <TemplatesForm />}
                        {activeSection === "personal" && <PersonalInfoForm data={resume.personal_info || {}} />}
                        {activeSection === "experience" && <ExperienceForm items={resume.work_experiences || []} />}
                        {activeSection === "education" && <EducationForm items={resume.educations || []} />}
                        {activeSection === "skills" && <SkillsForm categories={resume.skill_categories || []} />}
                        {activeSection === "strengths" && <StrengthsForm items={resume.strengths || []} />}
                        {activeSection === "hobbies" && <HobbiesForm items={resume.hobbies || []} />}
                        {activeSection === "custom" && <CustomSectionForm sections={resume.custom_sections || []} />}
                    </div>
                </div>

                {/* Footer Tip */}
                <div className="mt-8 px-6 py-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Sparkles size={14} />
                    </div>
                    <p className="text-xs text-blue-700 font-medium">
                        <span className="font-bold">Pro Tip:</span> Use action verbs to describe your responsibilities for better impact.
                    </p>
                </div>
            </div>
        </div>
    );
};
