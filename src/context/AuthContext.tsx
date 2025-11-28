// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { setTokens, clearTokens } from "@/lib/auth";
import { useToast } from "@/components/ui/ToastContext";

type User = Record<string, any> | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  registerInit: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  registerVerify: (email: string, code: string) => Promise<{ ok: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        const access = localStorage.getItem("sr_access");
        if (!access) {
          setLoading(false);
          return;
        }
        const res = await apiFetch("/auth/me/", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          if (mounted) setUser(data);
        } else {
          // leave user null; apiFetch will attempt refresh on 401
        }
      } catch (err) {
        console.error("Auth init error", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("https://rehan.pythonanywhere.com/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = payload.detail || payload.error || "Invalid credentials";
        toast?.push({ type: "error", title: "Login failed", body: msg });
        return { ok: false, error: msg };
      }

      const { access, refresh, user: userObj } = payload;
      if (access && refresh) {
        setTokens({ access, refresh });
        setUser(userObj ?? null);
        toast?.push({ type: "success", title: "Signed in", body: "Welcome back." });
        return { ok: true };
      }

      return { ok: false, error: "Invalid server response" };
    } catch (err) {
      console.error(err);
      toast?.push({ type: "error", title: "Network error", body: "Please try again." });
      return { ok: false, error: "Network error" };
    }
  };

  const logout = async () => {
    try {
      await fetch("https://rehan.pythonanywhere.com/api/auth/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("sr_access")}` },
      }).catch(() => {});
    } finally {
      clearTokens();
      setUser(null);
      toast?.push({ type: "info", title: "Signed out", body: "You have been signed out." });
    }
  };

  const registerInit = async (email: string, password: string) => {
    try {
      const res = await fetch("https://rehan.pythonanywhere.com/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = payload.detail || payload.error || "Registration failed";
        toast?.push({ type: "error", title: "Registration error", body: msg });
        return { ok: false, error: msg };
      }

      toast?.push({ type: "success", title: "Check your email", body: "A verification code has been sent." });
      return { ok: true };
    } catch (err) {
      toast?.push({ type: "error", title: "Network error", body: "Please try again." });
      return { ok: false, error: "Network error" };
    }
  };

  const registerVerify = async (email: string, code: string) => {
    try {
      const res = await fetch("https://rehan.pythonanywhere.com/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = payload.detail || payload.error || "Verification failed";
        toast?.push({ type: "error", title: "Verification failed", body: msg });
        return { ok: false, error: msg };
      }

      const { access, refresh, user: userObj } = payload;
      if (access && refresh) {
        setTokens({ access, refresh });
        setUser(userObj ?? null);
        toast?.push({ type: "success", title: "Account created", body: "Welcome to SkyResume!" });
        return { ok: true };
      }
      return { ok: false, error: "Invalid server response" };
    } catch (err) {
      toast?.push({ type: "error", title: "Network error", body: "Please try again." });
      return { ok: false, error: "Network error" };
    }
  };

  const refreshUser = async () => {
    try {
      const res = await apiFetch("/auth/me/", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, registerInit, registerVerify, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
