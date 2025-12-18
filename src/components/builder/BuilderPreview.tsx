"use client";

import React, { useEffect, useState } from "react";
import { useResumeStore } from "../../store/useResumeStore";
import { ResumeRenderer } from "./ResumeRenderer";
import { TemplateDefinition } from "@/types/resume";
import { fetchTemplate } from "@/lib/api/templates";
import { Loader2 } from "lucide-react";

export const BuilderPreview: React.FC = () => {
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

    // Sample data to populate the preview if fields are empty
    const sampleResume = {
        personal_info: {
            first_name: "John",
            last_name: "Doe",
            headline: "Senior Software Engineer",
            summary: "Experienced professional with a strong background in project management and software development. Proven track record of delivering high-quality results on time and within budget.",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            city: "New York",
            country: "USA",
            website: "www.johndoe.com",
            linkedin_url: "linkedin.com/in/johndoe",
            github_url: "github.com/johndoe",
            portfolio_url: "",
            photo_url: ""
        },
        work_experiences: [
            {
                id: "1",
                company_name: "Tech Solutions Inc.",
                position_title: "Senior Developer",
                city: "New York",
                country: "USA",
                start_date: "2020-01",
                end_date: "",
                is_current: true,
                description: "Led a team of 5 developers to build a scalable e-commerce platform. Improved system performance by 40%.",
                bullets: "<ul><li>Led team of 5</li><li>Improved performance by 40%</li></ul>",
                order: 1
            },
            {
                id: "2",
                company_name: "WebCorp",
                position_title: "Junior Developer",
                city: "San Francisco",
                country: "USA",
                start_date: "2018-06",
                end_date: "2019-12",
                is_current: false,
                description: "Collaborated with cross-functional teams to design and launch user-friendly web applications.",
                bullets: "<ul><li>Collaborated with teams</li><li>Launched web apps</li></ul>",
                order: 2
            }
        ],
        educations: [
            {
                id: "1",
                school_name: "University of Technology",
                degree: "Bachelor of Science",
                field_of_study: "Computer Science",
                city: "San Francisco",
                country: "USA",
                start_date: "2014-09",
                end_date: "2018-05",
                is_current: false,
                description: "Graduated with Honors.",
                order: 1
            }
        ],
        skill_categories: [
            {
                id: "cat1",
                name: "Technical Skills",
                order: 1,
                items: [
                    { id: "1", name: "JavaScript", level: "expert", order: 1 },
                    { id: "2", name: "React", level: "expert", order: 2 },
                    { id: "3", name: "Node.js", level: "intermediate", order: 3 }
                ]
            }
        ]
    };

    // Merge actual resume with sample data for preview purposes
    // We only use sample data if the specific section in actual resume is empty/undefined
    const previewResume = {
        ...resume,
        personal_info: {
            ...sampleResume.personal_info,
            ...(resume.personal_info || {})
        },
        work_experiences: (resume.work_experiences && resume.work_experiences.length > 0) ? resume.work_experiences : sampleResume.work_experiences,
        educations: (resume.educations && resume.educations.length > 0) ? resume.educations : sampleResume.educations,
        skill_categories: (resume.skill_categories && resume.skill_categories.length > 0) ? resume.skill_categories : sampleResume.skill_categories,
    };

    return (
        <div className="flex justify-center w-full h-full">
            <div className="bg-white shadow-2xl w-[210mm] min-h-[297mm] origin-top scale-[0.5] md:scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform duration-300 ease-in-out">
                <ResumeRenderer resume={previewResume} templateDefinition={localTemplateDefinition} />
            </div>
        </div>
    );
};
