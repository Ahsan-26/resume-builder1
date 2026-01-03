"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { PersonalInfo } from "../../../types/resume";

import { Camera, Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, User, Sparkles, Loader2 } from "lucide-react";
import { generateSummary } from "@/lib/api/ai";
import toast from "react-hot-toast";

interface PersonalInfoFormProps {
    data: PersonalInfo;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data = {} as PersonalInfo }) => {
    const { updatePersonalInfo, resume } = useResumeStore();
    const accentColor = resume?.template?.definition?.style?.accent_color || "#2563EB";
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isGeneratingSummary, setIsGeneratingSummary] = React.useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updatePersonalInfo({ [name]: value });
    };

    const calculateExperienceYears = () => {
        if (!resume?.work_experiences?.length) return 0;
        // Simple calculation: sum of durations? Or difference between oldest start and newest end?
        // Let's take earliest start date and now (or latest end date).
        const dates = resume.work_experiences.flatMap(exp => [
            exp.start_date ? new Date(exp.start_date).getTime() : Date.now(),
            exp.end_date ? new Date(exp.end_date).getTime() : (exp.is_current ? Date.now() : 0)
        ]).filter(d => d > 0);

        if (dates.length === 0) return 0;
        const minDate = Math.min(...dates);
        const maxDate = Math.max(...dates);
        const years = (maxDate - minDate) / (1000 * 60 * 60 * 24 * 365);
        return Math.max(0, Math.round(years * 10) / 10); // Round to 1 decimal
    };

    const handleGenerateSummary = async () => {
        if (!data.headline) {
            toast.error("Please enter your Professional Headline first.");
            return;
        }

        setIsGeneratingSummary(true);
        try {
            const expYears = calculateExperienceYears();
            const result = await generateSummary({
                current_role: data.headline,
                target_role: data.headline, // Assuming target is same as current for now
                experience_years: Math.max(1, Math.round(expYears)), // API expects int min 0
                tone: 'professional'
            });

            updatePersonalInfo({ summary: result.summary });
            toast.success("Summary generated!");
        } catch (e: any) {
            console.error(e);
            toast.error(e.message || "Failed to generate summary");
        } finally {
            setIsGeneratingSummary(false);
        }
    };

    const inputClasses = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400";
    const labelClasses = "block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1";

    return (
        <div className="space-y-10">
            {/* Profile Picture Section */}
            <div className="flex items-center gap-8">
                <div className="relative group">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center">
                        {data.photo_url ? (
                            <img src={data.photo_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User size={40} className="text-gray-300" />
                        )}
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-100 text-blue-600 hover:scale-110 transition-transform">
                        <Camera size={16} />
                    </button>
                </div>
                <div className="space-y-2">
                    <h4 className="text-lg font-black text-gray-900">Profile Picture</h4>
                    <p className="text-xs text-gray-500 font-medium">Upload a professional photo to make your resume stand out.</p>
                    <button className="text-xs font-bold text-blue-600 hover:underline">Remove photo</button>
                </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                <div className="space-y-1.5">
                    <label className={labelClasses}>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={data.first_name || ""}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="e.g. Ahsan"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={data.last_name || ""}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="e.g. Habib"
                    />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                    <label className={labelClasses}>Professional Headline</label>
                    <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="headline"
                            value={data.headline || ""}
                            onChange={handleChange}
                            className={`${inputClasses} pl-12`}
                            placeholder="e.g. Senior Full Stack Developer"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="email"
                            name="email"
                            value={data.email || ""}
                            onChange={handleChange}
                            className={`${inputClasses} pl-12`}
                            placeholder="ahsan@example.com"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="tel"
                            name="phone"
                            value={data.phone || ""}
                            onChange={handleChange}
                            className={`${inputClasses} pl-12`}
                            placeholder="+1 234 567 890"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>City</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="city"
                            value={data.city || ""}
                            onChange={handleChange}
                            className={`${inputClasses} pl-12`}
                            placeholder="New York"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className={labelClasses}>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={data.country || ""}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="USA"
                    />
                </div>

                {/* Social Links */}
                <div className="md:col-span-2 pt-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Social & Professional Links</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className={labelClasses}>Website / Portfolio</label>
                            <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="website"
                                    value={data.website || ""}
                                    onChange={handleChange}
                                    className={`${inputClasses} pl-12`}
                                    placeholder="https://ahsan.dev"
                                />
                            </div>
                            {errors.website && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">{errors.website}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className={labelClasses}>LinkedIn</label>
                            <div className="relative">
                                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="linkedin_url"
                                    value={data.linkedin_url || ""}
                                    onChange={handleChange}
                                    className={`${inputClasses} pl-12`}
                                    placeholder="https://linkedin.com/in/ahsan"
                                />
                            </div>
                            {errors.linkedin_url && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">{errors.linkedin_url}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className={labelClasses}>GitHub</label>
                            <div className="relative">
                                <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="github_url"
                                    value={data.github_url || ""}
                                    onChange={handleChange}
                                    className={`${inputClasses} pl-12`}
                                    placeholder="https://github.com/ahsan"
                                />
                            </div>
                            {errors.github_url && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">{errors.github_url}</p>}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-1.5 pt-4">
                    <div className="flex justify-between items-center">
                        <label className={labelClasses}>Professional Summary</label>
                        <button
                            onClick={handleGenerateSummary}
                            disabled={isGeneratingSummary}
                            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isGeneratingSummary ? (
                                <Loader2 className="animate-spin" size={12} />
                            ) : (
                                <Sparkles size={12} />
                            )}
                            Generate with AI
                        </button>
                    </div>
                    <textarea
                        name="summary"
                        value={data.summary || ""}
                        onChange={handleChange}
                        rows={5}
                        className={`${inputClasses} resize-none leading-relaxed`}
                        placeholder="Write a compelling summary of your professional background and key achievements..."
                    />
                </div>
            </div>
        </div>
    );
};
