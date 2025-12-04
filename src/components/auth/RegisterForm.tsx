"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import AuthCard from "./AuthCard";
import SocialAuth from "./SocialAuth";
import VerifyOTPForm from "./VerifyOTPForm";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const t = useTranslations("auth");
  const { registerInit } = useAuth();
  const [step, setStep] = useState<"form" | "verify">("form");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Submitting registration form", data);
    setIsLoading(true);
    setEmail(data.email);
    const res = await registerInit(data.email, data.password);
    console.log("Registration result:", res);
    setIsLoading(false);
    if (res.ok) {
      console.log("Setting step to verify");
      setStep("verify");
    } else {
      console.log("Registration failed, not switching step");
    }
  };

  if (step === "verify") {
    return <VerifyOTPForm email={email} />;
  }

  return (
    <AuthCard title={t("createAccount")} subtitle={t("createAccountSubtitle")}>
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("passwordLabel")}
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
            t("signUpBtn")
          )}
        </motion.button>
      </form>

      <SocialAuth />

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          {t("alreadyAccount")}{" "}
        </span>
        <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          {t("signInLink")}
        </Link>
      </div>
    </AuthCard>
  );
}
