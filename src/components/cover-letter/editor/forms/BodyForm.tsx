"use client";

import React from "react";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";

export const BodyForm = () => {
    const { currentCoverLetter, updateCoverLetter } = useCoverLetterStore();
    const body = currentCoverLetter?.content?.body || "";

    const handleChange = (value: string) => {
        if (!currentCoverLetter) return;
        updateCoverLetter(currentCoverLetter.id, {
            content: {
                ...currentCoverLetter.content,
                body: value
            }
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter Body</label>
                <textarea
                    value={body}
                    onChange={e => handleChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none min-h-[400px] font-sans"
                    placeholder="Dear Hiring Manager,\n\nI am writing to express my interest in..."
                />
                <p className="mt-2 text-xs text-gray-500">Supports basic text for now. Rich text editor coming soon.</p>
            </div>
        </div>
    );
};
