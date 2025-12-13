import React from "react";
import { Resume } from "../../types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from "lucide-react";

interface TemplateProps {
    resume: Resume;
}

export const PremiumTemplate: React.FC<TemplateProps> = ({ resume }) => {
    const personal_info = resume?.personal_info || {};
    const work_experiences = resume?.work_experiences || [];
    const educations = resume?.educations || [];
    const skill_categories = resume?.skill_categories || [];

    return (
        <div className="w-full h-full bg-white flex text-sm font-sans text-gray-800">
            {/* Left Sidebar */}
            <aside className="w-[35%] bg-slate-900 text-white p-8 flex flex-col gap-8">
                {/* Photo (Placeholder if needed, but user didn't ask for photo upload yet) */}
                {/* <div className="w-24 h-24 rounded-full bg-slate-700 mx-auto mb-4"></div> */}

                {/* Contact Info */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700 pb-2">
                        Contact
                    </h3>
                    <div className="flex flex-col gap-3 text-slate-300 text-xs">
                        {personal_info.email && (
                            <div className="flex items-center gap-2 break-all">
                                <Mail size={14} className="shrink-0 text-teal-400" />
                                <span>{personal_info.email}</span>
                            </div>
                        )}
                        {personal_info.phone && (
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="shrink-0 text-teal-400" />
                                <span>{personal_info.phone}</span>
                            </div>
                        )}
                        {personal_info.city && (
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="shrink-0 text-teal-400" />
                                <span>{personal_info.city}, {personal_info.country}</span>
                            </div>
                        )}
                        {personal_info.website && (
                            <div className="flex items-center gap-2 break-all">
                                <Globe size={14} className="shrink-0 text-teal-400" />
                                <span>{personal_info.website}</span>
                            </div>
                        )}
                        {personal_info.linkedin_url && (
                            <div className="flex items-center gap-2 break-all">
                                <Linkedin size={14} className="shrink-0 text-teal-400" />
                                <span>LinkedIn</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills */}
                {skill_categories.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700 pb-2">
                            Skills
                        </h3>
                        <div className="flex flex-col gap-4">
                            {skill_categories.map((cat) => (
                                <div key={cat.id}>
                                    <div className="font-semibold text-teal-400 mb-2 text-xs uppercase">{cat.name}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.items.map((item) => (
                                            <span
                                                key={item.id}
                                                className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300"
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

                {/* Strengths */}
                {resume.strengths && resume.strengths.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700 pb-2">
                            Strengths
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {resume.strengths.map((item) => (
                                <span
                                    key={item.id}
                                    className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300"
                                >
                                    {item.label}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Hobbies */}
                {resume.hobbies && resume.hobbies.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700 pb-2">
                            Hobbies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {resume.hobbies.map((item) => (
                                <span
                                    key={item.id}
                                    className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300"
                                >
                                    {item.label}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education (Sidebar style) */}
                {educations.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700 pb-2">
                            Education
                        </h3>
                        <div className="flex flex-col gap-4">
                            {educations.map((edu) => (
                                <div key={edu.id}>
                                    <div className="font-bold text-white">{edu.school_name}</div>
                                    <div className="text-teal-400 text-xs">{edu.degree}</div>
                                    <div className="text-xs text-slate-500 mt-1">
                                        {edu.start_date} - {edu.is_current ? "Present" : edu.end_date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 flex flex-col gap-8">
                {/* Header */}
                <header className="border-b-2 border-gray-100 pb-8">
                    <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-2 uppercase">
                        {personal_info.first_name} <span className="text-teal-600">{personal_info.last_name}</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-light tracking-wide">{personal_info.headline}</p>
                </header>

                {/* Summary */}
                {personal_info.summary && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                            <span className="w-8 h-1 bg-teal-600 inline-block"></span>
                            Profile
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-justify">
                            {personal_info.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {work_experiences.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-teal-600 inline-block"></span>
                            Experience
                        </h2>
                        <div className="flex flex-col gap-8">
                            {work_experiences.map((exp) => (
                                <div key={exp.id} className="group">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                                            {exp.position_title}
                                        </h3>
                                        <span className="text-xs font-medium text-slate-400">
                                            {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold text-slate-500 mb-3">
                                        {exp.company_name} • {exp.city}
                                    </div>
                                    <p className="text-slate-600 whitespace-pre-line leading-relaxed">
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
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-teal-600 inline-block"></span>
                            {section.title}
                        </h2>
                        <div className="flex flex-col gap-8">
                            {section.items.map((item) => (
                                <div key={item.id} className="group">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                                            {item.title}
                                        </h3>
                                        <span className="text-xs font-medium text-slate-400">
                                            {item.meta}
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold text-slate-500 mb-3">
                                        {item.subtitle}
                                    </div>
                                    <p className="text-slate-600 whitespace-pre-line leading-relaxed">
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
