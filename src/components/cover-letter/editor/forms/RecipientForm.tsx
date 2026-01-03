"use client";

import React from "react";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";

export const RecipientForm = () => {
    const { currentCoverLetter, updateCoverLetter } = useCoverLetterStore();

    if (!currentCoverLetter) return null;

    const handleChange = (field: string, value: string) => {
        updateCoverLetter(currentCoverLetter.id, {
            [field]: value
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                    type="text"
                    value={currentCoverLetter.company_name || ""}
                    onChange={e => handleChange('company_name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Google"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title / Target Role</label>
                <input
                    type="text"
                    value={currentCoverLetter.job_title || ""}
                    onChange={e => handleChange('job_title', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Senior Software Engineer"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description (For AI Context)</label>
                <textarea
                    value={currentCoverLetter.job_description || ""}
                    onChange={e => handleChange('job_description', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none min-h-[150px]"
                    placeholder="Paste the job description here..."
                />
            </div>
        </div>
    );
};
