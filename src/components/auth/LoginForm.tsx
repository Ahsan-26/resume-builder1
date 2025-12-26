"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AuthCard from "./AuthCard";
import SocialAuth from "./SocialAuth";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm({ isAdmin = false }: { isAdmin?: boolean }) {
  const t = useTranslations("auth");
  const { login, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const res = await login(data.email, data.password);

    if (res.ok) {
      // For admin login, verify the user has staff privileges
      if (isAdmin) {
        const user = res.user;

        // Check if user is staff or has admin role
        if (user?.is_staff || user?.role === "admin") {
          router.push("/admin");
        } else {
          // User is not authorized for admin panel
          setError("root", {
            type: "manual",
            message: "Access Denied: You do not have permission to access the admin panel."
          });
          // Logout the user since they tried to access admin
          await logout();
        }
      } else {
        // Regular user login - redirect to dashboard
        router.push("/dashboard");
      }
    }
    setIsLoading(false);
  };

  return (
    <AuthCard title={t("welcomeBack")} subtitle={t("signInSubtitle")}>
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

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("passwordLabel")}
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              {t("forgotPassword")}
            </Link>
          </div>
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

        {/* Display access denied or other root errors */}
        {errors.root && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {errors.root.message}
          </div>
        )}

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
            t("signInBtn")
          )}
        </motion.button>
      </form>

      <SocialAuth />

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          {t("noAccount")}{" "}
        </span>
        <Link
          href="/auth/register"
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          {t("signUpLink")}
        </Link>
      </div>
    </AuthCard>
  );
}
