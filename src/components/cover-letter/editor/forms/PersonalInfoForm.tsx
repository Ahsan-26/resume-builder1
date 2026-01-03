"use client";

import React, { useEffect, useState } from "react";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { fetchResumes } from "@/lib/api/resumes";
import { Resume } from "@/types/resume";
import { Loader2, Link as LinkIcon } from "lucide-react";

export const PersonalInfoForm = () => {
    const { currentCoverLetter, updateCoverLetter } = useCoverLetterStore();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadResumes = async () => {
            setIsLoading(true);
            try {
                const data = await fetchResumes();
                setResumes(data);
            } catch (err) {
                console.error("Failed to fetch resumes", err);
            } finally {
                setIsLoading(false);
            }
        };
        loadResumes();
    }, []);

    const selectedResume = resumes.find(r => r.id === currentCoverLetter?.linked_resume);
    const personalInfo = selectedResume?.personal_info;

    const handleResumeChange = (resumeId: string) => {
        if (!currentCoverLetter) return;
        updateCoverLetter(currentCoverLetter.id, {
            linked_resume: resumeId || undefined
        });
    };

    if (!currentCoverLetter) return null;

    return (
        <div className="space-y-8">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg">
                        <LinkIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Linked Resume</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Personal info is synced from your selected resume</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading resumes...
                    </div>
                ) : (
                    <select
                        value={currentCoverLetter.linked_resume || ""}
                        onChange={(e) => handleResumeChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-white dark:bg-gray-800"
                    >
                        <option value="">Select a resume to sync info...</option>
                        {resumes.map(resume => (
                            <option key={resume.id} value={resume.id}>
                                {resume.title}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {personalInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div className="md:col-span-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Preview of Personal Information</p>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                        <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 text-gray-900 dark:text-white">
                            {personalInfo.first_name} {personalInfo.last_name}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                        <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 text-gray-900 dark:text-white">
                            {personalInfo.email}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                        <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 text-gray-900 dark:text-white">
                            {personalInfo.phone || "Not set"}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">City, Country</label>
                        <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 text-gray-900 dark:text-white">
                            {personalInfo.city}{personalInfo.country ? `, ${personalInfo.country}` : ""}
                        </div>
                    </div>
                    <div className="md:col-span-2 mt-2">
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                            To edit these details, please update the linked resume in the Resume Builder.
                        </p>
                    </div>
                </div>
            ) : currentCoverLetter.linked_resume ? (
                <div className="text-center py-8 text-gray-500">
                    No personal info found in the linked resume.
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500">Select a resume to display your personal information on the cover letter.</p>
                </div>
            )}
        </div>
    );
};
