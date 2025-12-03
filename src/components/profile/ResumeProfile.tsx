"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";

export default function ResumeProfile() {
    const t = useTranslations("profile");
    const [showPicture, setShowPicture] = useState(true);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-bold text-[var(--color-brand-primary)] mb-6 heading-font">
                {t("resumeProfile")}
            </h2>

            {/* Profile Picture Section */}
            <div className="mb-8 flex items-start gap-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                        {profileImage ? (
                            <Image
                                src={profileImage}
                                alt="Profile"
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-gradient)] text-white text-3xl font-bold">
                                A
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1">
                    <label className="flex items-center gap-2 mb-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={showPicture}
                            onChange={(e) => setShowPicture(e.target.checked)}
                            className="w-4 h-4 text-[var(--color-brand-primary)] border-gray-300 rounded focus:ring-[var(--color-brand-primary)] cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-[var(--color-brand-primary)] transition-colors">
                            {t("showPicture")}
                        </span>
                    </label>

                    <label className="inline-block">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <span className="px-4 py-2 bg-[var(--color-brand-primary)] text-white rounded-lg hover:bg-[var(--color-brand-hover)] transition-all duration-300 cursor-pointer inline-block text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            {profileImage ? t("changePhoto") : t("uploadPhoto")}
                        </span>
                    </label>
                </div>
            </div>

            {/* Personal Information Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("firstName")}
                    </label>
                    <input
                        type="text"
                        placeholder="Ahsan"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("lastName")}
                    </label>
                    <input
                        type="text"
                        placeholder="Habib"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("title")}
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("titleAfter")}
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("phoneNumber")}
                    </label>
                    <input
                        type="tel"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("emailAddress")}
                    </label>
                    <input
                        type="email"
                        placeholder="ahsan7habib@gmail.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("birthDate")}
                    </label>
                    <input
                        type="date"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("nationality")}
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("streetNumber")}
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("city")}
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("postalCode")}
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("country")}
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none bg-white">
                        <option value="">{t("selectIndustry")}</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                        <option value="bd">Bangladesh</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
