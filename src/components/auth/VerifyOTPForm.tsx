"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthCard from "./AuthCard";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function VerifyOTPForm({ email }: { email: string }) {
  const t = useTranslations("auth");
  const { registerVerify } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const code = e.target.code.value;
    const res = await registerVerify(email, code);

    setLoading(false);

    if (res.ok) {
      router.push("/"); // or home
    }
  };

  return (
    <AuthCard title={t("verifyEmail")} subtitle={t("verifySubtitle", { email })}>
      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("verificationCodeLabel")}
          </label>
          <input
            type="text"
            name="code"
            maxLength={6}
            placeholder="123456"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center text-2xl tracking-widest"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            t("verifyBtn")
          )}
        </motion.button>
      </form>
    </AuthCard>
  );
}
