"use client";

import React from "react";
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

        <div className="flex-1 h-full overflow-y-auto bg-gray-50 md:bg-white p-4 md:p-0">
            <div className="max-w-none mx-auto bg-white md:bg-transparent rounded-xl shadow-sm md:shadow-none border border-gray-200 md:border-none p-4 md:p-6">
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
    );
};
