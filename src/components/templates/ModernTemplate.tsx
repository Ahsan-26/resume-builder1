import React from "react";
import { Resume } from "../../types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from "lucide-react";

interface TemplateProps {
    resume: Resume;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
    const personal_info = resume?.personal_info || {};
    const work_experiences = resume?.work_experiences || [];
    const educations = resume?.educations || [];
    const skill_categories = resume?.skill_categories || [];

    // Theme configuration (could be dynamic in the future)
    const theme = {
        primary: "#2563eb", // Blue-600
        text: "#1f2937", // Gray-800
        secondaryText: "#6b7280", // Gray-500
        bgSidebar: "#f3f4f6", // Gray-100
    };

    return (
        <div className="w-full h-full bg-white flex text-sm font-sans leading-relaxed">
            {/* Left Sidebar */}
            <aside className="w-[32%] bg-gray-50 p-8 flex flex-col gap-8 border-r border-gray-100">
                {/* Contact Info */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-200 pb-2">
                        Contact
                    </h3>
                    <div className="flex flex-col gap-3 text-gray-600">
                        {personal_info.email && (
                            <div className="flex items-center gap-2 break-all">
                                <Mail size={14} className="shrink-0 text-blue-600" />
                                <span>{personal_info.email}</span>
                            </div>
                        )}
                        {personal_info.phone && (
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="shrink-0 text-blue-600" />
                                <span>{personal_info.phone}</span>
                            </div>
                        )}
                        {personal_info.city && (
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="shrink-0 text-blue-600" />
                                <span>{personal_info.city}, {personal_info.country}</span>
                            </div>
                        )}
                        {personal_info.website && (
                            <div className="flex items-center gap-2 break-all">
                                <Globe size={14} className="shrink-0 text-blue-600" />
                                <span>{personal_info.website}</span>
                            </div>
                        )}
                        {personal_info.linkedin_url && (
                            <div className="flex items-center gap-2 break-all">
                                <Linkedin size={14} className="shrink-0 text-blue-600" />
                                <span>LinkedIn</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Education */}
                {educations.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-200 pb-2">
                            Education
                        </h3>
                        <div className="flex flex-col gap-4">
                            {educations.map((edu) => (
                                <div key={edu.id}>
                                    <div className="font-bold text-gray-800">{edu.school_name}</div>
                                    <div className="text-blue-600 font-medium">{edu.degree}</div>
                                    {edu.field_of_study && <div className="text-gray-500 italic">{edu.field_of_study}</div>}
                                    <div className="text-xs text-gray-400 mt-1">
                                        {edu.start_date} - {edu.is_current ? "Present" : edu.end_date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skill_categories.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-200 pb-2">
                            Skills
                        </h3>
                        <div className="flex flex-col gap-4">
                            {skill_categories.map((cat) => (
                                <div key={cat.id}>
                                    <div className="font-semibold text-gray-700 mb-2 text-xs uppercase">{cat.name}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.items.map((item) => (
                                            <span
                                                key={item.id}
                                                className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600 font-medium shadow-sm"
                                            >
                                                {item.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Strengthsss */}
                {resume.strengths && resume.strengths.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-200 pb-2">
                            Strengths
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {resume.strengths.map((item) => (
                                <span
                                    key={item.id}
                                    className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600 font-medium shadow-sm"
                                >
                                    {item.label}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Hobbies */}
                {resume.hobbies && resume.hobbies.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-200 pb-2">
                            Hobbies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {resume.hobbies.map((item) => (
                                <span
                                    key={item.id}
                                    className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600 font-medium shadow-sm"
                                >
                                    {item.label}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 flex flex-col gap-8">
                {/* Header */}
                <header>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                        {personal_info.first_name} <span className="text-blue-600">{personal_info.last_name}</span>
                    </h1>
                    <p className="text-xl text-gray-500 font-medium">{personal_info.headline}</p>
                </header>

                {/* Summary */}
                {personal_info.summary && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b-2 border-blue-600 pb-2 mb-4 inline-block">
                            Profile
                        </h2>
                        <p className="text-gray-600 leading-7">
                            {personal_info.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {work_experiences.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b-2 border-blue-600 pb-2 mb-6 inline-block">
                            Experience
                        </h2>
                        <div className="flex flex-col gap-8">
                            {work_experiences.map((exp) => (
                                <div key={exp.id} className="relative pl-4 border-l-2 border-gray-100">
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-600 ring-4 ring-white"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-bold text-gray-800">{exp.position_title}</h3>
                                        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                            {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}
                                        </span>
                                    </div>
                                    <div className="text-blue-600 font-medium mb-2">
                                        {exp.company_name} <span className="text-gray-300">|</span> {exp.city}
                                    </div>
                                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Sections */}
                {resume.custom_sections && resume.custom_sections.map((section) => (
                    <section key={section.id}>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b-2 border-blue-600 pb-2 mb-6 inline-block">
                            {section.title}
                        </h2>
                        <div className="flex flex-col gap-8">
                            {section.items.map((item) => (
                                <div key={item.id} className="relative pl-4 border-l-2 border-gray-100">
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-600 ring-4 ring-white"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                                        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                            {item.meta}
                                        </span>
                                    </div>
                                    <div className="text-blue-600 font-medium mb-2">
                                        {item.subtitle}
                                    </div>
                                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
};
