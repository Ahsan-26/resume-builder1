"use client";

import { useState } from "react";
import AuthCard from "./AuthCard";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("https://rehan.pythonanywhere.com/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return toast.error(data.error || "Login failed");

    toast.success("Logged in!");
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    window.location.href = "/";
  };

  return (
    <AuthCard title="Welcome Back">
      <form onSubmit={handleLogin} className="space-y-4">

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
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
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
    </AuthCard>
  );
}
