"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { apiFetch } from "@/lib/apiClient";
import AuthCard from "./AuthCard";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
    const t = useTranslations("auth");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        try {
            const res = await apiFetch("/auth/forgot-password/", {
                method: "POST",
                body: JSON.stringify({ email: data.email }),
            });

            if (res.ok) {
                setIsSent(true);
                toast.success("Reset link sent to your email");
            } else {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload.error || "Failed to send reset link");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSent) {
        return (
            <AuthCard title={t("checkEmail")}>
                <div className="text-center space-y-6">
                    <p className="text-gray-600 dark:text-gray-300">
                        {t("checkEmailSubtitle")}
                    </p>
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t("backToSignIn")}
                    </Link>
                </div>
            </AuthCard>
        );
    }

    return (
        <AuthCard title={t("resetPassword")} subtitle={t("resetSubtitle")}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t("emailLabel")}
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder={t("emailPlaceholder")}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        t("sendResetLinkBtn")
                    )}
                </motion.button>

                <div className="text-center">
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t("backToSignIn")}
                    </Link>
                </div>
            </form>
        </AuthCard>
    );
}
