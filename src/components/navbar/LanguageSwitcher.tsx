"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentLocale = pathname.split("/")[1];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    const segments = pathname.split("/");
    segments[1] = newLocale;

    const newPath = segments.join("/");

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div className="relative">
      <select
        onChange={handleChange}
        defaultValue={currentLocale}
        disabled={isPending}
        className="
          appearance-none
          px-3 py-2
          rounded-lg
          border border-[var(--color-border)]
          bg-white
          text-sm font-medium
          text-[var(--color-text-primary)]
          shadow-sm
          hover:border-[var(--color-brand-primary)]
          transition-all duration-150
          cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          pr-8
        "
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
        <option value="fr">FR</option>
      </select>

      {/* Custom dropdown arrow */}
      <span
        className="
          pointer-events-none
          absolute right-3 top-1/2 -translate-y-1/2
          text-[var(--color-text-secondary)]
          text-xs
        "
      >
        ▼
      </span>
    </div>
  );
}
