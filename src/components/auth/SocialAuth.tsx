"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/apiClient";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function SocialAuth() {
    const t = useTranslations("auth");

    const handleGoogleLogin = async () => {
        // In a real app, this would redirect to Google OAuth
        // For now, we'll simulate or call the backend endpoint if it returns a redirect URL
        try {
            const res = await apiFetch("/auth/google/", { method: "POST" });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error("Google login not configured yet");
            }
        } catch (error) {
            toast.error("Failed to initiate Google login");
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const res = await apiFetch("/auth/facebook/", { method: "POST" });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error("Facebook login not configured yet");
            }
        } catch (error) {
            toast.error("Failed to initiate Facebook login");
        }
    };

    return (
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                        {t("orContinueWith")}
                    </span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
                    className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                    <FcGoogle className="h-5 w-5" />
                    <span className="ml-2">Google</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleFacebookLogin}
                    className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                    <FaFacebook className="h-5 w-5 text-[#1877F2]" />
                    <span className="ml-2">Facebook</span>
                </motion.button>
            </div>
        </div>
    );
}
