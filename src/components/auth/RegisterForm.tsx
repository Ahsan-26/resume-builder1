"use client";

import { useState } from "react";
import AuthCard from "./AuthCard";
import toast from "react-hot-toast";
import VerifyOTPForm from "./VerifyOTPForm";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "verify">("form");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("https://rehan.pythonanywhere.com/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: e.target.password.value,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return toast.error(data.error || "Something went wrong");

    toast.success("Verification code sent!");
    setStep("verify");
  };

  return (
    <>
      {step === "form" && (
        <AuthCard title="Create Your Account">
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring focus:border-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-3 border rounded-lg focus:ring focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold 
                         hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? "Sending..." : "Register"}
            </button>
          </form>
        </AuthCard>
      )}

      {step === "verify" && (
        <VerifyOTPForm email={email} />
      )}
    </>
  );
}
