"use client";

import React from "react";
import { useResumeStore } from "../../../store/useResumeStore";
import { PersonalInfo } from "../../../types/resume";

interface PersonalInfoFormProps {
    data: PersonalInfo;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data = {} as PersonalInfo }) => {
    const { updatePersonalInfo } = useResumeStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updatePersonalInfo({ [name]: value });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#00004d]">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={data.first_name || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none transition-all"
                        placeholder="e.g. John"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={data.last_name || ""}
                        onChange={handleChange}
                        
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none transition-all"
                        placeholder="e.g. Doe"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                    <input
                        type="text"
                        name="headline"
                        value={data.headline || ""}
                        onChange={handleChange}
                        
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none transition-all"
                        placeholder="e.g. Senior Software Engineer"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                    <textarea
                        name="summary"
                        value={data.summary || ""}
                        onChange={handleChange}
                        
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none transition-all resize-none"
                        placeholder="Briefly describe your professional background..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email || ""}
                        onChange={handleChange}
                        
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none transition-all"
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={data.phone || ""}
                        onChange={handleChange}
                        
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none transition-all"
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                        type="text"
                        name="city"
                        value={data.city || ""}
                        onChange={handleChange}
                        
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none transition-all"
                        placeholder="New York"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={data.country || ""}
                        onChange={handleChange}
                        
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] outline-none transition-all"
                        placeholder="USA"
                    />
                </div>
            </div>
        </div>
    );
};
