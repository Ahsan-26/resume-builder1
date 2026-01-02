"use client";

import React from "react";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";

export const RecipientForm = () => {
    const { currentCoverLetter, updateCoverLetter } = useCoverLetterStore();
    const recipient = currentCoverLetter?.content?.recipient || { company_name: "" };

    const handleChange = (field: string, value: string) => {
        if (!currentCoverLetter) return;
        updateCoverLetter(currentCoverLetter.id, {
            content: {
                ...currentCoverLetter.content,
                recipient: {
                    ...currentCoverLetter.content.recipient,
                    [field]: value
                }
            }
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                    type="text"
                    value={recipient.company_name || ""}
                    onChange={e => handleChange('company_name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Google"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager (Optional)</label>
                <input
                    type="text"
                    value={recipient.manager_name || ""}
                    onChange={e => handleChange('manager_name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Jane Smith"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Address / Details (Optional)</label>
                <textarea
                    value={recipient.address || ""}
                    onChange={e => handleChange('address', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none min-h-[100px]"
                    placeholder="123 Tech Lane..."
                />
            </div>
        </div>
    );
};
