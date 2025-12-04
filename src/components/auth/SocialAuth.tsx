"use client";

import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/apiClient";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { setTokens } from "@/lib/auth";

export default function SocialAuth() {
    const t = useTranslations("auth");
    const { refreshUser } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<"google" | "facebook" | null>(null);

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) {
            toast.error("Failed to get Google credentials");
            return;
        }

        setIsLoading("google");
        try {
            // Google returns an ID token (JWT), not an access token
            // Try both field names to see which one the backend expects
            const payload = {
                id_token: credentialResponse.credential,
                access_token: credentialResponse.credential // fallback
            };
            console.log("Sending Google OAuth payload:", payload);

            const res = await apiFetch("/auth/google/", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            console.log("Response status:", res.status);
            const data = await res.json();
            console.log("Response data:", data);

            if (res.ok) {
                if (data.access && data.refresh) {
                    setTokens({ access: data.access, refresh: data.refresh });
                    await refreshUser();
                    toast.success(data.is_new ? "Account created! Welcome!" : "Welcome back!");
                    router.push("/dashboard");
                }
            } else {
                toast.error(data.error || data.detail || data.non_field_errors?.[0] || "Google login failed");
            }
        } catch (error) {
            console.error("Google auth error:", error);
            toast.error("Failed to authenticate with Google");
        } finally {
            setIsLoading(null);
        }
    };

    const handleFacebookResponse = async (response: any) => {
        if (!response.accessToken) {
            toast.error("Failed to get Facebook credentials");
            return;
        }

        setIsLoading("facebook");
        try {
            const res = await apiFetch("/auth/facebook/", {
                method: "POST",
                body: JSON.stringify({ access_token: response.accessToken }),
            });

            const data = await res.json();
            if (res.ok) {
                if (data.access && data.refresh) {
                    setTokens({ access: data.access, refresh: data.refresh });
                    await refreshUser();
                    toast.success(data.is_new ? "Account created! Welcome!" : "Welcome back!");
                    router.push("/dashboard");
                }
            } else {
                toast.error(data.error || "Facebook login failed");
            }
        } catch (error) {
            toast.error("Failed to authenticate with Facebook");
        } finally {
            setIsLoading(null);
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
                <div className="w-full">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => toast.error("Google login failed")}
                        useOneTap={false}
                        theme="outline"
                        size="large"
                        text="continue_with"
                        width="100%"
                    />
                </div>

                <FacebookLogin
                    appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ""}
                    callback={handleFacebookResponse}
                    fields="name,email,picture"
                    render={(renderProps: any) => (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={renderProps.onClick}
                            disabled={isLoading === "facebook"}
                            className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                        >
                            <FaFacebook className="h-5 w-5 text-[#1877F2]" />
                            <span className="ml-2">Facebook</span>
                        </motion.button>
                    )}
                />
            </div>
        </div>
    );
}
