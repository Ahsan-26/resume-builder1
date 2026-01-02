"use client";

import React from "react";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";

export const PersonalInfoForm = () => {
    const { currentCoverLetter, updateCoverLetter } = useCoverLetterStore();
    const info = currentCoverLetter?.content?.personal_info || { full_name: "", email: "" };

    const handleChange = (field: string, value: string) => {
        if (!currentCoverLetter) return;
        updateCoverLetter(currentCoverLetter.id, {
            content: {
                ...currentCoverLetter.content,
                personal_info: {
                    ...currentCoverLetter.content.personal_info,
                    [field]: value
                }
            }
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                    type="text"
                    value={info.full_name || ""}
                    onChange={e => handleChange('full_name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. John Doe"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    value={info.email || ""}
                    onChange={e => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. john@example.com"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                    type="tel"
                    value={info.phone || ""}
                    onChange={e => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. +1 555 0123"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                    type="text"
                    value={info.address || ""}
                    onChange={e => handleChange('address', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    placeholder="City, Country"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                    type="text"
                    value={info.job_title || ""}
                    onChange={e => handleChange('job_title', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Software Engineer"
                />
            </div>
        </div>
    );
};
