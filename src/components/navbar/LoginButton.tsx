"use client";

import Link from "next/link";

export default function LoginButton({ label }: { label: string }) {
  return (
    <Link
      href="/auth/login"
      className="
        px-4 py-2 rounded-lg border-2 font-medium
        border-[var(--color-brand-primary)]
        text-[var(--color-brand-primary)]
        transition-all duration-200
        hover:bg-[var(--color-brand-primary)]
        hover:text-white
      "
    >
      {label}
    </Link>
  );
}
