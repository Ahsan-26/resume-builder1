"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/apiClient";
import AuthCard from "./AuthCard";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const resetPasswordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
    const t = useTranslations("auth");
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const uid = searchParams.get("uid");

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema.refine((data) => data.password === data.confirmPassword, {
            message: t("passwordsDoNotMatch"),
            path: ["confirmPassword"],
        })),
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token || !uid) {
            toast.error(t("invalidResetLink"));
            return;
        }

        setIsLoading(true);
        try {
            const res = await apiFetch("/auth/reset-password/", {
                method: "POST",
                body: JSON.stringify({
                    uid,
                    token,
                    new_password: data.password,
                }),
            });

            if (res.ok) {
                toast.success(t("passwordResetSuccess"));
                router.push("/auth/login");
            } else {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload.error || t("failedToResetPassword"));
            }
        } catch (error) {
            toast.error(t("networkError"));
        } finally {
            setIsLoading(false);
        }
    };

    if (!token || !uid) {
        return (
            <AuthCard title={t("invalidLink")}>
                <div className="text-center">
                    <p className="text-red-500 mb-4">{t("invalidLinkMsg")}</p>
                    <Link
                        href="/auth/forgot-password"
                        className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                        {t("requestNewLink")}
                    </Link>
                </div>
            </AuthCard>
        );
    }

    return (
        <AuthCard title={t("setNewPassword")} subtitle={t("setNewPasswordSubtitle")}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t("newPasswordLabel")}
                    </label>
                    <input
                        {...register("password")}
                        type="password"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder={t("passwordPlaceholder")}
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t("confirmPasswordLabel")}
                    </label>
                    <input
                        {...register("confirmPassword")}
                        type="password"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder={t("passwordPlaceholder")}
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
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
                        t("resetPasswordBtn")
                    )}
                </motion.button>
            </form>
        </AuthCard>
    );
}
