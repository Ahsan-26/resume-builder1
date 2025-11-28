// src/components/ui/toast/Toasts.tsx
"use client";

import { useToast } from "./ToastContext";

export default function Toasts() {
  const { toasts, remove } = useToast();

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3 max-w-xs">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`
            p-3 rounded-lg shadow-lg border
            ${t.type === "success" ? "bg-white border-green-100" : ""}
            ${t.type === "error" ? "bg-white border-red-100" : ""}
            ${t.type === "info" ? "bg-white border-slate-100" : ""}
          `}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="font-semibold text-sm">{t.title}</div>
              {t.body && <div className="text-xs text-gray-600 mt-1">{t.body}</div>}
            </div>
            <button className="text-gray-400 ml-2 text-sm" onClick={() => remove(t.id)}>
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
