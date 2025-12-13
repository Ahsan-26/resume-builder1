import React from "react";
import { Resume } from "../../types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface TemplateProps {
    resume: Resume;
}

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ resume }) => {
    const personal_info = resume?.personal_info || {};
    const work_experiences = resume?.work_experiences || [];
    const educations = resume?.educations || [];
    const skill_categories = resume?.skill_categories || [];

    return (
        <div className="p-10 font-serif text-gray-800 h-full bg-white">
            {/* Header */}
            <header className="text-center border-b-2 border-gray-300 pb-6 mb-6">
                <h1 className="text-3xl font-bold mb-2 text-blue-900">
                    {personal_info.first_name} {personal_info.last_name}
                </h1>
                <p className="text-lg text-gray-600 mb-4">{personal_info.headline}</p>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {personal_info.email && (
                        <span>{personal_info.email}</span>
                    )}
                    {personal_info.phone && (
                        <span>• {personal_info.phone}</span>
                    )}
                    {personal_info.city && (
                        <span>• {personal_info.city}, {personal_info.country}</span>
                    )}
                </div>
            </header>

            <div className="space-y-6">
                {/* Summary */}
                {personal_info.summary && (
                    <section>
                        <h2 className="text-lg font-bold text-blue-900 uppercase tracking-wide mb-2">
                            Professional Summary
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-700">
                            {personal_info.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {work_experiences.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-blue-900 uppercase tracking-wide mb-4">
                            Work Experience
                        </h2>
                        <div className="space-y-6">
                            {work_experiences.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900">{exp.position_title}</h3>
                                        <span className="text-sm text-gray-500 italic">
                                            {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-700 mb-2">
                                        {exp.company_name} | {exp.city}
                                    </div>
                                    <p className="text-sm text-gray-600 whitespace-pre-line">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {educations.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-blue-900 uppercase tracking-wide mb-4">
                            Education
                        </h2>
                        <div className="space-y-4">
                            {educations.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900">{edu.school_name}</h3>
                                        <span className="text-sm text-gray-500 italic">
                                            {edu.start_date} - {edu.is_current ? "Present" : edu.end_date}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-700">
                                        {edu.degree} {edu.field_of_study ? `in ${edu.field_of_study}` : ""}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skill_categories.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-blue-900 uppercase tracking-wide mb-4">
                            Skills
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {skill_categories.map((cat) => (
                                <div key={cat.id}>
                                    <h3 className="text-sm font-bold text-gray-700 mb-1">{cat.name}</h3>
                                    <div className="text-sm text-gray-600">
                                        {cat.items.map((item) => item.name).join(", ")}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Strengths */}
                {resume.strengths && resume.strengths.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-blue-900 uppercase tracking-wide mb-4">
                            Strengths
                        </h2>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                            {resume.strengths.map((item) => item.label).join(" • ")}
                        </div>
                    </section>
                )}

                {/* Hobbies */}
                {resume.hobbies && resume.hobbies.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-blue-900 uppercase tracking-wide mb-4">
                            Hobbies
                        </h2>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                            {resume.hobbies.map((item) => item.label).join(" • ")}
                        </div>
                    </section>
                )}

                {/* Custom Sections */}
                {resume.custom_sections && resume.custom_sections.map((section) => (
                    <section key={section.id}>
                        <h2 className="text-lg font-bold text-blue-900 uppercase tracking-wide mb-4">
                            {section.title}
                        </h2>
                        <div className="space-y-4">
                            {section.items.map((item) => (
                                <div key={item.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900">{item.title}</h3>
                                        <span className="text-sm text-gray-500 italic">
                                            {item.meta}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-700 mb-1">
                                        {item.subtitle}
                                    </div>
                                    <p className="text-sm text-gray-600 whitespace-pre-line">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};
