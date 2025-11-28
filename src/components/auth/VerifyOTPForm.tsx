"use client";

import { useState } from "react";
import AuthCard from "./AuthCard";
import toast from "react-hot-toast";

export default function VerifyOTPForm({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("https://rehan.pythonanywhere.com/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        code: e.target.code.value,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return toast.error(data.error || "Verification failed");

    toast.success("Account verified successfully!");
    window.location.href = "/login";
  };

  return (
    <AuthCard title="Verify Your Email">
      <form onSubmit={handleVerify} className="space-y-4">

        <input
          type="text"
          name="code"
          maxLength={6}
          placeholder="Enter the 6-digit code"
          className="w-full p-3 border rounded-lg focus:ring focus:border-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold 
                     hover:bg-green-700 disabled:opacity-50 transition"
        >
          {loading ? "Verifying..." : "Verify Account"}
        </button>
      </form>
    </AuthCard>
  );
}
