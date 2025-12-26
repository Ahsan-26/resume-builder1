"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { uploadProfilePhoto } from "@/lib/api/profile";
import type { UserProfile } from "@/types/profile";

interface ResumeProfileProps {
    profile: UserProfile | null;
    onChange: (profile: UserProfile) => void;
}

export default function ResumeProfile({ profile, onChange }: ResumeProfileProps) {
    const t = useTranslations("profile");
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [photoError, setPhotoError] = useState<string | null>(null);

    if (!profile) return null;

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setPhotoError(t("photoSizeError"));
            return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setPhotoError(t("photoFormatError"));
            return;
        }

        try {
            setUploadingPhoto(true);
            setPhotoError(null);

            const base64String = await uploadProfilePhoto(file);
            onChange({ ...profile, avatar_url: base64String });
        } catch (err) {
            console.error("Failed to upload photo:", err);
            setPhotoError(t("photoUploadError"));
        } finally {
            setUploadingPhoto(false);
        }
    };

    const handleInputChange = (field: keyof UserProfile, value: string) => {
        onChange({ ...profile, [field]: value });
    };

    // Get user initials for avatar placeholder
    const getInitials = () => {
        const first = profile.first_name?.[0] || "";
        const last = profile.last_name?.[0] || "";
        return (first + last).toUpperCase() || profile.email[0].toUpperCase();
    };

    return (
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-bold text-[var(--color-brand-primary)] mb-6 heading-font">
                {t("resumeProfile")}
            </h2>

            {/* Profile Picture Section */}
            <div className="mb-8 flex flex-col sm:flex-row items-start gap-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                        {profile.avatar_url ? (
                            <Image
                                src={profile.avatar_url}
                                alt="Profile"
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-gradient)] text-white text-3xl font-bold">
                                {getInitials()}
                            </div>
                        )}
                    </div>
                    {uploadingPhoto && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <label className="inline-block mb-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingPhoto}
                            className="hidden"
                        />
                        <span className="px-4 py-2 bg-[var(--color-brand-primary)] text-white rounded-lg hover:bg-[var(--color-brand-hover)] transition-all duration-300 cursor-pointer inline-block text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                            {uploadingPhoto
                                ? t("uploadingPhoto")
                                : profile.avatar_url
                                    ? t("changePhoto")
                                    : t("uploadPhoto")}
                        </span>
                    </label>
                    {photoError && (
                        <p className="text-red-500 text-sm mt-2">{photoError}</p>
                    )}
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
                        value={profile.first_name || ""}
                        onChange={(e) => handleInputChange("first_name", e.target.value)}
                        placeholder="John"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("lastName")}
                    </label>
                    <input
                        type="text"
                        value={profile.last_name || ""}
                        onChange={(e) => handleInputChange("last_name", e.target.value)}
                        placeholder="Doe"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>

                <div className="form-group md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("emailAddress")}
                    </label>
                    <input
                        type="email"
                        value={profile.email}
                        disabled
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed transition-all duration-200 outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Email cannot be changed. Contact support if you need to update it.
                    </p>
                </div>
            </div>

            {/* Info about limited fields */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Additional profile fields (phone, address, etc.) will be available in a future update.
                    For now, you can update your name and profile photo.
                </p>
            </div>
        </div>
    );
}
