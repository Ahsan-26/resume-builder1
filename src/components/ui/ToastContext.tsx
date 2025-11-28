// src/components/ui/toast/ToastContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

type Toast = { id: string; type: "success" | "error" | "info"; title: string; body?: string };
type ToastContextType = { toasts: Toast[]; push: (t: Omit<Toast, "id">) => void; remove: (id: string) => void };

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function push(payload: Omit<Toast, "id">) {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    setToasts((s) => [...s, { id, ...payload }]);
    // auto-dismiss
    setTimeout(() => remove(id), 6000);
  }

  function remove(id: string) {
    setToasts((s) => s.filter((t) => t.id !== id));
  }

  return <ToastContext.Provider value={{ toasts, push, remove }}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  return ctx;
}
